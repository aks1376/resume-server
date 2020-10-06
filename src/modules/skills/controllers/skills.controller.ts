import { Controller, Post, Get, Put, Delete, Body, Param, UseInterceptors, UploadedFile, Req, Res, UseGuards } from '@nestjs/common';
import { SkillsService } from '../services/skills.service';
import { CreateSkillDto } from '../model/create-skill-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateSkillDto } from '../model/update-skill-dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {

  constructor(private skillsService: SkillsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('icon', {
    storage: diskStorage({
      destination: './upload/icons',
      filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname);
      }
    })
  }))
  async createSkill(@UploadedFile() file, @Body() skill: CreateSkillDto, @Req() req) {
    skill.icon = file.filename;
    const createdSkill = await this.skillsService.create(skill);
    if(createdSkill?.icon){
      createdSkill.icon = `${req.protocol}://${req.get('host')}/skills/icon/${createdSkill.icon}`;
    }
    return createdSkill;
  }

  @Get()
  async getSkills(@Req() req) {
    const skills = await this.skillsService.getAll();
    for(const skill of skills) {
      if(skill?.icon){
        skill.icon = `${req.protocol}://${req.get('host')}/skills/icon/${skill.icon}`;
      }
    }
    return skills;
  }

  @Get('/icon/:name')
  getIcon(@Param('name') name, @Res() res) {
    const filePath = `icons/${name}`;
    res.sendFile(filePath, { root: 'upload' });
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('icon', {
    storage: diskStorage({
      destination: './upload/icons',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  }))
  async updateSkill(@Param('id') id, @Body() skill: UpdateSkillDto, @UploadedFile() file, @Req() req) {
    if (file) skill.icon = file.filename;
    const updatedSkill = await this.skillsService.update(id, skill);
    if(updatedSkill?.icon) {
      updatedSkill.icon =  `${req.protocol}://${req.get('host')}/skills/icon/${updatedSkill.icon}`;
    }
    return updatedSkill;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteSkill(@Param('id') id) {
    return this.skillsService.delete(id);
  }
}
