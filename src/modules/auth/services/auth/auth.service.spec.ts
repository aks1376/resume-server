import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './../../../../modules/users/services/users.service';
import { AppModule } from './../../../../app.module';
import { UsersModule } from './../../../../modules/users/users.module';
import { AuthService } from './auth.service';
import { AuthModule } from '../../auth.module';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        AuthModule,
        UsersModule
      ],
      providers: [
        AuthService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
