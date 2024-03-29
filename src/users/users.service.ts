import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global_services/prisma.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersError } from './types/users.error';
import { LoginUserDto } from './dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';

export type UserPayload = {
  id: number;
  username: string;
  money: number;
};

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    return users;
  }
  async createUser(createUserData: CreateUserDto) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: createUserData.email,
          },
          {
            username: createUserData.username,
          },
        ],
      },
    });

    if (existingUser) {
      throw new HttpException(
        {
          message: [UsersError.USER_ALREADY_EXIST],
        },
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await this.prismaService.user.create({
      data: {
        ...createUserData,
        password: await hashSync(
          createUserData.password,
          JSON.parse(process.env.BCRYPT_SECRET),
        ),
      },
    });

    return this.authenticateUser({
      id: newUser.id,
      username: newUser.username,
      money: newUser.money,
    });
  }

  async login(loginUserData: LoginUserDto) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: loginUserData.email },
          { username: loginUserData.username },
        ],
      },
    });

    if (!existingUser) {
      throw new HttpException(
        {
          message: [UsersError.USER_NOT_EXIST],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!compareSync(loginUserData.password, existingUser.password)) {
      throw new HttpException(
        {
          message: [UsersError.PASSWORD_NOT_MATCH],
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.authenticateUser({
      id: existingUser.id,
      username: existingUser.username,
      money: existingUser.money,
    });
  }

  async getUserProfile(user: UserPayload) {
    const { id } = user;

    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        money: true,
      },
    });

    if (!existingUser) {
      throw new HttpException(
        {
          message: [UsersError.USER_NOT_EXIST],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return existingUser;
  }

  async authenticateUser(payload: UserPayload) {
    return {
      acces_token: this.jwtService.sign(payload),
    };
  }
}
