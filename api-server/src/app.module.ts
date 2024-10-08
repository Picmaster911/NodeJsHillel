import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataModule } from './data/data.module';
import { LogerIpMiddlewareModule } from './loger-ip-middleware/loger-ip-middleware.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Global visible
      envFilePath: '.env', // Path to file
    }),
    UsersModule,
    DataModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogerIpMiddlewareModule).forRoutes('*');
  }
}
