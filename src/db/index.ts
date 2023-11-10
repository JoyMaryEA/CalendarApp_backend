import mysql from "mysql2/promise"; // Import the promise-based version of mysql2
import { config } from "../config/db.config";

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  waitForConnections: true, // This is important for connection pooling
  connectionLimit: 10, // Adjust the connection limit as needed
  queueLimit: 0, // No limit on the connection queue
});
pool.getConnection()
  .then((connection) => {
    console.log('Connected to MySQL as ID ' + connection.threadId);

    // If you need to use the connection, you can perform your database operations here.

    // Don't forget to release the connection back to the pool when you're done.
    connection.release();
  })
  .catch((error) => {
    console.error('Error connecting to MySQL: ' + error.stack);
  });
export default pool;


