import express, { Request, Response, NextFunction } from "express";
import User from "../config/models/User";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    let user: User = await User.create({ name });
    user.save();
    return res.status(200).json({ id: user.get("id") });
  } catch (error) {
    console.error(error);
    return res.status(404).end();
  }
});

export = router;
