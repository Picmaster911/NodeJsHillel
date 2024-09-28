import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): IUser;
    findAll(): IUser[];
    findOne(id: string): IUser;
    update(id: string, updateUserDto: UpdateUserDto): CreateUserDto;
    remove(id: string): string;
}
