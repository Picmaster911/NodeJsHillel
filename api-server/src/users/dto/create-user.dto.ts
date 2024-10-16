import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { ICreateUserInput } from '../interfaces/create-user-input.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements ICreateUserInput {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    example: 'sample@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;

  @ApiProperty({
    example: '34',
    description: 'The age of the user',
  })
  @IsInt()
  age: number;
}
