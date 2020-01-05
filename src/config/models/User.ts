import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  Model
} from "sequelize-typescript";

@Table
export default class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    comment: "이름"
  })
  name!: string;

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;
}
