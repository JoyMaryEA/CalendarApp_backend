import { log } from 'console';
import User, { DaysOff,  Success, TeamRowCountSeats, TeamRowMaxSeats,  UserLogin } from '../Interfaces';
import pool from '../db';

class AdminRepository {
  
  //get count of users by date
  static retrieveCountOfUsersbyDate(date:string): Promise<number> {
        
    const query = `SELECT COUNT(*) AS count FROM office_days WHERE ? >= start_date AND ? < end_date;`;
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<TeamRowCountSeats[]>(query,[date,date])
          .then(results => {
            connection.release();
            if (results.length > 0) {
              // Assuming only one row is returned
              resolve(results[0][0].count);
            } else {
              resolve(0); // Default value if no results are found
            }
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
   static retrieveMaxSeatsBySubteam(subteam_id: string): Promise<number> {
    const query = `SELECT seats FROM team WHERE id = ?;`;
  
    return new Promise<number>((resolve, reject) => {
      pool.getConnection()
        .then(connection => {
          connection.query<TeamRowMaxSeats[]>(query, [subteam_id])
            .then(results => {
              connection.release();
              if (results.length > 0) {
                // Assuming only one row is returned
                resolve(results[0][0].seats);
              } else {
                resolve(0); // Default value if no results are found
              }
            })
            .catch(queryError => {
              connection.release();
              reject(queryError);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  
   }
}
export default AdminRepository