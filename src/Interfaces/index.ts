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
  role:number;
  team_id:number;
}
export interface UserLogin extends RowDataPacket {
  email:string;
  password:string;
}

export interface DaysOff extends RowDataPacket{
  period_id:string
  u_id:string
  start_date:Date
  end_date:Date
}
export interface Success extends RowDataPacket{
  message:{period_id?:string}
  
}
export interface msg extends RowDataPacket{
  message:string
  
}

export interface DecodedData {
  u_id: string;
  email: string;
}
export interface ExtendedRequest extends Request {
  info?: DecodedData;
}

export interface UserUnderYou extends RowDataPacket {
  team_id:string;
  role:string;
}

export interface TeamRowMaxSeats extends RowDataPacket{
  seats:number
}

export interface TeamRowCountSeats extends RowDataPacket{
  count:number
}
export interface userBetweenDates extends RowDataPacket{
  u_id:string,
  start_date:string,
  end_date:string
}