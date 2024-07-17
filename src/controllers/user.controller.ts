import { Request, Response } from 'express';
import UserRepository from '../repositories/user.repository'; 
import { v4 as uuidv4 } from 'uuid';
import User, { DaysOff, ExtendedRequest, UserLogin, UserUnderYou } from '../Interfaces';
import jwt from "jsonwebtoken"
import { log } from 'console';
require('dotenv').config()

const UserController = {
  userLogin: async (req:Request, res:Response)=>{{
    try{
      const pair:UserLogin = req.body
      const existingUser = await UserRepository.retrieveUserByEmail(pair.email!)
   
      
      if ( !existingUser[0] || existingUser[0].password != pair.password){
        res.status(404).json({error:"user does not exist"})
            }
      
      else{
        const token = jwt.sign({u_id:existingUser[0].u_id,email:existingUser[0].email},process.env.TOKEN_KEY as string)
        res.status(200).json({success:'Successful login',token,u_id:existingUser[0].u_id,first_name:existingUser[0].first_name, last_name:existingUser[0].last_name, role:existingUser[0].role, team_id:existingUser[0].team_id})
      }
      
    }
    catch(error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  }
   
  },
  retrieveAllUsers: async (req: Request, res: Response) => {   
    try {
      const users = await UserRepository.retrieveAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users data' });
    }
  },
  retrieveOneUserDays: async (req: Request<{u_id:string}>, res: Response) => {   
    var u_id:string = req.params.u_id as string
    try {
      const users = await UserRepository.retrieveOneUserDays(u_id);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users data' });
    }
  },
  retrieveAllUsersDays: async (req: Request, res: Response) => {   
    try {
      const users = await UserRepository.retrieveAllUsersDays();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users data' });
    }
  },
  retrieveAllUsersInToday: async (req: Request, res: Response) => {   
    try {
      const users = await UserRepository.retrieveAllUsersInToday();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users data' });
    }
  },
  retrieveAllUsersBeneathYou: async (req: Request, res: Response) => {   
    const userUnderYou:UserUnderYou = req.body
    try {
      const users = await UserRepository.retrieveAllUsersUnderYou(parseInt(userUnderYou.team_id),parseInt(userUnderYou.role));
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users data' });
    }
  },
  addUser: async (req: Request, res: Response) => {   
    try {
      
      let newUser:User = req.body
      newUser.u_id = uuidv4()
      const existingUser = await UserRepository.retrieveUserByEmail(newUser.email as string)
       if (!(newUser.color && newUser.email && newUser.password && newUser.u_id && newUser.first_name && newUser.last_name)){
        res.status(400).json({error:'Fields must not be empty'})
       }
        else if (existingUser[0]){
        res.status(409).json({error:'User already exists'})
       }
       else {
      const success = await UserRepository.addUser(newUser);
      res.status(200).json({OK: 'user created successfully', success});
       }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while inserting user' });
    }
  },

  addOfficeDays: async (req: ExtendedRequest, res: Response) => {   
    try {
      
      let newDays:DaysOff = req.body
      newDays.period_id = uuidv4()
      newDays.u_id =req.info?.u_id as string
      //console.log(newDays.u_id);
      
       if (!(newDays.u_id && newDays.period_id && newDays.start_date && newDays.end_date)){
        res.status(400).json({error:'Fields must not be empty'})
       }
       //check that input type is Date
       else {
      const success = await UserRepository.addOfficeDays(newDays);
      res.status(201).json({OK: 'office days entered successfully',newDays});
       }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while inserting user office days' });
    }
  },
  
  updateLeaveDays: async (req: Request<{period_id:string}>, res: Response) => {   
    try {
      
      let newDays:DaysOff = req.body
      newDays.period_id =req.params.period_id as string
       if (!(newDays.period_id && newDays.start_date && newDays.end_date)){
        res.status(400).json({error:'Fields must not be empty'})
       }
       //check that input type is Date
       else {
      const success = await UserRepository.updateLeaveDays(newDays);
      res.status(200).json({OK: 'leave days updated successfully', newDays});
       }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating user leave days' });
    }
  },
  deleteLeaveDays: async (req: Request<{period_id:string}>, res: Response) => {   
    try {
      
      
      const period_id =req.params.period_id as string
      const period = await UserRepository.getPeriod(period_id);
      if(!period[0]){
        res.status(404).json({error:'Leave days not found'})
      }
      else{
        const success = await UserRepository.deleteLeaveDays(period_id);
        res.status(200).json({OK: 'leave days deleted successfully'});
      }
      
       
    } catch (error:any) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting user leave days' });
    }
  },
};

export default UserController;

