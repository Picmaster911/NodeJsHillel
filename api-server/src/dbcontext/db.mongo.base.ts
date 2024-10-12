import mongoose, { Model, Mongoose } from 'mongoose';
import { AbstractRepository } from './db.abstract.base';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModelsMapEnum } from './types/mongo.model.map.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserModel } from './models/user.model';

@Injectable()
export class MongoRepository extends AbstractRepository {
  private readonly logger = new Logger(MongoRepository.name);
  private mongoUri: string;
  private client: Mongoose;

  constructor(configService: ConfigService) {
    super();
    this.mongoUri = configService.get<string>('MONGO_CONNECTION_STRING');
  }

  async connect(): Promise<void> {
    this.logger.log(this.mongoUri);
    this.client = await mongoose.connect(this.mongoUri);
    this.logger.log('Connected to MongoDB');
  }

  async create(table: MongooseModelsMapEnum, data: CreateUserDto) {
    const model = this.getModel(table);
    return new (await model)(data);
  }

  async getAll(table: MongooseModelsMapEnum): Promise<any[]> {
    const model = this.getModel(table);
    return (await model).find().exec();
  }

  async getById(table: MongooseModelsMapEnum, id: string): Promise<any> {
    const model = this.getModel(table);
    return (await model).findById(id).exec();
  }

  async update(
    table: MongooseModelsMapEnum,
    id: string,
    item: any,
  ): Promise<any | null> {
    const model = this.getModel(table);
    const updatedItem = await (await model)
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
    return updatedItem ? updatedItem : null;
  }

  async delete(table: MongooseModelsMapEnum, id: string): Promise<boolean> {
    const model = this.getModel(table);
    const result = await (await model).findByIdAndDelete(id).exec();
    return !!result;
  }

  private async getModel(table: MongooseModelsMapEnum): Promise<Model<any>> {
    await this.connect();
    switch (table) {
      case MongooseModelsMapEnum.USER:
        return UserModel;

      default:
        throw new Error('Unknown table');
    }
  }
}
