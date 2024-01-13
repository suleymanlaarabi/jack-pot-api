import { Module } from '@nestjs/common';
import { SlotMachineController } from './slot-machine.controller';
import { SlotMachineService } from './slot-machine.service';
import { PrismaService } from 'src/global_services/prisma.service';

@Module({
  controllers: [SlotMachineController],
  providers: [SlotMachineService, PrismaService],
})
export class SlotMachineModule {}
