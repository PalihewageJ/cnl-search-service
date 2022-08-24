import { Injectable, NotFoundException } from '@nestjs/common';
import { CnltypedataRepository } from './repository/cnltypedata-repository';
import { RawDataObject } from './schema/raw-data-object.schema';

@Injectable()
export class CnltypedataService {
  constructor(private cnltypedataRepository: CnltypedataRepository) {}

  async getAllPlmData(): Promise<RawDataObject[]> {
    return await this.cnltypedataRepository.findAll();
  }

getCnlDataById(cnlNumber: string): Promise<RawDataObject[]> {

  let cnlData = this.cnltypedataRepository.findOne(cnlNumber)
  if (!cnlData) {
      throw new NotFoundException(`${cnlNumber}`)
  }
  return cnlData
}
}
