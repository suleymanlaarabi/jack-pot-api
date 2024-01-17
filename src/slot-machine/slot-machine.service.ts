import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global_services/prisma.service';
import { UserPayload } from 'src/users/users.service';
import { PlayMachineDto } from './dto/playMachine.dto';
import { SlotMachineError } from './types/slotMachine.error';

@Injectable()
export class SlotMachineService {
  constructor(private readonly prismaService: PrismaService) {}

  async playMachine(user: UserPayload, data: PlayMachineDto) {
    const { id } = user;
    const { amount } = data;
    console.log(amount);

    let newMoney = (
      await this.prismaService.user.findUnique({
        where: { id },
      })
    ).money;

    if (newMoney >= amount) {
      this.prismaService.user.update({
        where: { id },
        data: {
          money: newMoney - amount,
        },
      });
      newMoney -= amount;
    } else {
      throw new HttpException(
        SlotMachineError.NOT_ENOUGH_MONEY,
        HttpStatus.PAYMENT_REQUIRED,
      );
    }

    const roll = [
      this.getNumberBetween1To7(),
      this.getNumberBetween1To7(),
      this.getNumberBetween1To7(),
    ];

    console.log(roll);

    let multiplier = 0;

    if (roll[0] === roll[1] && roll[1] === roll[2]) {
      console.log('3');
      multiplier = 2;
    } else if (
      roll[0] === roll[1] ||
      roll[1] === roll[2] ||
      roll[0] === roll[2]
    ) {
      multiplier = 1;
    }

    console.log(amount, multiplier);

    newMoney = newMoney + amount * multiplier;

    await this.prismaService.user.update({
      where: { id },
      data: {
        money: newMoney,
      },
    });

    return {
      roll,
      newMoney,
    };
  }

  getNumberBetween1To7() {
    return Math.round(Math.random() * 6 + 1);
  }
}
