import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';
import { CreatorsController } from './creators.controller';
import { ProjectsModule } from '../../projects.module';
import { AppModule } from './../../../../app.module';

describe('CreatorsController', () => {
  let controller: CreatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorsController],
      imports:[
        AppModule,
        ProjectsModule
      ],
      providers: [
        JwtAuthGuard
      ]
    }).compile();

    controller = module.get<CreatorsController>(CreatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
