import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creator } from '../../schemas/creator.schema';
import { CreateCreatorDto } from '../../model/create-creator-dto';
import { CreatorDto } from '../../model/creator-dto';
import { UsersService } from './../../../../modules/users/services/users.service';

@Injectable()
export class CreatorsService {

  constructor(
    @InjectModel('creators') private creatorModel: Model<Creator>,
    private userService: UsersService
  ) { }

  async add(projectId, creator: CreateCreatorDto): Promise<CreatorDto> {
    const data = {
      projectId,
      ...creator
    }
    const newCreator = await (await new this.creatorModel(data).populate('users').save()).toObject();
    const user = await this.userService.findById(newCreator.userId);
    newCreator.user = user;
    return newCreator;
  }

  async getAll(): Promise<CreatorDto[]> {
    const creators = await this.creatorModel.find().exec();
    const creatorsArray: CreatorDto[] = []
    for (const creator of creators) {
      const creatorObj: CreatorDto = creator.toObject();
      const user = await this.userService.findById(creatorObj.userId);
      creatorObj.user = user.toObject();
    }

    return creatorsArray;
  }

  async getProjectCreators(projectId) {
    const creators = await this.creatorModel.find({ projectId }).exec();
    const creatorsArray: CreatorDto[] = []
    for (const creator of creators) {
      const creatorObj: CreatorDto = creator.toObject();
      const user = await this.userService.findById(creatorObj.userId);
      creatorObj.user = user.toObject();
      creatorsArray.push(creatorObj);
    }
    return creatorsArray;
  }

  async updateCreator(creatorId: string, update: CreateCreatorDto): Promise<CreatorDto> {
    const creator = await (await this.creatorModel.findByIdAndUpdate(creatorId, { $set: { ...update } }, { new: true }).exec()).toObject();
    const user = await (await this.userService.findById(creator.userId)).toObject();
    creator.user = user
    return creator;
  }

  async delete(creatorId: string): Promise<CreatorDto> {
    const creator = await (await this.creatorModel.findByIdAndRemove(creatorId).exec()).toObject();
    return creator;
  }
}
