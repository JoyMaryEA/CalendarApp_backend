import User, { DaysOff,  UserLogin } from '../Interfaces';
import pool from '../db';

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
              console.log(results);
              
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
  // gets all users plus their leave days NB only users with leave days
  static retrieveAllUsers(): Promise<User[]> {
    const query = "SELECT * FROM user_info ui JOIN user_days_off udo ON ui.u_id=udo.u_id";
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<User[]>(query)
            .then(([results]: [User[],any]) => {   //fix the any
              connection.release();
              resolve(results);
              console.log(results);
              
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
              console.log(oldUser);
              
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
  static addLeaveDays(daysOff:DaysOff){
    const query = 'INSERT INTO user_days_off(period_id,u_id, start_date, end_date) VALUES (?,?,?,?)'

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
    const query = `UPDATE user_days_off SET start_date=? , end_date=? WHERE period_id ='${daysOff.period_id}'`

    return new Promise<void>((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query(query,[daysOff.start_date,daysOff.end_date])
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
}

export default UserRepository