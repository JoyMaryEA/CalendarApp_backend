import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verifyToken } from "../middleware/verifytoken";
import AdminController from "../controllers/admin.controller";


 const adminRoutes = Router();
     
    adminRoutes.post("/dates",verifyToken, AdminController.retrieveCountOfUsersInDate);
    adminRoutes.get("/max/:subteam_id",verifyToken, AdminController.retrieveMaxUsersBySubTeam);
  
export default adminRoutes