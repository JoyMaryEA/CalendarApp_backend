import { Pool } from 'mysql2/promise';
import User from '../Interfaces';
import pool from '../db';
import { log } from 'console';

class UserRepository {
  static retrieveAllUsers(): Promise<User[]> {
    const query = "SELECT * FROM users";
    console.log("in repo");
    
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((connection) => {
          connection.query<User[]>(query)
            .then(([results]: [User[], any]) => {
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
}

export default UserRepository