import { JwtPayload } from '../auth/jwt-payload.interface';

declare module 'express' {
  interface Request {
    user?: JwtPayload; // Добавляем поле user к Request
  }
}
