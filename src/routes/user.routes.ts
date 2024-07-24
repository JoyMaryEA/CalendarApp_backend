import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verifyToken } from "../middleware/verifytoken";


 const userRoutes = Router();
     
    userRoutes.get("/users",verifyToken, UserController.retrieveAllUsers);
    userRoutes.get("/users/days",verifyToken, UserController.retrieveAllUsersDays);
    userRoutes.get("/users/days/:u_id",verifyToken, UserController.retrieveOneUserDays);
    userRoutes.get("/users/days/team/:team_id",verifyToken, UserController.retrieveAllUsersInTeamDays);
    userRoutes.get("/users/intoday",verifyToken, UserController.retrieveAllUsersInToday);
    userRoutes.post("/users/juniors",verifyToken, UserController.retrieveAllUsersBeneathYou);
    userRoutes.post('/register', UserController.addUser);
    userRoutes.put('/resetpwd', UserController.resetPassword);
    userRoutes.post('/login', UserController.userLogin);
    userRoutes.post("/users",verifyToken,UserController.addOfficeDays);
    userRoutes.patch("/users/:period_id",verifyToken,UserController.updateLeaveDays);
    userRoutes.delete("/users/:period_id",verifyToken,UserController.deleteOfficeDay)
export default userRoutes