import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../../../app.module';
import { ProjectsModule } from '../../projects.module';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';
import { GalleryController } from './gallery.controller';

describe('GalleryController', () => {
  let controller: GalleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalleryController],
      imports:[
        AppModule,
        ProjectsModule
      ],
      providers: [
        JwtAuthGuard
      ]
    }).compile();

    controller = module.get<GalleryController>(GalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
