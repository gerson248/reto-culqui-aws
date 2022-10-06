import { describe, it } from "@jest/globals";
import * as request from "supertest";

const gateway = "https://dv6mhrpwge.execute-api.us-east-1.amazonaws.com/dev";
const server = request.agent(gateway);

describe("create card integration tests", () => {
  it("it should return a 200 for correct creation of the card", (done) => {
    server
      .post("/card")
      .set("Authorization", "Bearer pk_test_xcJuDe2V3IgAYmEa")
      .set('x-idempotence-key', Math.random().toString())
      .set("Accept", "application/json")
      .send({
        card_number: 12345678901234,
        cvv: 132,
        expiration_month: 2,
        expiration_year: "2023",
        email: "prueba1000000.expira@hotmail.com",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done);
  });

  it("it should return a 400 for the incorrect creation", (done) => {
    server
      .post("/card")
      .set("Authorization", "Bearer pk_test_xcJuDe2V3IgAYmEr")
      .set('x-idempotence-key', Math.random().toString())
      .set("Accept", "application/json")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400)
      .end(done);
  });

  it("it should return a 401 if it does not contain the pk in the header", (done) => {
    server
      .post("/card")
      .set("Accept", "application/json")
      .set('x-idempotence-key', Math.random().toString())
      .send({
        card_number: 12345678901234,
        cvv: 132,
        expiration_month: 2,
        expiration_year: "2023",
        email: "prueba1000000.expira@hotmail.com",
      })
      .expect("Content-Type", /json/)
      .expect(401)
      .end(done);
  });
});
