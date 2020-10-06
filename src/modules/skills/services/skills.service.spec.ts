import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../app.module';
import { SkillsModule } from '../skills.module';
import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  let service: SkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillsService],
      imports: [
        AppModule,
        SkillsModule
      ]
    }).compile();

    service = module.get<SkillsService>(SkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
