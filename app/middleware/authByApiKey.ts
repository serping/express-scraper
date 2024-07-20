import { NextFunction, Request, Response } from 'express';

export const authByApiKey = (req: Request, res: Response, next: NextFunction) => {
  let { token } = req.query as { token: string };
  const apiTokenHeader = req.headers['x-api-key'] as string;
  const apiToken = process.env.SECRET_API_KEY!;

  if (!token) {
    token = apiTokenHeader;
  }

  if (!token) {
    return res.status(403).json({ error: "Unauthorized", message: 'Missing x-api-key' });
  }
  if (apiToken !== token) {
    return res.status(403).json({ error: "Unauthorized", message: 'x-api-key not match' });
  }
  delete req.headers['x-api-key'];
  next();
};