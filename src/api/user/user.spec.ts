import { expect } from "chai";
import request from "supertest";
import app from "../../app";
import "should";
import { sequelize } from "../../config/config";
import User from "../../config/models/User";

describe("GET /users는", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => {
    return sequelize.sync({ force: true });
  });
  before(() => {
    return User.bulkCreate(users);
  });
  describe("성공시", () => {
    it("유저 객체를 담은 배열로 응답한다.", done => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.data.should.be.instanceOf(Array);
          done();
        });
    });
  });
});

describe("GET /users/:id 는", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => {
    return sequelize.sync({ force: true });
  });
  before(() => {
    return User.bulkCreate(users);
  });
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다.", done => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.data.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("id가 숫자가 아닐경우는 400으로 응답한다.", done => {
      request(app)
        .get("/users/one")
        .expect(400)
        .end(done);
    });
    it("id로 유저를 찾을 수 없는 경우 404로 응답한다.", done => {
      request(app)
        .get("/users/999")
        .expect(404)
        .end(done);
    });
  });
});

describe("POST users는", () => {
  before(() => {
    return sequelize.sync({ force: true });
  });

  describe("성공시", async () => {
    let name: string = "kim";
    let body: request.Response;

    before(done => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body.data;
          done();
        });
    });

    it("생성된 유저 객체를 반환한다", done => {
      body.should.have.property("id");
      done();
    });
  });
});

describe("PUT /users/:id", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];

  before(() => {
    return sequelize.sync({ force: true });
  });
  before(() => {
    return User.bulkCreate(users);
  });

  describe("성공시", () => {
    it("변경된 name을 응답한다.", done => {
      const name = "kimInJoong";
      request(app)
        .put("/users/1")
        .send({ name })
        .end((err, res) => {
          res.body.data.should.have.property("name", name);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("정수가 아닌 id의 경우 400을 응답한다", done => {
      request(app)
        .put("/users/one")
        .expect(400)
        .end(done);
    });

    it("name이 없을 경우 400을 응답한다", done => {
      request(app)
        .put("/users/1")
        .send({})
        .expect(400)
        .end(done);
    });

    it("없는 유저일 경우 404를 응답한다", done => {
      const name = "kimInJoong";
      request(app)
        .put("/users/999")
        .send({ name })
        .expect(404)
        .end(done);
    });
  });
});

describe("DELETE /users/:id는", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];

  before(() => {
    return sequelize.sync({ force: true });
  });
  before(() => {
    return User.bulkCreate(users);
  });

  describe("성공시", () => {
    it("200을 반환한다.", done => {
      request(app)
        .delete("/users/1")
        .expect(200)
        .end(done);
    });
  });

  describe("실패시", () => {
    it("아이디가 숫자가 아닐경우 400을 반환한다", done => {
      request(app)
        .delete("/users/one")
        .expect(400)
        .end(done);
    });

    it("없는 유저일경우 404를 반환한다.", done => {
      request(app)
        .delete("/users/999")
        .expect(404)
        .end(done);
    });
  });
});
