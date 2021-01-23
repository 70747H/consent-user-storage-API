import 'jest-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import * as request from 'supertest';
import { createEventObject, createUserObject, usersEmptyGetResponse, usersGetResponse } from "./test.data";
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;
  let module: TestingModule;
  let connection: Connection;
  let createdUserId;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = module.get(Connection);
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await connection.synchronize(true);
    module.close();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(usersEmptyGetResponse);
  });

  it('/users (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserObject);
    expect(response.status).toEqual(201);
    expect(response.body.data.email).toEqual(createUserObject.email);
    expect(response.body.data).toContainKeys(['id', 'email', 'createdAt', 'updatedAt', 'deletedAt']);
    createdUserId = response.body.data.id;
  });

  it('/events (GET)', () => {
    return request(app.getHttpServer())
      .get('/events')
      .expect(200)
      .expect(usersEmptyGetResponse);
  });

  it('/events (POST) Fail', async () => {
    const response = await  request(app.getHttpServer())
      .post('/events')
      .send();
    expect(response.status).toEqual(400);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body.error).toEqual('Bad Request');
  });

  it('/events (POST) Success', async () => {
    const createObject = { ...createEventObject };
    createObject.user.id = createdUserId;
    const response = await request(app.getHttpServer())
      .post('/events')
      .send(createObject);
    expect(response.status).toEqual(201);
    expect(response.body.data).toContainKeys(['id', 'userId', 'consents', 'createdAt', 'updatedAt', 'deletedAt']);
  });

});
