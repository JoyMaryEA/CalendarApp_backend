import { Request, Response } from 'express';
import UserRepository from '../repositories/user.repository'; 
import { v4 as uuidv4 } from 'uuid';
import User, { DaysOff, UserLogin } from '../Interfaces';
import jwt from "jsonwebtoken"
require('dotenv').config()

const UserController = {
  userLogin: async (req:Request, res:Response)=>{{
    try{
      const pair:UserLogin = req.body
      const existingUser = await UserRepository.retrieveUserByEmail(pair.email!)
     
      if ( existingUser[0].password != pair.password ){
        res.status(404).json({error:"user does not exist"})
            }
      else{
        const token = jwt.sign({u_id:existingUser[0].u_id,email:existingUser[0].email},process.env.TOKEN_KEY as string)
        res.status(200).json({success:'Successful login',token,u_id:existingUser[0].u_id})
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
      res.status(201).json({OK: 'user created successfully', success});
       }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while inserting user' });
    }
  },

  addLeaveDays: async (req: Request<{u_id:string}>, res: Response) => {   
    try {
      
      let newDays:DaysOff = req.body
      newDays.period_id = uuidv4()
      newDays.u_id =req.params.u_id as string
       if (!(newDays.u_id && newDays.period_id && newDays.start_date && newDays.end_date)){
        res.status(400).json({error:'Fields must not be empty'})
       }
       //check that input type is Date
       else {
      const success = await UserRepository.addLeaveDays(newDays);
      res.status(201).json({OK: 'leave days entered successfully',success});
       }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while inserting user leave days' });
    }
  },
};

export default UserController;

