import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from './../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';
import { UsersModule } from '../users.module';
import { AppModule } from './../../../app.module';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [
        AppModule,
        UsersModule
      ],
      providers: [
        JwtAuthGuard
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get the users', () => {
    // controller.getUsers()
  })
});
