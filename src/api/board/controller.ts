import { Request, Response } from "express";
import { validationResult } from "express-validator";
import responseMessage from "../../utils/responseMessage";
import Board from "../../config/models/Board";
import User from "../../config/models/User";
export default {
  create: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error : ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      body: { title, content }
    } = req;

    try {
      const user = await User.findOne({ where: { id: 1 } });
      const board = await Board.create({ title, content, userId: user?.id });
      await board.save();
      user?.boards?.push(board);
      await user?.save();
      return res.status(200).json(responseMessage(true, "", board));
    } catch (error) {
      console.error("error : ", error);
      return res.status(404).json(responseMessage(false, error.message));
    }
  }
};
