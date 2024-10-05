import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class DataService {
  private users: IUser[] = [
    {
      id: 1,
      username: 'test',
      email: 'user1@example.com',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$Q4nuVozjkR6a5BASX4DPZw$1B+r05J2puNdr3L7B50ivRM56ml8STYN8Tt+wVBoPsQ', //qwerty
      age: 25,
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@example.com',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$+4d7l3rCTd0bw0qi9jcKlw$GaqKd91kakFc6CzNMEgA5skJf88rmPkQGxW8xNqD2v8', //123456
      age: 30,
    },
    {
      id: 3,
      username: 'user3',
      email: 'user3@example.com',
      password: 'das',
      age: 22,
    },
    {
      id: 4,
      username: 'user4',
      email: 'user4@example.com',
      password: 'das',
      age: 28,
    },
    {
      id: 5,
      username: 'user5',
      email: 'user5@example.com',
      password: 'das',
      age: 35,
    },
    {
      id: 6,
      username: 'user6',
      email: 'user6@example.com',
      password: 'das',
      age: 27,
    },
    {
      id: 7,
      username: 'user7',
      email: 'user7@example.com',
      password: 'das',
      age: 24,
    },
    {
      id: 8,
      username: 'user8',
      email: 'user8@example.com',
      password: 'das',
      age: 31,
    },
    {
      id: 9,
      username: 'user9',
      email: 'user9@example.com',
      password: 'das',
      age: 29,
    },
    {
      id: 10,
      username: 'user10',
      email: 'user10@example.com',
      password: 'das',
      age: 26,
    },
  ];

  getAllUsers(): IUser[] {
    return this.users;
  }
}
