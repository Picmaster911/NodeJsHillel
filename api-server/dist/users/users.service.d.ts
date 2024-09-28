import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataService } from '../data/data.service';
import { IUser } from './interfaces/user.interface';
export declare class UsersService {
    private readonly dataService;
    constructor(dataService: DataService);
    create(createUserDto: CreateUserDto): IUser;
    findAll(): CreateUserDto[];
    findOne(id: number): CreateUserDto;
    update(id: number, updateUserDto: UpdateUserDto): CreateUserDto;
    remove(id: number): string;
}
