import { describe, it } from '@jest/globals';
import * as request from 'supertest';

const gateway = 'https://dv6mhrpwge.execute-api.us-east-1.amazonaws.com/dev';
const server = request.agent(gateway);

describe('detail card integration tests', () => {
  it('it should return 200 if the token and the pk are sent', done => {
    server
      .get('/token')
      .set('Authorization', 'Bearer pk_test_xcJuDe2V3IgAYmEr')
      .set('x-idempotence-key', Math.random().toString())
      .set('Accept', 'application/json')
      .query({
        token: 'xpgzy80uPo1qAHjk',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });

  it('it should return 400 if the token does not exist', done => {
    server
      .get('/token')
      .set('Authorization', 'Bearer pk_test_xcJuDe2V3IgAYmEr')
      .set('x-idempotence-key', Math.random().toString())
      .set('Accept', 'application/json')
      .query({
        token: 'dsadsas',
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  });

  it("it should return 400 if it doesn't contain the pk", done => {
    server
      .get('/token')
      .set('Accept', 'application/json')
      .set('x-idempotence-key', Math.random().toString())
      .query({
        token: 'xpgzy80uPo1qAHjk',
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  });

  it('it should return a 401 if it does not contain the pk in the header', done => {
    server
      .get('/token')
      .set('Accept', 'application/json')
      .set('x-idempotence-key', Math.random().toString())
      .query({
        token: 'xpgzy80uPo1qAHjk',
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  });
});
