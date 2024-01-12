import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class LoginUserDto {
  @ValidateIf((data) => !data.username)
  @IsEmail()
  email: string;

  @ValidateIf((data) => !data.email)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
