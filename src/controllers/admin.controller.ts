import { Request, Response } from 'express';
import Admin from '../repositories/user.repository'; 
import AdminRepository from '../repositories/admin.repository';
require('dotenv').config()

const AdminController = {
  
  retrieveCountOfUsersInDate: async (req: Request, res: Response) => {  
    const date:string = req.body.date
    try {
      const users = await AdminRepository.retrieveCountOfUsersbyDate(date);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users data' });
    }
  },

    retrieveMaxUsersBySubTeam: async (req: Request<{subteam_id:string}>, res: Response) => {  
    const subteam_id:string = req.params.subteam_id as string;
    try {
      const users = await AdminRepository.retrieveMaxSeatsBySubteam(subteam_id);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users data' });
    }
  },
};

export default AdminController;

