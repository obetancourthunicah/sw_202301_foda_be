import supertest from 'supertest';
import { createServer } from '@config/express';
import { MongoDBConn } from '@dao/MongoDBConn';

describe('Server', () => {
  let server;
  beforeAll(async () => {
    const app = await createServer();
    server = app.listen(3001);
    global.agent = supertest.agent(server);
    global.agent.set('apikey', 'some_test_api_key');
  });
  afterAll(async () => {
    MongoDBConn.connection.close();
    await server.close();
  });
  it('should return 404', async () => {
    const response = await global.agent.get('/not-found');
    return expect(response.status).toBe(404);
  });
  it('should signin', async () => {
    const response = await global.agent.post('/security/signin').send({
      email: 'test@test.com',
      password: 'test',
    });
    console.log('SignIn', response.body);
    return expect(response.status).toBe(200);
  });
  it('should Login', async () => {
    const response = await global.agent.post('/security/signon').send({
      email: 'test@test.com',
      password: 'test',
    });
    console.log('SignOn', response.body);
    global.agent.set('Authorization', `Bearer ${response.body.token}`);
    return expect(response.status).toBe(200);
  });
  it('should get empresas', async () => {
    const response = await global.agent.get('/empresas/all');
    console.log('Empresas', response.body);
    return expect(response.status).toBe(200);
  });

  it('should add new empresas', async () => {
    const response = await global.agent.post('/empresas/new').send({
      "codigo": "ABC_1",
      "nombre": "Corporación ABC",
      "status": "Pending"
    });
    console.log('Empresas', response.body);
    return expect(response.status).toBe(200);
  });
  it('should add new empresas', async () => {
    const response = await global.agent.post('/empresas/new').send({
      "codigo": "ABC_1",
      "nombre": "Corporación ABC",
      "status": "Pending"
    });
    console.log('Empresas', response.body);
    return expect(response.status).toBe(200);
  });
  it('should get empresas by id', async () => {
    const empresas = await global.agent.get('/empresas/all');
    const id = empresas.body[0]._id;
    const response = await global.agent.get(`/empresas/byid/${id}`);
    console.log('Empresas', response.body);
    return expect(response.status).toBe(200);
  });
  it('should get empresa error by id', async () => {
    const id = '000000000000';
    const response = await global.agent.get(`/empresas/byid/${id}`);
    console.log('Empresas', response.body);
    return expect(response.status).not.toBe(200);
  });
  it('should update an existing empresas', async () => {
    const empresas = await global.agent.get('/empresas/all');
    const id = empresas.body[0]._id;
    const response = await global.agent.put(`/empresas/upd/${id}`).send({
      "codigo": "ABC_1",
      "nombre": "Corporación ABC",
      "status": "Active"
    });
    console.log('Empresas', response.body);
    return expect(response.status).toBe(200);
  });
  it('should delete an existing empresas', async () => {
    const empresas = await global.agent.get('/empresas/all');
    const id = empresas.body[0]._id;
    const response = await global.agent.delete(`/empresas/del/${id}`);
    console.log('Empresas', response.body);
    return expect(response.status).toBe(200);
  });
});
