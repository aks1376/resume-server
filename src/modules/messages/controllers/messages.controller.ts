import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../models/create-message-dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) { }

  @Post()
  createMessage(@Body() message: CreateMessageDto) {
    return this.messagesService.create(message);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMessages() {
    return this.messagesService.getAll();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteMessage(@Param('id') id) {
    return this.messagesService.delete(id);
  }

}
