import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schemas/message.schema';
import { CreateMessageDto } from '../models/create-message-dto';
import { MessageDto } from '../models/message-dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel('messages') private messagesModel: Model<Message>) { }

  create(message: CreateMessageDto): Promise<MessageDto> {
    const createdMessage = new this.messagesModel(message)
    return createdMessage.save();
   }

  getAll():Promise<MessageDto[]> {
    return this.messagesModel.find().exec();
   }

  delete(id): Promise<MessageDto> { 
    return this.messagesModel.findByIdAndDelete(id).exec();
  }
}
