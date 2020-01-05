import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  Model,
  BeforeCreate,
  BeforeUpdate
} from "sequelize-typescript";
import bcrypt from "bcrypt";

const BCRYPT_ROUNDS = 10;

@Table
export default class User extends Model<User> {
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
