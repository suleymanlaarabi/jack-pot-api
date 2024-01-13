import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { SlotMachineModule } from './slot-machine/slot-machine.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DevtoolsModule.register({
      http: true,
    }),
    SlotMachineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
