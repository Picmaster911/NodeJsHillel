import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DataService } from 'src/data/data.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users.service';
import { DatabaseAbstractionModule } from 'src/dbcontext/database-abstraction.module';
import { DBType } from 'src/dbcontext/database-type.enum';

@Module({
  imports: [ConfigModule, DatabaseAbstractionModule.register(DBType.MONGODB)],
  controllers: [UsersController],
  providers: [UsersService, DataService],
})
export class UsersModule {}
