import { Controller, Get, Param} from '@nestjs/common';
import { CnltypedataService } from './cnltypedata.service';
import { RawDataObject } from './schema/raw-data-object.schema';


@Controller('cnl-type-data')
export class CnltypedataController {
  constructor(private cnltypedataService: CnltypedataService) {}

  @Get()
  getAllPlmData(): Promise<RawDataObject[]> {
    return this.cnltypedataService.getAllPlmData();
  }

  @Get('/:cnlNumber')
  getCnlDataById(@Param('cnlNumber') cnlNumber: string): Promise<RawDataObject[]> {

      return this.cnltypedataService.getCnlDataById(cnlNumber)
  }

}
