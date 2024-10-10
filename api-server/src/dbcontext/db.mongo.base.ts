import mongoose, {
  HydratedDocument,
  Model,
  Mongoose,
  UpdateQuery,
} from 'mongoose';
import { AbstractRepository } from './db.abstract.base';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoRepository<
  TCreate,
  TEntity extends HydratedDocument<any>,
> extends AbstractRepository<TCreate, TEntity> {
  private readonly model: Model<TEntity>;
  private mongoUri: string;
  private client: Mongoose;
  private readonly logger = new Logger(MongoRepository.name);

  constructor(configService: ConfigService, model: Model<TEntity>) {
    super();
    this.model = model;
    this.mongoUri = configService.get<string>('MONGO_CONNECTION_STRING');
  }

  async connect(): Promise<void> {
    this.client = await mongoose.connect(this.mongoUri);
    this.logger.log('Connected to MongoDB');
  }
  createDocument(data: Partial<TCreate>): TEntity {
    return new this.model(data);
  }
  async create(item: Partial<TCreate>): Promise<TEntity> {
    const createdItem = new this.model(item);
    return createdItem.save();
  }
  async getAll(): Promise<TEntity[]> {
    return this.model.find().exec();
  }

  async getById(id: string): Promise<TEntity> {
    return this.model.findById(id).exec();
  }

  async update(id: string, item: Partial<TCreate>): Promise<TEntity | null> {
    const updateQuery: UpdateQuery<TEntity> = {
      $set: item as unknown as Partial<TEntity>,
    } as UpdateQuery<TEntity>;
    const updatedItem = await this.model
      .findByIdAndUpdate(id, updateQuery, { new: true })
      .exec();
    return updatedItem ? (updatedItem as unknown as TEntity) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
