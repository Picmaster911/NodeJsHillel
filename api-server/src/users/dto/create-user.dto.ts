import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { ICreateUserInput } from '../interfaces/create-user-input.interface';

export class CreateUserDto implements ICreateUserInput {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;
  password: string;

  @IsInt()
  age: number;
}
