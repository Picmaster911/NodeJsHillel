import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogerIpMiddlewareModule } from './loger-ip-middleware/loger-ip-middleware.module';
import { UsersModule } from './users/users.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [UsersModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LogerIpMiddlewareModule)
    //   .forRoutes('*')
  }
}
