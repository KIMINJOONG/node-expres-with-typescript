import { Response, NextFunction } from "express";
import decodeJWT from "./decodeJWT";
const tokenCheck = async (req: any, res: Response, next: NextFunction) => {
  const token = req.get("Authentication");

  if (token) {
    const user = await decodeJWT(token);
    if (user) {
      req.user = user;
    } else {
      req.user = undefined;
    }
  }
};

export default tokenCheck;
