import { IUser } from "../interfaces/user.interface";
export declare class CreateUserDto implements IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    age: number;
}
