import { ConfigService } from '@nestjs/config';
import { MongoRepository } from './db.mongo.base';
import { AbstractRepository } from './db.abstract.base';
import { PostgresRepository } from './db.postgres.base';
import { DBType } from './database-type.enum';

export const createDatabaseService = (
  dbType: DBType,
  configService: ConfigService,
): AbstractRepository => {
  switch (dbType) {
    case DBType.MONGODB:
      return new MongoRepository(configService);

    case DBType.POSTGRES:
      return new PostgresRepository(configService);

    default:
      throw new Error('Unsupported DB type');
  }
};
