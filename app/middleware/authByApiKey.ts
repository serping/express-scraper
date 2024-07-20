import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const authByApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiTokenHeader = req.headers['x-api-key'] as string;
  const apiToken = process.env.SECRET_API_KEY!;

  if (!apiTokenHeader) {
    return res.status(403).json({ error: "Unauthorized", message: 'Missing x-api-key' });
  }
  if (apiTokenHeader !== apiToken) {
    return res.status(403).json({ error: "Unauthorized", message: 'x-api-key not match' });
  }
  delete req.headers['x-api-key'];
  next();
};