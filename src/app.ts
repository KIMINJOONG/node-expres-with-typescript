import express, { Request, Response, NextFunction } from "express";
import users from "./api/user";
import boards from "./api/board";
import morgan from "morgan";
import { sequelize } from "./config/config";
import tokenCheck from "./utils/tokenCheck";

const app = express();

app.use(morgan("dev"));
sequelize.sync({ force: true });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(tokenCheck);
app.use("/users", users);
app.use("/boards", boards);

interface Err extends Error {
  status: number;
  data?: any;
}
// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found") as Err;
  err.status = 404;
  next(err);
});

// error handle
app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    data: err.data
  });
});

app.listen(3000, () => {
  console.log("start");
});

export default app;
