import { Request, Response } from 'express';
import UserRepository from '../repositories/user.repository'; 
import { v4 as uuidv4 } from 'uuid';
import User from '../Interfaces';

const UserController = {
  retrieveAllUsers: async (req: Request, res: Response) => {   
    try {
      const users = await UserRepository.retrieveAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  },
  addUser: async (req: Request, res: Response) => {   
    try {
      let newUser:User = req.body
      newUser.u_id = uuidv4()
      const existingUser = await UserRepository.retrieveUserByEmail(newUser.email!)
       if (!(newUser.color && newUser.email && newUser.password && newUser.u_id && newUser.first_name && newUser.last_name)){
        res.status(400).json({error:'Fields must not be empty'})
       }
        else if (existingUser){
        res.status(409).json({error:'User already exists'})
       }
       else {
      const success = await UserRepository.addUser(newUser);
      res.status(201).json({success: 'user created successfully'});
       }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while inserting user' });
    }
  },
};

export default UserController;

