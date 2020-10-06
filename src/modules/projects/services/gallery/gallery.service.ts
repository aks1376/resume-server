import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery } from '../../schemas/gallery.schema';

@Injectable()
export class GalleryService {

  constructor(@InjectModel('projects-gallery') private galleryModel: Model<Gallery>) { }

  async create(fileName, projectId, type): Promise<Gallery> {
    const createdImage = new this.galleryModel({
      fileName,
      projectId: projectId,
      type
    });
    const savedImage = await createdImage.save();
    return savedImage.toObject();
  }

  async getAll(): Promise<Gallery[]> {
    const medias = await this.galleryModel.find().exec();
    const mediasObj = [];
    for (const media of medias) {
      mediasObj.push(media.toObject());
    }
    return mediasObj;
  }

  async getProjectGallery(projectId): Promise<Gallery[]> {
    const medias = await this.galleryModel.find({ projectId }).exec();
    const mediasObj = [];
    for (const media of medias) {
      mediasObj.push(media.toObject());
    }
    return mediasObj;
  }

  update() { }

  delete(id): Promise<Gallery> {
    return this.galleryModel.findByIdAndDelete(id).exec();
  }
}
