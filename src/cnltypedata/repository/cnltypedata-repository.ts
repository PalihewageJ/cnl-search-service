import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Model } from 'mongoose';

import {
  RawDataObject,
  RawDataObjectDocument,
} from '../schema/raw-data-object.schema';

@Injectable()
export class CnltypedataRepository {

  constructor(
    @InjectModel(RawDataObject.name)
    private cnltypeDataModel: Model<RawDataObjectDocument>,
  ) {}

  async findAll(): Promise<RawDataObject[]> {
    return await this.cnltypeDataModel.find();
  }

  async findOne(cnlNumber: string): Promise<RawDataObject[]> {
    return await this.cnltypeDataModel.findOne({ cnl: cnlNumber })
}

}


