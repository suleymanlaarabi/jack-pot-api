import { Test, TestingModule } from '@nestjs/testing';
import { SlotMachineController } from './slot-machine.controller';

describe('SlotMachineController', () => {
  let controller: SlotMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotMachineController],
    }).compile();

    controller = module.get<SlotMachineController>(SlotMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
