import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/strategy/jwt-auth.guard';
import { RequestWithUserPayload } from 'src/users/users.controller';
import { PlayMachineDto } from './dto/playMachine.dto';
import { SlotMachineService } from './slot-machine.service';

@Controller('slot-machine')
export class SlotMachineController {
  constructor(private readonly slotMachineService: SlotMachineService) {}
  @UseGuards(JwtAuthGuard)
  @Post('play')
  async playSlotMachine(
    @Request() request: RequestWithUserPayload,
    @Body() data: PlayMachineDto,
  ) {
    return await this.slotMachineService.playMachine(request.user, data);
  }
}
