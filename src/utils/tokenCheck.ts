import { Request, Response, NextFunction } from "express";
import decodeJWT from "./decodeJWT";
const tokenCheck = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("Authentication");

  if (token) {
    const user = await decodeJWT(token);
  }
};

export default tokenCheck;
