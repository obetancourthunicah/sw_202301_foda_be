import supertest from 'supertest';
import { createServer } from '@config/express';
import { MongoDBConn } from '@server/dao/MongoDBConn';

describe('Server', () => {
  let server;
  beforeAll(async () => {
    const app = await createServer();
    server = app.listen(3001);
    global.agent = supertest.agent(server);
  });
  afterAll(async () => {
    MongoDBConn.connection.close();
    await server.close();
  });
  it('should return 404', async () => {
    const response = await global.agent.get('/not-found');
    return expect(response.status).toBe(404);
  });
});
