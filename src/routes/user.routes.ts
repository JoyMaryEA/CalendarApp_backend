import { Router } from "express";
import UserController from "../controllers/user.controller";
import { log } from "console";


 const userRoutes = Router();
     console.log("in routes");
     
    userRoutes.get("/users", UserController.retrieveAllUsers);
export default userRoutes