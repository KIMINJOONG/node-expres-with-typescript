import User from "../config/models/User";
import jwt from "jsonwebtoken";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  if (token) {
    const decoded: any = jwt.verify(
      token,
      "YukWmnssxCARfg8GK3be85mcnUVAG3gzA5yQLCHbFnSJH7JghGN"
    );

    const { id } = decoded;
    const user = await User.findOne({ where: { id } });
    if (user) {
      return user;
    }
  }
};
export default decodeJWT;
