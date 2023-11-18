import { RowDataPacket } from "mysql2";



export default interface User extends RowDataPacket {
  u_id: string;
  first_name:string;
  last_name?:string;
  start_date?:string;
  end_date?:string;
  color:string;
  email?:string;
  password?:string;
  period_id?:string;
}