import { Controller, Post, Get, Put, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { ProjectsService } from '../../services/projects/projects.service';
import { CreateProjectDto } from '../../model/create-project-dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {

  constructor(private projectsService: ProjectsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createProject(@Body() project: CreateProjectDto) {
    return this.projectsService.create(project);
  }

  @Get()
  getProjects() {
    return this.projectsService.getAll();
  }

  @Get('/:projectId')
  getProjectById(@Param('projectId') projectId) {
    return this.projectsService.getById(projectId);
  }

  @Put('/:projectId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateProject(@Param('projectId') projectId, @Body() project: CreateProjectDto) {
    return this.projectsService.update(projectId, project);
  }

  @Delete('/:projectId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteProject(@Param('projectId') id) {
    return this.projectsService.delete(id);
  }

}
