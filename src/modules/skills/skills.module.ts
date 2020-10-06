import { Module } from '@nestjs/common';
import { SkillsController } from './controllers/skills.controller';
import { SkillsService } from './services/skills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from './schemas/skill.schema';

@Module({
  controllers: [
    SkillsController,
  ],
  providers: [
    SkillsService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: 'skills', schema: SkillSchema }]),
  ],
  exports: [
    MongooseModule,
    SkillsService
  ]
})
export class SkillsModule { }
