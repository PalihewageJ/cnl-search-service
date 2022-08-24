import { Test, TestingModule } from '@nestjs/testing';
import { CnltypedataService } from './cnltypedata.service';

describe('CnltypedataService', () => {
  let service: CnltypedataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CnltypedataService],
    }).compile();

    service = module.get<CnltypedataService>(CnltypedataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
