import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDatabaseService } from './database-service.factory';
import { DBType } from './database-type.enum';
import { AbstractRepository } from './db.abstract.base';

@Module({})
export class DatabaseAbstractionModule {
  static register(dbType: DBType): DynamicModule {
    return {
      module: DatabaseAbstractionModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'DatabaseService',
          useFactory: (configService: ConfigService) =>
            createDatabaseService(dbType, configService),
          inject: [ConfigService],
        },
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: async (dbService: AbstractRepository) => {
            await dbService.connect();
            return dbService;
          },
          inject: ['DatabaseService'],
        },
      ],
      exports: ['DATABASE_CONNECTION', 'DatabaseService'],
    };
  }
}
