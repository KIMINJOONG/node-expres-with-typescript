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

  @Column({
    type: DataType.INTEGER,
    comment: "타입"
  })
  category!: number;

  @Column({
    type: DataType.INTEGER,
    comment: "장르"
  })
  genre!: number;

  @Column({
    type: DataType.STRING,
    comment: "대회 시작 날짜"
  })
  competitionStartDate: string | undefined;

  @Column({
    type: DataType.INTEGER,
    comment: "국가"
  })
  country: number | undefined;
  @Column({
    type: DataType.STRING,
    comment: "대회 장소"
  })
  place: string | undefined;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  author!: User;

  @HasMany(() => Image)
  images?: Image[];
}
