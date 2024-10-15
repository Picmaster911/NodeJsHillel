import { IsInt, IsString } from 'class-validator';
import { IRegisterUser } from '../interfaces/registerUser.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInputDto implements IRegisterUser {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'sample@gmail.com',
    description: 'The email of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '34',
    description: 'The age of the user',
  })
  @IsInt()
  age: number;
}
