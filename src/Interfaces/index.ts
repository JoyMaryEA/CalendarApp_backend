import { Request } from "express";
import { RowDataPacket } from "mysql2";



export default interface User extends RowDataPacket {
  u_id: string;
  first_name:string;
  last_name:string;
  start_date:string;
  end_date:string;
  color:string;
  email:string;
  password:string;
  period_id:string;
}
export interface UserLogin extends RowDataPacket {
  email:string;
  password:string;
}
export interface decodedData extends Request ,RowDataPacket{
  u_id:string
  email:string
}
export interface DaysOff extends RowDataPacket{
  period_id:string
  u_id:string
  start_date:Date
  end_date:Date
}
