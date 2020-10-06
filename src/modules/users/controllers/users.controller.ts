import { Controller, Post, Get, Put, Delete, Param, Body, UseInterceptors, UploadedFile, Res, UseGuards, Request, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../models/create-user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateUserDto } from '../models/update-user-dto';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '../models/user-dto';
import { JwtAuthGuard } from './../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './upload/avatars',
      filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname)
      }
    }),
  }))
  @ApiCreatedResponse({
    status: 200,
    description: 'The User has been successfully created.',
    type: UserDto,
  })
  async createUser(@UploadedFile() file, @Body() user: CreateUserDto, @Request() req) {
    if (file) {
      user.avatar = file.filename;
    }
    const createdUser = await this.usersService.create(user);
    delete createdUser.password;
    if (createdUser?.avatar) {
      createdUser.avatar = `${req.protocol}://${req.get('host')}/users/avatar/${createdUser.avatar}`;
    }
    return createdUser;
  }

  @Get()
  async getUsers(@Request() req) {
    const users = await this.usersService.getAll();
    for (const user of users) {
      if (user?.avatar) {
        user.avatar = `${req.protocol}://${req.get('host')}/users/avatar/${user.avatar}`;
      }
    }
    return users;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req) {
    const me = await this.usersService.findById(req.user.id);
    if (me?.avatar) {
      me.avatar = `${req.protocol}://${req.get('host')}/users/avatar/${me.avatar}`;
    }
    return me;
  }

  @Get('/avatar/:name')
  getUserAvatar(@Param('name') name: string, @Res() res) {
    const filePath = `avatars/${name}`;
    return res.sendFile(filePath, { root: 'upload' });
  }

  @Get('/owner')
  async getWebsiteOwner(@Request() req) {
    const owner = await this.usersService.getOwner();
    if (owner?.avatar) {
      owner.avatar = `${req.protocol}://${req.get('host')}/users/avatar/${owner.avatar}`;
    }
    return owner;
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './upload/avatars',
      filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname)
      }
    }),
  }))
  async updateUser(@Param('id') userId, @Body() user: UpdateUserDto, @UploadedFile() file, @Req() req) {
    if (file) user.avatar = file.filename;
    const updatedUser = await this.usersService.update(userId, user);
    if (updatedUser?.avatar) {
      updatedUser.avatar = `${req.protocol}://${req.get('host')}/users/avatar/${updatedUser.avatar}`;
    }
    return updatedUser;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('id') userId) {
    return this.usersService.delete(userId)
  }

}
