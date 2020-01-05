import { expect } from "chai";
import request from "supertest";
import "should";
import app from "../../app";
import { sequelize } from "../../config/config";
import Board from "../../config/models/Board";

describe("POST /boards는", () => {
  before(() => {
    return sequelize.sync({ force: true });
  });
  describe("성공시", () => {
    let name: string = "kim";
    let password: string = "test";

    before(done => {
      request(app)
        .post("/users")
        .send({ name, password })
        .expect(201)
        .end((err, res) => {
          done();
        });
    });
    let title: string = "제목";
    let content: string = "내용";
    let body: any;

    before(done => {
      request(app)
        .post("/boards")
        .send({ title, content })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 보드객체를 반환함", done => {
      body.data.should.have.property("id");
      done();
    });
  });
});
