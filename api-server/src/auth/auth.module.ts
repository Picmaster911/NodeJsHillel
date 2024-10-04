import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { UsersService } from 'src/users/users.service';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { DataService } from 'src/data/data.service';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UsersService,
    DataService,
  ],
})
export class AuthModule {}
