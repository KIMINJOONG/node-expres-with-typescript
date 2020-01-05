import { expect } from "chai";
import request from "supertest";
import "should";
import app from "../../app";
import { sequelize } from "../../config/config";
import Board from "../../config/models/Board";

describe("GET /boards", () => {
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

    it("board리스트를 반환함", done => {
      request(app)
        .get("/boards")
        .end((error, res) => {
          res.body.data.should.be.instanceOf(Array);
          done();
        });
    });
  });
});

describe("GET /boards/:id는", () => {
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

    it("해당 아이디의 게시글 객체를 반환함", done => {
      request(app)
        .get("/boards/1")
        .end((err, res) => {
          res.body.data.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("id의 값이 숫자가 아닐때 400으로 응답한다.", done => {
      request(app)
        .get("/boards/one")
        .expect(400)
        .end(done);
    });

    it("id로 게시글을 찾을수 없는경우 404로 응답한다", done => {
      request(app)
        .get("/boards/999")
        .expect(404)
        .end(done);
    });
  });
});

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
