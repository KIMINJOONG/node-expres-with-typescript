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

describe.only("PUT /boards/:id는", () => {
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

    it("수정한 게시글 객체를 반환", done => {
      const title = "update";
      request(app)
        .put("/boards/1")
        .send({ title })
        .end((err, res) => {
          res.body.data.should.have.property("title", title);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("게시글 id값이 숫자가 아닐경우 404를 리턴", done => {
      request(app)
        .put("/boards/one")
        .expect(404)
        .end(done);
    });

    it("존재하지 않는 게시글일 경우 400을 리턴", done => {
      request(app)
        .put("/boards/999")
        .expect(400)
        .end(done);
    });
  });
});

describe("DELETE /boards/:id", () => {
  describe("성공시", () => {
    it("200을 반환한다.", done => {
      request(app)
        .delete("/boareds/1")
        .expect(200)
        .end(done);
    });
  });

  describe("실패시", () => {
    it("id값이 숫자가 아닐경우 404를 반환한다", done => {
      request(app)
        .delete("/boards/one")
        .expect(404)
        .end(done);
    });

    it("게시글이 존재하지않을경우 400을 리턴한다", done => {
      request(app)
        .delete("/boards/999")
        .expect(400)
        .end(done);
    });
  });
});
