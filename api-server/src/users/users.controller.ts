import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { User, UserDocument } from './schemas/user.schema';
import { AbstractRepository } from 'src/dbcontext/db.abstract.base';
import { MongooseModelsMapEnum } from 'src/dbcontext/types/mongo.model.map.enum';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('DatabaseService')
    private readonly databaseService: AbstractRepository,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): IUser {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): IUser[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Post('dbadd')
  async createDb(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.databaseService.create(
      MongooseModelsMapEnum.USER,
      createUserDto as UserDocument,
    );
  }
  @Post('dbAll')
  async getAll(): Promise<any[]> {
    const newUser = this.databaseService.getAll(MongooseModelsMapEnum.USER);
    return newUser;
  }
}
