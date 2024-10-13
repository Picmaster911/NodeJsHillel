import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataModule } from './data/data.module';
import { LogerIpMiddlewareModule } from './loger-ip-middleware/loger-ip-middleware.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Global visible
      envFilePath: '.env',
    }),
    UsersModule,
    DataModule,
    AuthModule,
    UploadFileModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogerIpMiddlewareModule).forRoutes('*');
  }
}
