import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../../app.module';
import { ProjectsModule } from '../../projects.module';
import { ProjectsService } from '../../services/projects/projects.service';
import { jwtSecret } from './../../../../modules/auth/config/jwt.secret';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';
import { ProjectsController } from './projects.controller';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      imports: [
        AppModule,
        ProjectsModule
      ],
      providers: [
        JwtAuthGuard,
        ProjectsService
      ]
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
