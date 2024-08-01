import { log } from 'console';
import User, { DaysOff,  msg,  Success,  UserLogin } from '../Interfaces';
import pool from '../db';
import e from 'express';


//TODO: REFACTOR TO USE ASYNC/AWAIT
class UserRepository {
  //simple login
  static userLogin(): Promise<UserLogin[]>{
    const query = 'SELECT email, password FROM user_info'
        return new Promise((resolve, reject)=>{
          pool.getConnection()
          .then((connection)=>{
            connection.query<UserLogin[]>(query)
            .then((results:UserLogin[] |any ) => {   //fix the any
              connection.release();
              resolve(results);
             // console.log(results);//
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
      })
  }
  static resetPassword(email:string, password:string): Promise<UserLogin[]>{
    const query = 'UPDATE user_info SET password =? WHERE email=?'
        return new Promise((resolve, reject)=>{
          pool.getConnection()
          .then((connection)=>{
            connection.query<msg[]>(query,[password,email])
            .then((results:msg |any ) => {   //fix the any
              connection.release();
              resolve(results);
             // console.log(results);//
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
      })
  }
  // gets all users plus their office days 
  static retrieveAllUsers(): Promise<User[]> {
    const query = "SELECT * FROM user_info ";
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<User[]>(query)
            .then(([results]: [User[],any]) => {   //fix the any
              connection.release();
              resolve(results);
            //  console.log(results);
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

   // gets all users plus their office days 
   static retrieveAllUsersDays(): Promise<User[]> {
    const query = "SELECT * FROM user_info ui JOIN office_days od ON ui.u_id=od.u_id";
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<User[]>(query)
            .then(([results]: [User[],any]) => {   //fix the any
              connection.release();
              resolve(results);
            //  console.log(results);
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

   // gets all users in a team plus their office days 
   static retrieveAllUsersInTeamDays(team_id:string): Promise<User[]> {
    const query = "SELECT * FROM user_info ui JOIN office_days od ON ui.u_id=od.u_id WHERE ui.team_id = ?";
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<User[]>(query,[team_id])
            .then(([results]: [User[],any]) => {   //fix the any
              connection.release();
              resolve(results);
            //  console.log(results);
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

     // gets one users plus their office days 
     static retrieveOneUserDays(u_id:string): Promise<User[]> {
      const query = `SELECT od.start_date, od.end_date, ui.u_id , od.id FROM user_info ui JOIN office_days od ON ui.u_id=od.u_id WHERE ui.u_id="${u_id}"`;
      
      return new Promise((resolve, reject) => {
        pool.getConnection()
          .then((connection) => {
            connection.query<User[]>(query)
              .then(([results]: [User[],any]) => {   //fix the any
                connection.release();
                resolve(results);
              //  console.log(results);
                
              })
              .catch((queryError) => {
                connection.release();
                reject(queryError);
                console.log(queryError);
                
              });
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    
     // gets one users plus their office days for a single month
     static retrieveUserDaysBetweenDates(u_id:string,start_date:string, end_date:string): Promise<User[]> {
     // console.log(start_date,end_date);
      
      const query = ` SELECT SUM(
                        LEAST(end_date, ?) - GREATEST(start_date, ?)
                    ) AS count
                    FROM office_days
                    WHERE
                        end_date >= ? AND
                        start_date <= ? AND
                        u_id = ?;`;
  
                        
      
      return new Promise((resolve, reject) => {
        pool.getConnection()
          .then((connection) => {
            connection.query<User[]>(query,[end_date,start_date,start_date,end_date,u_id])
              .then(([results]: [User[],any]) => {   //fix the any
                connection.release();
                resolve(results);
              //  console.log(results);
                
              })
              .catch((queryError) => {
                connection.release();
                reject(queryError);
                console.log(queryError);
                
              });
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    // gets all users in today
    static retrieveAllUsersInToday(): Promise<User[]> {
      const query = `SELECT ui.*
                    FROM user_info ui
                    INNER JOIN office_days od ON ui.u_id = od.u_id
                    WHERE
                      od.start_date <= CURDATE() AND  
                      od.end_date >= CURDATE(); `;
      
      return new Promise((resolve, reject) => {
        pool.getConnection()
          .then((connection) => {
            connection.query<User[]>(query)
              .then(([results]: [User[],any]) => {   //fix the any
                connection.release();
                resolve(results);
              //  console.log(results);
                
              })
              .catch((queryError) => {
                connection.release();
                reject(queryError);
                console.log(queryError);
                
              });
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    
    
    // gets all users beneath :) you and their office days 
    static retrieveAllUsersUnderYou(team_id:number,role:number ): Promise<User[]> {
      const query = `SELECT * FROM user_info ui JOIN office_days od ON ui.u_id=od.u_id WHERE team_id = ? AND role < ?; `;
      
      return new Promise((resolve, reject) => {
        pool.getConnection()
          .then((connection) => {
            connection.query<User[]>(query,[team_id,role])
              .then(([results]: [User[],any]) => {   //fix the any
                connection.release();
                resolve(results);
              //  console.log(results);
                
              })
              .catch((queryError) => {
                connection.release();
                reject(queryError);
                console.log(queryError);
                
              });
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
//get user by email
  static retrieveUserByEmail(email:string): Promise<User[]> {
    const query = "SELECT * FROM user_info where email = ?";
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<User[]>(query,[email])
            .then(([oldUser]: [User[], any]) => {    //fix the any
              connection.release();
              resolve(oldUser);
             // console.log(oldUser);
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  //registers a new user - done during signup 
  static addUser(user:User) {
    const query = 'INSERT INTO user_info( u_id,first_name,last_name,color, email, password) VALUES (?,?,?,?,?,?)'

    return new Promise<void>((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query(query,[user.u_id,user.first_name,user.last_name,user.color,user.email,user.password])
            .then(() => {
              connection.release();
              resolve();
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // adds the selected leave days range
  static addOfficeDays(daysOff:DaysOff){
    const query = 'INSERT INTO office_days(id,u_id, start_date, end_date) VALUES (?,?,?,?)'

    return new Promise<void>((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query(query,[daysOff.period_id,daysOff.u_id,daysOff.start_date,daysOff.end_date])
            .then(() => {
              connection.release();
              resolve();
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateLeaveDays(daysOff:DaysOff){
    const query = `UPDATE office_days SET start_date=? , end_date=? WHERE id =?`

    return new Promise<void>((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query(query,[daysOff.start_date,daysOff.end_date,daysOff.period_id])
            .then(() => {
              connection.release();
              resolve();
              
            })
            .catch((queryError) => {
              connection.release();
              reject(queryError);
              console.log(queryError);
              
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

static deleteOfficeDay(period_id:string){
  const query = `DELETE FROM office_days WHERE id =?`

  return new Promise<void>((resolve, reject) => {
    pool.getConnection()
      .then((connection) => {
        connection.query(query,[period_id])
          .then(() => {
            connection.release();
            resolve();
            
          })
          .catch((queryError) => {
            connection.release();
            reject(queryError);
            console.log(queryError);
            
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
static getPeriod(period_id:string):Promise<Success[]>{
  const query = `SELECT id FROM office_days WHERE id =?`

  return new Promise<Success[]>((resolve, reject) => {
    pool.getConnection()
      .then((connection) => {
        connection.query<Success[]>(query,[period_id])
          .then(([success]:[Success[], any]) => {
            connection.release();
            resolve(success);
            
          })
          .catch((queryError) => {
            connection.release();
            reject(queryError);
            console.log(queryError);
            
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
}
export default UserRepository