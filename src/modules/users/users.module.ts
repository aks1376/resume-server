import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  controllers: [
    UsersController
  ],
  providers: [
    UsersService
  ],
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  exports: [
    UsersService,
    MongooseModule
  ]
})
export class UsersModule { }
