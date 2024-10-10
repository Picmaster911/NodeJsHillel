import {
  Repository,
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import { AbstractRepository } from './db.abstract.base';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { BaseEntity } from './contracts/base.entety.itnerface';

@Injectable()
export class PostgresRepository<
  TCreate,
  TEntity extends BaseEntity,
> extends AbstractRepository<TCreate, TEntity> {
  connect(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly repository: Repository<TEntity>;

  constructor(configService: ConfigService, repository: Repository<TEntity>) {
    super();
    this.repository = repository;
  }

  async create(data: DeepPartial<TCreate>): Promise<TEntity> {
    const entity = this.repository.create(data as DeepPartial<TEntity>);
    return this.repository.save(entity);
  }

  async getAll(): Promise<TEntity[]> {
    return this.repository.find();
  }

  async getById(id: string): Promise<TEntity | null> {
    return (
      this.repository.findOne({
        where: { id } as unknown as FindOptionsWhere<TEntity>,
      }) || null
    );
  }

  async update(
    id: string,
    updateData: Partial<TCreate>,
  ): Promise<TEntity | null> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<TEntity>,
    });
    if (!entity) {
      return null;
    }
    Object.assign(entity, updateData);

    return this.repository.save(entity);
  }

  async delete(id: string): Promise<boolean> {
    const result: DeleteResult = await this.repository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
}
