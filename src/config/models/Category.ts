import { Table, Model, Column, DataType } from "sequelize-typescript";

type division = "type" | "genre";
@Table({
  charset: "utf8mb4", // 한글에 이모티콘까지 가능
  collate: "utf8mb4_general_ci"
})
export default class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    comment: "카테고리 명"
  })
  name!: string;

  @Column({
    type: DataType.ENUM("type", "genre"),
    comment: "카테고리 코드 구분"
  })
  division!: division;
}
