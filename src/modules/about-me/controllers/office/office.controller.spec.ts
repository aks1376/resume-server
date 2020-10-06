import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../../app.module';
import { AboutMeModule } from '../../about-me.module';
import { OfficeService } from '../../services/office/office.service';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';
import { OfficeController } from './office.controller';

describe('OfficeController', () => {
  let controller: OfficeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeController],
      imports: [
        AppModule,
        AboutMeModule
      ],
      providers: [
        JwtAuthGuard,
        OfficeService
      ]
    }).compile();

    controller = module.get<OfficeController>(OfficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
