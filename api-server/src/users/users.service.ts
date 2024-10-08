import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataService } from '../data/data.service';
import { IUser } from './interfaces/user.interface';
import { IUpdateUserPartialInput } from './interfaces/update-user-partial-input.interface';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataService: DataService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  create(createUserDto: CreateUserDto): IUser {
    const allUser = this.dataService.getAllUsers();
    const newUser = { id: allUser.length + 1, ...createUserDto };
    allUser.push(newUser);
    return newUser;
  }

  findOneAndUpdate(id: number, updateBody: IUpdateUserPartialInput): IUser {
    const user = this.findOne(id);
    console.log(user);
    return this.updatePartially(user.id, updateBody);
  }

  findAll(): IUser[] {
    return this.dataService.getAllUsers();
  }

  findOne(id: number): IUser {
    return this.dataService.getAllUsers().find((user) => user.id == id);
  }

  findByName(userName: string): IUser {
    return this.dataService
      .getAllUsers()
      .find((user) => user.username == userName);
  }
  update(id: number, updateUserDto: UpdateUserDto): CreateUserDto {
    const needUser = this.dataService
      .getAllUsers()
      .find((user) => user.id == id);
    for (const key in updateUserDto) {
      needUser[key] = updateUserDto[key];
    }
    return needUser;
  }

  remove(id: number) {
    const needUserForDelete = this.dataService
      .getAllUsers()
      .find((user) => user.id == id);
    let allColection = this.dataService.getAllUsers();
    allColection = allColection.filter(function (item) {
      return item !== needUserForDelete;
    });
    console.log(allColection);
    return `This action removes a #${id} user`;
  }

  updatePartially(id: number, dto: IUpdateUserPartialInput): IUser {
    const collectionUser = this.dataService.getAllUsers();
    const userIndex = collectionUser.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (dto.hasOwnProperty('id')) {
      throw new UnprocessableEntityException(
        'Updating the "id" field is not allowed',
      );
    }

    const updatedUser = { ...collectionUser[userIndex], ...dto };
    collectionUser[userIndex] = updatedUser;
    return updatedUser;
  }

  async createDb(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }
}
