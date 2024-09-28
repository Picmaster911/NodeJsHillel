import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class CreateUserDto implements IUser {
  @IsInt()
  id: number;

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
