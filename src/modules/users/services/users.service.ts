import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../models/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../models/update-user-dto';
import { UserDto } from '../models/user-dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('users') private userModel: Model<User>
  ) { }

  async create(user: CreateUserDto): Promise<User> {
    const createdUSer = new this.userModel(user);
    const savedUser = await createdUSer.save();
    return savedUser.toObject();
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    const usersObj = [];
    for (const user of users) {
      const { password, ...userObj } = user.toObject();
      usersObj.push(userObj)
    }
    return usersObj;
  }

  async update(id, user: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: { ...user } }, { new: true }).exec();
    return updatedUser ? updatedUser.toObject() : undefined;
  }

  async delete(userId): Promise<User> {
    const deletedUser = await this.userModel.findOneAndRemove(userId).exec();
    return deletedUser ? deletedUser.toObject() : undefined;
  }

  async findByEmail(email): Promise<User> {
    const foundUser = await this.userModel.findOne({ email }).exec();
    return foundUser ? foundUser.toObject() : undefined;
  }

  async findById(userId): Promise<User> {
    const foundUser = await this.userModel.findById(userId).exec();
    return foundUser ? foundUser.toObject() : undefined;
  }

  async getOwner(): Promise<User> {
    const owner = await this.userModel.findOne({ role: 'owner' }).exec();
    let ownerObj;
    if (owner) {
      ownerObj = owner.toObject();
      delete ownerObj.password;
    }
    return ownerObj;
  }
}
