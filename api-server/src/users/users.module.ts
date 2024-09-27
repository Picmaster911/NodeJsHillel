import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
