import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import "should";
import { sequelize } from "../src/config/config";
import User from "../src/config/models/User";

describe("app.test", () => {
  const req = request(app);

  it("GET /", async () => {
    const res = await req.get("/").expect(200);
    expect(res.text).to.equal("hello");
  });

  it("GET /not_found", async () => {
    const res = await req.get("/not_found").expect(404);
    expect(res.body.message).to.equal("Not Found");
  });
});

describe("GET /user는", () => {
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
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });
});

describe("GET /user:id 는", () => {
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
          res.body.should.have.property("id", 1);
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

describe("POST user는", () => {
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
          body = res.body;
          done();
        });
    });

    it("생성된 유저 객체를 반환한다", done => {
      body.should.have.property("id");
      done();
    });
  });
});
