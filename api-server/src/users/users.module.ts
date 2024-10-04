import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataService } from 'src/data/data.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DataService],
})
export class UsersModule {}
