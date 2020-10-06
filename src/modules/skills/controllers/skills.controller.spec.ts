import { Test, TestingModule } from '@nestjs/testing';
import { SkillsModule } from '../skills.module';
import { AppModule } from './../../../app.module';
import { JwtAuthGuard } from './../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';
import { SkillsController } from './skills.controller';

describe('SkillsController', () => {
  let controller: SkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsController],
      imports:[
        AppModule,
        SkillsModule
      ],
      providers: [
        JwtAuthGuard
      ]
    }).compile();

    controller = module.get<SkillsController>(SkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
