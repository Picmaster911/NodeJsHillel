import { IsString, IsNotEmpty } from 'class-validator';

export class ISignInUserInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
