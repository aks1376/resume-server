import { Controller, Post, Param, UseInterceptors, UploadedFile, Put, Delete, Get, Res, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GalleryService } from '../../services/gallery/gallery.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../../../modules/auth/guards/jwt-auth-guard/jwt-auth.guard';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {

  constructor(private galleryService: GalleryService) { }

  @Post('/:projectId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('media', {
    storage: diskStorage({
      destination: './upload/gallery',
      filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname);
      }
    })
  }))
  async addMediaToProject(@Param('projectId') projectId, @UploadedFile() file, @Req() req) {
    const fileName = file.filename;
    const createdMedia = await this.galleryService.create(fileName, projectId, file.mimetype);
    if (createdMedia?.fileName) {
      createdMedia.fileName = `${req.protocol}://${req.get('host')}/gallery/media/${createdMedia.fileName}`;
    }
    return createdMedia;
  }

  @Get()
  async getAllMedia(@Req() req) {
    const medias = await this.galleryService.getAll();
    for (const media of medias) {
      if (media?.fileName) {
        media.fileName = `${req.protocol}://${req.get('host')}/gallery/media/${media.fileName}`;
      }
    }
    return medias;
  }

  @Get('/project/:projectId')
  async getProjectMedia(@Param('projectId') projectId, @Req() req) {
    const medias = await this.galleryService.getProjectGallery(projectId);
    for (const media of medias) {
      if (media?.fileName) {
        media.fileName = `${req.protocol}://${req.get('host')}/gallery/media/${media.fileName}`;
      }
    }
    return medias;
  }

  @Get('/media/:name')
  sendMedia(@Param('name') name, @Res() res) {
    const filePath = `gallery/${name}`;
    return res.sendFile(filePath, { root: 'upload' });
  }

  @Put('/:imageId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './upload/gallery',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  }))
  updateImage(@Param('imageId') imageId) {
    return this.galleryService.update();
  }

  @Delete('/:imageId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteImage(@Param('imageId') imageId) {
    return this.galleryService.delete(imageId);
  }
}
