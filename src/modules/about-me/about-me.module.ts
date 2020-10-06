import { Module } from '@nestjs/common';
import { AboutMeController } from './controllers/about-me/about-me.controller';
import { AboutMeService } from './services/about-me/about-me.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutMeSchema } from './schemas/about-me.schema';
import { OfficeSchema } from './schemas/office.schema';
import { OfficeController } from './controllers/office/office.controller';
import { OfficeService } from './services/office/office.service';

@Module({
  controllers: [
    AboutMeController,
    OfficeController
  ],
  providers: [
    AboutMeService,
    OfficeService
  ],
  imports: [
    MongooseModule.forFeature([
      { name: 'about-me', schema: AboutMeSchema },
      { name: 'offices', schema: OfficeSchema }
    ])
  ], 
  exports: [
    MongooseModule,
    AboutMeService,
    OfficeService
  ]
})
export class AboutMeModule { }
