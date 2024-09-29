import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogerIpMiddlewareModule implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // Test
    console.log(`Client IP: ${req.ip}`);
    next();
  }
}
