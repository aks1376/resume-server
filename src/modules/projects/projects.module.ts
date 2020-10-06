import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schemas/projects.schema';
import { GallerySchema } from './schemas/gallery.schema';
import { GalleryController } from './controllers/gallery/gallery.controller';
import { GalleryService } from './services/gallery/gallery.service';
import { CreatorsService } from './services/creators/creators.service';
import { CreatorSchema } from './schemas/creator.schema';
import { CreatorsController } from './controllers/creators/creators.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [
    ProjectsController,
    GalleryController,
    CreatorsController
  ],
  providers: [
    ProjectsService,
    GalleryService,
    CreatorsService
  ],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'projects', schema: ProjectSchema },
      { name: 'projects-gallery', schema: GallerySchema },
      { name: 'creators', schema: CreatorSchema }
    ])
  ],
  exports: [
    ProjectsService,
    GalleryService,
    CreatorsService,
    MongooseModule
  ]
})
export class ProjectsModule { }
