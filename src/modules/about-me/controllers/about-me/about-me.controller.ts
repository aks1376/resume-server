import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AboutMeService } from '../../services/about-me/about-me.service';
import { CreateAboutMeDto } from '../../models/create-about-me-dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';

@ApiTags('about-me')
@Controller('about-me')
export class AboutMeController {

  constructor(private aboutMeService: AboutMeService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createAboutMe(@Body() aboutMe: CreateAboutMeDto) {
    return this.aboutMeService.create(aboutMe);
  }

  @Get()
  getAboutMe() {
    return this.aboutMeService.get();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateAboutMe() {
    return this.aboutMeService.update();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteAboutMe(@Param('id') id) {
    return this.aboutMeService.delete(id);
  }

}
