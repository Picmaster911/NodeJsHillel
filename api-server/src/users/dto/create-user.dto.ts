import { IsInt, IsString, IsOptional, MinLength, MaxLength, IsEmail } from 'class-validator';
import { IUser } from "../interfaces/user.interface";
import { Transform } from 'class-transformer';

export class CreateUserDto implements IUser {
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    id: number;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsEmail()
    email: string;
    password: string;

    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    age: number;
}
