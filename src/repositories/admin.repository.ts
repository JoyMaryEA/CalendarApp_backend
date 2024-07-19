import { log } from 'console';
import User, { DaysOff,  Success,  UserLogin } from '../Interfaces';
import pool from '../db';

class AdminRepository {
  
  //get count of users by date
  static retrieveCountOfUsersbyDate(date:string): Promise<User[]> {
        
    const query = `SELECT COUNT(*) AS count FROM office_days WHERE ? >= start_date AND ? < end_date;`;
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<User[]>(query,[date,date])
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

   //get maximum seating capacity by team
   static retrieveMaxSeatsBySubteam(subteam_id:string): Promise<User[]> {
    
    const query = `SELECT seats FROM team WHERE id=?;`; 
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<User[]>(query,[subteam_id])
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
  
  
}
export default AdminRepository