import jwt from "jsonwebtoken";

const createJWT = (id: string): string => {
  const token = jwt.sign(
    {
      id
    },
    "YukWmnssxCARfg8GK3be85mcnUVAG3gzA5yQLCHbFnSJH7JghGN"
  );
  return token;
};

export default createJWT;
