import { IsInt, IsString } from 'class-validator';
import { IRegisterUser } from '../interfaces/registerUser.interfaces';

export class CreateUserInputDto implements IRegisterUser {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  age: number;
}
