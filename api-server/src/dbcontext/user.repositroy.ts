// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { MongoRepository } from './db.mongo.base';
// import { User, UserDocument } from 'src/users/schemas/user.schema';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

// @Injectable()
// export class UsersRepository extends MongoRepository<UserDocument> {
//   constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
//     super(userModel);
//   }
//   async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
//     const newUser = this.createDocument({
//       username: createUserDto.username,
//       email: createUserDto.email,
//       password: createUserDto.password,
//       age: createUserDto.age,
//     });

//     return this.create(newUser);
//   }
// }
