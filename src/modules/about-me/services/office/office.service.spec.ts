import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../../app.module';
import { AboutMeModule } from '../../about-me.module';
import { OfficeService } from './office.service';

describe('OfficeService', () => {
  let service: OfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficeService],
      imports: [
        AppModule,
        AboutMeModule
      ]
    }).compile();

    service = module.get<OfficeService>(OfficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
