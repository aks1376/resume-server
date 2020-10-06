import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCreatorDto } from '../../model/create-creator-dto';
import { CreatorsService } from '../../services/creators/creators.service';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';

@ApiTags('creators')
@Controller('creators')
export class CreatorsController {

  constructor(private creatorService: CreatorsService) { }

  @Post('/:projectId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addCreator(@Param('projectId') projectId, @Body() creator: CreateCreatorDto) {
    return this.creatorService.add(projectId, creator);
  }

  @Get('/:projectId')
  getProjectCreators(@Param('projectId') projectId) {
    return this.creatorService.getProjectCreators(projectId);
  }

  @Put('/:creatorId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateCreator(@Param('creatorId') creatorId, @Body() creator: CreateCreatorDto) {
    return this.updateCreator(creatorId, creator);
  }

  @Delete('/:creatorId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteCreator(@Param('creatorId') creatorId) {
    return this.creatorService.delete(creatorId);
  }
}
