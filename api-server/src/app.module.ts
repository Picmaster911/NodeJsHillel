import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogerIpMiddlewareModule } from './loger-ip-middleware/loger-ip-middleware.module';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogerIpMiddlewareModule)
      .forRoutes('*')
  }
}
