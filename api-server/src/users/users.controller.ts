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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('DatabaseService')
    private readonly databaseService: AbstractRepository,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): IUser {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The users has been successfully read.',
    type: [CreateUserDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('getall')
  async getAll(): Promise<any[]> {
    const newUser = await this.databaseService.getAll(
      MongooseModelsMapEnum.USER,
    );
    console.log(newUser);
    return newUser;
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully found .',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updatet .',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully Delete .',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Add user to database' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully add to database .',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('dbadd')
  async createDb(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.databaseService.create(
      MongooseModelsMapEnum.USER,
      createUserDto as UserDocument,
    );
  }
}
