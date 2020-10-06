import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../../schemas/projects.schema';
import { CreateProjectDto } from '../../model/create-project-dto';

@Injectable()
export class ProjectsService {

  constructor(@InjectModel('projects') private projectModel: Model<Project>) { }

  create(project: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(project);
    return createdProject.save();
  }

  getAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  getById(projectId): Promise<Project> {
    return this.projectModel.findById(projectId).exec();
  }

  update(projectId, project: CreateProjectDto): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(projectId, { $set: {...project} }, { new: true }).exec();
  }

  delete(id): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
