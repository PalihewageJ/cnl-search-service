import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CnltypedataController } from './cnltypedata.controller';
import { CnltypedataService } from './cnltypedata.service';
import { CnltypedataRepository } from './repository/cnltypedata-repository';
import { RawDataObject, rawDataSchema } from './schema/raw-data-object.schema';
import {recordObjectSchema,RecordObject} from './schema/record-object.schema'

@Module({
  
  imports: [MongooseModule.forFeature([
    {name:RawDataObject.name,schema:rawDataSchema},
    {name:RecordObject.name,schema:recordObjectSchema}
  ])],
  controllers: [CnltypedataController],
  providers: [CnltypedataService,CnltypedataRepository],
})
export class CnltypedataModule {}
