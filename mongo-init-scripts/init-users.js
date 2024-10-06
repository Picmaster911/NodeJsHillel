db = db.getSiblingDB('app-base');

db.createCollection('users');

db.users.insertMany([
    {
        id: 1,
        username: 'test',
        email: 'user1@example.com',
        password: '1234',
        age: 25,
      },
      {
        id: 2,
        username: 'user2',
        email: 'user2@example.com',
        password: 'das',
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
]);

db.createUser({
  user: "root",  // Имя пользователя
  pwd: "password",    // Пароль пользователя
  roles: [
    {
      role: "readWrite",   // Права на чтение и запись
      db: "app-base"       // Название базы данных
    }
  ]
});

print('Database initialized with 10 users.');