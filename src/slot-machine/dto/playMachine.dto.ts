import { IsNotEmpty, Min } from 'class-validator';

export class PlayMachineDto {
  @IsNotEmpty()
  @Min(1)
  amount: number;
}
