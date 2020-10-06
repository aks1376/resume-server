import { Controller, Post, Get, Put, Delete, Body, Param, UseInterceptors, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { OfficeService } from '../../services/office/office.service';
import { CreateOfficeDto } from '../../models/create-office-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';

@ApiTags('office')
@Controller('office')
export class OfficeController {

  constructor(private officeService: OfficeService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('icon', {
    storage: diskStorage({
      destination: './upload/icons',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  }))
  createOffice(@UploadedFile() file, @Body() office: CreateOfficeDto) {
    office.icon = file.originalname;
    return this.officeService.create(office);
  }

  @Get('/icon/:name')
  getIcon(@Param('name') name, @Res() res) {
    const filePath = `icons/${name}`;
    res.sendFile(filePath, { root: 'upload' });
  }

  @Get()
  getOffices() {
    return this.officeService.getAll();
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateOffice(@Param('id') id) {
    return this.officeService.update();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteOffice(@Param('id') id) {
    return this.officeService.delete(id);
  }
}
