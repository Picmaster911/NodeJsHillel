import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IRegisterUser } from './interfaces/registerUser.interfaces';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ISignUpUserResponse } from './interfaces/registerUser-respone.interface';
import { ISignInUserInput } from './interfaces/sign-in-user.interface';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerUser: IRegisterUser): Promise<ISignUpUserResponse> {
    const { username, email, password, age } = registerUser;
    this.logger.log(`Going to sign up new user with email: ${username}`);
    const user = this.userService.findByName(username);

    if (user) {
      throw new BadRequestException(
        `User with firstName: ${username} already exists`,
      );
    }

    const hash = await this.hashData(password);
    const newUser = this.userService.create({
      username,
      password: hash,
      email,
      age,
    });

    const tokens = await this.getTokens(newUser.id, username);
    const test = await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    this.logger.log(
      `User with firstName: ${test.refreshToken} successfully updateRefreshToken up`,
    );
    this.logger.log(`User with firstName: ${username} successfully signed up`);
    return tokens;
  }

  async login(iSignInUserInput: ISignInUserInput) {
    const { username, password } = iSignInUserInput;
    const needUser = this.userService.findByName(username);
    if (!needUser) throw new BadRequestException('User name not found');
    const passwordMatches = await argon2.verify(needUser.password, password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(needUser.id, username);
    await this.updateRefreshToken(needUser.id, tokens.refreshToken);
    return tokens;
  }
  hashData(data: string) {
    return argon2.hash(data);
  }

  async logout(userId: number) {
    return this.userService.findOneAndUpdate(userId, { refreshToken: null });
  }

  async getTokens(userId: number, userName: string) {
    this.logger.log(
      `Going to generate tokens for user with email: ${userName}`,
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          userName,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_SECRET_EXPIRE'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          userName,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_SECRET_EXPIRE',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    return this.userService.findOneAndUpdate(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    this.logger.log(`Going to generate tokens for user with id: ${userId}`);

    const user = this.userService.findOne(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
