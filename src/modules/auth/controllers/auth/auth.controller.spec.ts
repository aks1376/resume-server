import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../../../../app.module';
import { AuthModule } from '../../auth.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/resume'),
        AppModule,
        AuthModule,
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/POST login', (done) => {
    return request(app.getHttpServer()).post('/auth/login').send({ email: 'a@g.com', password: 123 }).expect(200).end((err, res) => {
      console.log(err);
      
      done();
    });
  })

  afterAll(async () => {
    await app.close();
  });
});
