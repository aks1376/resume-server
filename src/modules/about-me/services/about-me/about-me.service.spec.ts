import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../../app.module';
import { AboutMeModule } from '../../about-me.module';
import { AboutMeService } from './about-me.service';

describe('AboutMeService', () => {
  let service: AboutMeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutMeService],
      imports: [
        AppModule,
        AboutMeModule
      ]
    }).compile();

    service = module.get<AboutMeService>(AboutMeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
