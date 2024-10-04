import { Request } from 'express';

export interface IExpReq extends Request {
  user: { sub: number; refreshToken?: string };
}
