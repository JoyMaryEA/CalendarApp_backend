import { Request, Response } from 'express';
import UserRepository from '../repositories/user.repository'; 

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
};

export default UserController;

