import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../app.module';
import { MessagesModule } from '../messages.module';
import { JwtAuthGuard } from './../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';
import { MessagesController } from './messages.controller';

describe('MessagesController', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      imports:[
        AppModule,
        MessagesModule
      ],
      providers: [
        JwtAuthGuard
      ]
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
