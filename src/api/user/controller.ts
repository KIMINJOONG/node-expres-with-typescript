import { Request, Response, NextFunction } from "express";
import User from "../../config/models/User";
import responseMessage from "../../utils/responseMessage";
export default {
  index: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(responseMessage(true, "", users));
    } catch (error) {
      console.error(error);
      return res.status(404).json(responseMessage(false, error.message, null));
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
        return res
          .status(404)
          .json(responseMessage(false, "존재하지않는 유저입니다."));
      }

      return res.status(200).json(responseMessage(true, "", user));
    } catch (error) {
      console.error(error);
      return res.status(400).json(responseMessage(false, error.message));
    }
  },
  create: async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
      let user = await User.create({ name, password });
      await user.save();

      return res.status(200).json(responseMessage(true, "", user));
    } catch (error) {
      console.error(error);
      return res.status(404).json(responseMessage(false, error.message));
    }
  },
  update: async (req: Request, res: Response) => {
    const {
      params: { id },
      body: { name }
    } = req;

    let parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
      return res
        .status(400)
        .json(responseMessage(false, "바르지 못한 데이터가 들어왔습니다."));
    }

    if (!name) {
      return res
        .status(400)
        .json(responseMessage(false, "이름을 입력해주세요"));
    }
    try {
      let user = await User.findOne({ where: { id } });

      if (!user) {
        return res
          .status(404)
          .json(responseMessage(false, "존재하지 않는 유저입니다."));
      }

      user = await user.update({ name }, { where: { id } });
      await user.save();

      return res.status(200).json(responseMessage(true, "", user));
    } catch (error) {
      console.log(error);
      return res.status(400).json(responseMessage(false, error.message));
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id }
    } = req;
    let parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
      return res
        .status(400)
        .json(responseMessage(false, "데이터가 이상합니다."));
    }

    try {
      const user = await User.findOne({ where: { id: parsedId } });

      if (!user) {
        return res
          .status(404)
          .json(responseMessage(false, "존재하지 않는 유저입니다."));
      }

      await user.destroy();

      return res.status(200).json(responseMessage(true, ""));
    } catch (error) {
      console.log(error);
      return res.status(400).json(responseMessage(false, error.message));
    }
  }
};
