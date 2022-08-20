import { Request, Response, NextFunction } from 'express';

export function LocalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if (process.env.LOCAL_AUTH_TOKEN) {
    if (!req.headers.authorization) {
      req.headers.authorization = `Bearer ${process.env.LOCAL_AUTH_TOKEN}`;
    }
  }
  next();
}
