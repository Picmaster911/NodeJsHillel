import { ConfigService } from '@nestjs/config';
import { MongoRepository } from './db.mongo.base';
import { AbstractRepository } from './db.abstract.base';
import { PostgresRepository } from './db.postgres.base';
import { DBType } from './database-type.enum';
import { HydratedDocument, Model } from 'mongoose';
import { Repository } from 'typeorm';
import { BaseEntity } from './contracts/base.entety.itnerface';

export const createDatabaseService = <
  TCreate,
  TDocument extends HydratedDocument<any> = never,
  TEntity extends BaseEntity = never,
>(
  dbType: DBType,
  configService: ConfigService,
  model?: Model<TDocument>,
  repository?: Repository<TEntity>,
): AbstractRepository<TCreate, TDocument | TEntity> => {
  switch (dbType) {
    case DBType.MONGODB:
      return new MongoRepository<TCreate, TDocument>(configService, model);

    case DBType.POSTGRES:
      return new PostgresRepository<TCreate, TEntity>(
        configService,
        repository,
      );

    default:
      throw new Error('Unsupported DB type');
  }
};
