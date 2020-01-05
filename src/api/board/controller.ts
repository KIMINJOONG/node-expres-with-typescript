import { Request, Response } from "express";
import { validationResult } from "express-validator";
import responseMessage from "../../utils/responseMessage";
import Board from "../../config/models/Board";
import User from "../../config/models/User";
export default {
  index: async (req: Request, res: Response) => {
    try {
      const boards = await Board.findAll({ include: [User] });
      return res.status(200).json(responseMessage(true, "", boards));
    } catch (error) {
      console.log(error);
      return res.status(404).json(responseMessage(false, error.message));
    }
  },
  detail: async (req: Request, res: Response) => {
    const {
      params: { id }
    } = req;

    let parsedInt: number = parseInt(id);
    if (Number.isNaN(parsedInt)) {
      return res.status(400).json(responseMessage(false, "잘못된 요청입니다."));
    }

    try {
      const board = await Board.findOne({ where: { id: parsedInt } });
      if (!board) {
        return res
          .status(404)
          .json(responseMessage(false, "존재하지않는 게시글입니다."));
      }
      return res.status(200).json(responseMessage(true, "", board));
    } catch (error) {}
  },
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
