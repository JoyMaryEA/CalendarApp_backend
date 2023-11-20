import { Router } from "express";
import UserController from "../controllers/user.controller";


 const userRoutes = Router();
     
    userRoutes.get("/users", UserController.retrieveAllUsers);
    userRoutes.post('/register', UserController.addUser);
    userRoutes.post('/login', UserController.userLogin);
    userRoutes.post("/users/:u_id",UserController.addLeaveDays);
    userRoutes.put("/users/:period_id",UserController.updateLeaveDays);
export default userRoutes