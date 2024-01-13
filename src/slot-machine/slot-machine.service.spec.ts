import { Test, TestingModule } from '@nestjs/testing';
import { SlotMachineService } from './slot-machine.service';

describe('SlotMachineService', () => {
  let service: SlotMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotMachineService],
    }).compile();

    service = module.get<SlotMachineService>(SlotMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
