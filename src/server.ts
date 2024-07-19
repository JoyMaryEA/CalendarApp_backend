import express, { json } from "express";
import cors from 'cors'
import UserRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";

process.on('uncaughtException', function (err) {
    console.log(err);
  });
  

export const app = express();
app.use(json());
app.use(cors())

app.use("/",UserRoutes)
app.use("/adm/",adminRoutes)


app.listen(4000,'',()=>{
    console.log("server running...");
   
  
});

