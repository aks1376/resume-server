import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutMe } from '../../schemas/about-me.schema';
import { CreateAboutMeDto } from '../../models/create-about-me-dto';

@Injectable()
export class AboutMeService {

  constructor(@InjectModel('about-me') private aboutMeModel: Model<AboutMe>) { }

  create(aboutMe: CreateAboutMeDto): Promise<AboutMe> {
    const createdAboutMe = new this.aboutMeModel({ ...aboutMe });
    return createdAboutMe.save();
  }

  get(): Promise<AboutMe[]> {
    return this.aboutMeModel.find().exec();
  }
  update() { }

  delete(id): Promise<AboutMe> {
    return this.aboutMeModel.findByIdAndDelete().exec();
  }
}
