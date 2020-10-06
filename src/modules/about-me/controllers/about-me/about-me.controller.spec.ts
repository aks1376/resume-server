
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../../app.module';
import { AboutMeModule } from '../../about-me.module';
import { AboutMeService } from '../../services/about-me/about-me.service';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';
import { AboutMeController } from './about-me.controller';

describe('AboutMeController', () => {
  let controller: AboutMeController;
  let aboutMeService: AboutMeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutMeController],
      imports: [
        AppModule,
        AboutMeModule
      ],
      providers: [
        JwtAuthGuard
      ]
    }).compile();

    controller = module.get<AboutMeController>(AboutMeController);
    aboutMeService = module.get<AboutMeService>(AboutMeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
