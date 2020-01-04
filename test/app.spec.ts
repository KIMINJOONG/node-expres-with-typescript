import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import "should";
import { sequelize } from "../src/config/config";

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
