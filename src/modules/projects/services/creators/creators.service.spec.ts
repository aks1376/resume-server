import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './../../../../modules/users/users.module';
import { CreatorsService } from './creators.service';
import { ProjectsModule } from '../../projects.module';
import { AppModule } from './../../../../app.module';

describe('CreatorsService', () => {
  let service: CreatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatorsService],
      imports: [
        AppModule,
        UsersModule,
        ProjectsModule
      ]
    }).compile();

    service = module.get<CreatorsService>(CreatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
