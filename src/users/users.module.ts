import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/global_services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '10d',
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy],
})
export class UsersModule {}
