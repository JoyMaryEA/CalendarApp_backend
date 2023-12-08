import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verifyToken } from "../middleware/verifytoken";


 const userRoutes = Router();
     
    userRoutes.get("/users",verifyToken, UserController.retrieveAllUsers);
    userRoutes.post('/register', UserController.addUser);
    userRoutes.post('/login', UserController.userLogin);
    userRoutes.post("/users",verifyToken,UserController.addLeaveDays);
    userRoutes.patch("/users/:period_id",verifyToken,UserController.updateLeaveDays);
    userRoutes.delete("/users/:period_id",verifyToken,UserController.deleteLeaveDays)
export default userRoutes