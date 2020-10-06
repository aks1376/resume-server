import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from '../schemas/skill.schema';
import { CreateSkillDto } from '../model/create-skill-dto';
import { UpdateSkillDto } from '../model/update-skill-dto';

@Injectable()
export class SkillsService {

  constructor(@InjectModel('skills') private skillModel: Model<Skill>) { }

  async create(skill: CreateSkillDto): Promise<Skill> {
    const createdSkill = new this.skillModel(skill);
    const savedSkill = await createdSkill.save();
    return savedSkill.toObject();
  }

  async getAll(): Promise<Skill[]> {
    const skills = await this.skillModel.find().exec();
    const skillsObj = [];
    for (const skill of skills) {
      skillsObj.push(skill.toObject());
    }
    return skillsObj;
  }

  async update(id, skill: UpdateSkillDto): Promise<Skill> {
    const updatedSkill = await this.skillModel.findByIdAndUpdate(id, { $set: { ...skill } }, { new: true }).exec();
    return updatedSkill ? updatedSkill.toObject() : undefined;
  }

  async delete(id): Promise<Skill> {
    const deletedSkill = await this.skillModel.findByIdAndDelete(id).exec();
    return deletedSkill ? deletedSkill.toObject() : undefined;
  }
}
