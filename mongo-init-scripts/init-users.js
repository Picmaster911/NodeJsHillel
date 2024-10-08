db = db.getSiblingDB('app-base');

db.createCollection('users');

db.users.insertMany([
    {
        username: 'test',
        email: 'user1@example.com',
        password: '1234',
        age: 25,
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'das',
        age: 30,
      },
      {
        username: 'user3',
        email: 'user3@example.com',
        password: 'das',
        age: 22,
      },
      {
        username: 'user4',
        email: 'user4@example.com',
        password: 'das',
        age: 28,
      },
      {
        username: 'user5',
        email: 'user5@example.com',
        password: 'das',
        age: 35,
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