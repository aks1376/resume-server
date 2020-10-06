import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../../app.module';
import { ProjectsModule } from '../../projects.module';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
      imports: [
        AppModule,
        ProjectsModule,
      ]
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
