import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataService } from '../data/data.service';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly dataService: DataService) {}
  create(createUserDto: CreateUserDto): IUser {
    const allUser = this.dataService.getAllUsers();
    allUser.push(createUserDto);
    return createUserDto;
  }

  findAll(): CreateUserDto[] {
    return this.dataService.getAllUsers();
  }

  findOne(id: number): CreateUserDto {
    return this.dataService.getAllUsers().find((user) => user.id == id);
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
}
