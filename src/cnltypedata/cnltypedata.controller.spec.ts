import { Test, TestingModule } from '@nestjs/testing';
import { CnltypedataController } from './cnltypedata.controller';

describe('CnltypedataController', () => {
  let controller: CnltypedataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CnltypedataController],
    }).compile();

    controller = module.get<CnltypedataController>(CnltypedataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
