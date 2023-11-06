import { Connection, RowDataPacket } from 'mysql2/promise';
import User from '../Interfaces';
import dbConnection from '../db';



class UserRepository{
  static  retrieveAllUsers(): Promise<User[]> {
    let query: string = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      dbConnection.query<User[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
   }
 }

  
export default UserRepository;
