import { Injectable } from '@nestjs/common';
import { CreateOfficeDto } from '../../models/create-office-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Office } from '../../schemas/office.schema';

@Injectable()
export class OfficeService {

  constructor(@InjectModel('offices') private officeModel: Model<Office>) { }

  create(office: CreateOfficeDto): Promise<Office> {
    const createdOffice = new this.officeModel({ ...office });
    return createdOffice.save();
  }

  getAll(): Promise<Office[]> {
    return this.officeModel.find().exec();
  }

  update() { }

  delete(id): Promise<Office> {
    return this.officeModel.findByIdAndDelete(id).exec();
  }

}
