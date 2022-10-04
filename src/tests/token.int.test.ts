import { describe, it } from "@jest/globals";
import * as request from "supertest";

const gateway = "http://localhost:4000/dev";
const server = request.agent(gateway);

describe("detail card integration tests", () => {
  it("it should return 200 if the token and the pk are sent", (done) => {
    server
      .get("/token")
      .set("Authorization", "Bearer pk_test_xcJuDe2V3IgAYmEr")
      .set("Accept", "application/json")
      .query({
        token: "xpgzy80uPo1qAHjk",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done);
  });

  it("it should return 400 if the token does not exist", (done) => {
    server
      .get("/token")
      .set("Authorization", "Bearer pk_test_xcJuDe2V3IgAYmEr")
      .set("Accept", "application/json")
      .query({
        token: "dsadsas",
      })
      .expect("Content-Type", /json/)
      .expect(401)
      .end(done);
  });

  it("it should return 400 if it doesn't contain the pk", (done) => {
    server
      .get("/token")
      .set("Accept", "application/json")
      .query({
        token: "xpgzy80uPo1qAHjk",
      })
      .expect("Content-Type", /json/)
      .expect(401)
      .end(done);
  });

  it("it should return a 400 if it does not contain the pk in the header", (done) => {
    server
      .get("/token")
      .set("Accept", "application/json")
      .send({
        token: "xpgzy80uPo1qAHjk",
      })
      .expect("Content-Type", /json/)
      .expect(401)
      .end(done);
  });
});
