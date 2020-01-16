import {
  Table,
  Column,
  DataType,
  Model,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
  ForeignKey
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import Board from "./Board";

const BCRYPT_ROUNDS = 10;

@Table({
  charset: "utf8mb4", // 한글에 이모티콘까지 가능
  collate: "utf8mb4_general_ci"
})
export default class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    comment: "user id"
  })
  userId!: string;

  @Column({
    type: DataType.STRING,
    comment: "이름"
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    comment: "password"
  })
  password!: string;

  @HasMany(() => Board)
  boards?: Board[];

  public comparePassword(password: string = ""): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeCreate
  @BeforeUpdate
  static async savePassword(user: User): Promise<void> {
    if (user.password) {
      const hashedPassword = await user.hashPassword(user.password);
      user.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}
