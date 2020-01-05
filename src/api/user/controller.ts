import { Request, Response, NextFunction } from "express";
import User from "../../config/models/User";
export default {
  index: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(404).end();
    }
  },

  detail: async (req: Request, res: Response) => {
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
  },
  create: async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
      let user = await User.create({ name, password });
      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(404).end();
    }
  },
  update: async (req: Request, res: Response) => {
    const {
      params: { id },
      body: { name }
    } = req;

    let parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
      return res.status(400).end();
    }

    if (!name) {
      return res.status(400).end();
    }
    try {
      let user = await User.findOne({ where: { id } });

      if (!user) {
        return res.status(404).end();
      }

      user = await user.update({ name }, { where: { id } });
      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id }
    } = req;
    let parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
      return res.status(400).end();
    }

    try {
      const user = await User.findOne({ where: { id: parsedId } });

      if (!user) {
        return res.status(404).end();
      }

      await user.destroy();

      res.status(200).end();
    } catch (error) {
      console.log(error);
    }
  }
};
