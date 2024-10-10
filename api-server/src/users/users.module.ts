import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DataService } from 'src/data/data.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDatabaseService } from 'src/dbcontext/database-service.factory';
import { Model } from 'mongoose';
import { DBType } from 'src/dbcontext/database-type.enum';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'DatabaseService',
      useFactory: async (
        configService: ConfigService,
        userModel: Model<UserDocument>,
      ) => {
        const dbType = DBType.MONGODB;
        const databaseService = createDatabaseService<User, UserDocument>(
          dbType,
          configService,
          userModel,
          null,
        );
        if (databaseService) {
          await databaseService.connect();
        }
        return databaseService;
      },
      inject: [ConfigService, getModelToken(User.name)],
    },
    ,
    UsersService,
    DataService,
  ],
})
export class UsersModule {}
