import mysql from "mysql2/promise"; 
import { config } from "../config/db.config";

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  waitForConnections: true, 
  connectionLimit: 10, 
  queueLimit: 0, 
});
pool.getConnection()
  .then((connection) => {
    console.log('Connected to MySQL as ID ' + connection.threadId);

    connection.release();
  })
  .catch((error) => {
    console.error('Error connecting to MySQL: ' + error.stack);
  });
export default pool;


