import express, { Request, Response, NextFunction } from "express";
import User from "../config/models/User";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(404).end();
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let parsedId = parseInt(id);

  if (Number.isNaN(parsedId)) {
    return res.status(400).end();
  }

  try {
    const user = await User.findOne({ where: { id: parsedId } });

    if (!user) {
      return res.status(404).end();
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    let user = await User.create({ name });
    user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(404).end();
  }
});

export = router;
