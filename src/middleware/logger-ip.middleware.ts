import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerIpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'] || 'Unknown Device';
    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      'Unknown IP';
    console.log(`Request made from device: ${userAgent}, IP: ${ip}`);
    next();
  }
}
