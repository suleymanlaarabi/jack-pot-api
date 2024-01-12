import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post('register')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.usersService.createUser(userData);
  }

  @Post('login')
  async loginUser(@Body() loginData: LoginUserDto) {
    return await this.usersService.login(loginData);
  }
}
