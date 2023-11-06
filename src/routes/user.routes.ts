import { Router } from "express";
import UserController from "../controllers/user.controller";


 const userRoutes = Router();

    userRoutes.get("/users", UserController.retrieveAllUsers);
export default userRoutes