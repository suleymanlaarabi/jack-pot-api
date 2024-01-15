import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserPayload, UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

export interface RequestWithUserPayload extends Request {
  user: UserPayload;
}
export interface UserResponse {
  access_token: string;
}
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.usersService.createUser(userData);
  }

  @Post('login')
  async loginUser(@Body() loginData: LoginUserDto) {
    return await this.usersService.login(loginData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async authenticate(@Request() request: RequestWithUserPayload) {
    return await this.usersService.getUserProfile(request.user);
  }
}
