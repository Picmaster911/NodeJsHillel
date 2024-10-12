import { DataSource, Repository } from 'typeorm';
import { AbstractRepository } from './db.abstract.base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { PostgresEntityMapEnum } from './types/typeorm.model.map.enum';
import { DBType } from './database-type.enum';
import { UserOrm } from 'src/users/entities/user.type.orm';

@Injectable()
export class PostgresRepository extends AbstractRepository {
  private dataSource: DataSource;

  constructor(configService: ConfigService) {
    super();

    this.dataSource = new DataSource({
      type: DBType.POSTGRES,
      host: configService.get<string>('postgres.POSTGRES_HOST'),
      port: configService.get<number>('postgres.POSTGRES_PORT'),
      username: configService.get<string>('postgres.POSTGRES_USER'),
      password: configService.get<string>('postgres.POSTGRES_PASSWORD'),
      database: configService.get<string>('postgres.POSTGRES_DB'),
    });
  }

  async connect(): Promise<void> {
    try {
      await this.dataSource.initialize();
      console.log('Connected to Postgres');
    } catch (error) {
      console.error('Error connecting to Postgres:', error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.dataSource.destroy();
      console.log('Disconnected from Postgres');
    } catch (error) {
      console.error('Error disconnecting from Postgres:', error);
    }
  }

  async create(table: PostgresEntityMapEnum, data: any): Promise<void> {
    const repository = this.getRepository(table);
    const entity = repository.create(data);
    await repository.save(entity);
    console.log('Record inserted into Postgres');
  }

  async getById(table: PostgresEntityMapEnum, query: any): Promise<any> {
    const repository = this.getRepository(table);
    const result = await repository.findOneBy(query); // Используйте findOne или findOneBy
    return result;
  }

  async getAll(table: PostgresEntityMapEnum): Promise<any[]> {
    const repository = this.getRepository(table); // Получаем репозиторий для указанной таблицы
    return repository.find(); // Возвращаем все записи из таблицы
  }

  async update(
    table: PostgresEntityMapEnum,
    id: string,
    item: Partial<any>,
  ): Promise<any | null> {
    const repository = this.getRepository(table);
    await repository.update(id, item); // Обновление записи
    return this.getById(table, id); // Возвращаем обновленную запись
  }
  async delete(table: PostgresEntityMapEnum, id: string): Promise<boolean> {
    const repository = this.getRepository(table);
    const result = await repository.delete(id); // Удаление записи
    return result.affected !== undefined && result.affected > 0;
  }
  private getEntity(table: PostgresEntityMapEnum): EntityClassOrSchema {
    switch (table) {
      case PostgresEntityMapEnum.USER:
        return UserOrm;

      default:
        throw new Error('Unknown entity');
    }
  }

  private getRepository(table: PostgresEntityMapEnum): Repository<any> {
    const entity = this.getEntity(table);
    return this.dataSource.getRepository(entity);
  }
}
