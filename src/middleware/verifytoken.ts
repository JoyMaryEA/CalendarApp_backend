import { NextFunction, Request, Response } from "express";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { DecodedData, ExtendedRequest } from "../Interfaces";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });


export const verifyToken = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["token"] as string;
    //  console.log(token);
     
    if (!token) {
      return res.status(401).json({ message: "Unathorized " });
    }

    const decodedData = jwt.verify(
      token,
      process.env.TOKEN_KEY as string
    ) as DecodedData;
    req.info = decodedData;
  } catch (error: any) {
    return res.status(403).json({ message: error.message });
  }
  next();
};