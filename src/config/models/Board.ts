import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  HasMany,
  ForeignKey
} from "sequelize-typescript";
import User from "./User";
import Image from "./Image";

@Table({
  charset: "utf8mb4", // 한글에 이모티콘까지 가능
  collate: "utf8mb4_general_ci"
})
export default class Board extends Model<Board> {
  @Column({
    type: DataType.STRING,
    comment: "제목"
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    comment: "내용"
  })
  content!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  author!: User;

  @HasMany(() => Image)
  images?: Image[];
}
