import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: "type_test",
  dialect: "mysql",
  username: "root",
  password: "PASSWORD",
  models: [__dirname + "/models"] // or [Player, Team],
});
