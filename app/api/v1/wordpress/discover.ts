import { Request, Response } from 'express';

export const wordpressDiscover = async (req: Request, res: Response) => {
  const startTime = Date.now();

  try {
    const endTime = Date.now();
    const executionTime = ((endTime - startTime) / 1000).toFixed(6);
    res.setHeader('x-express-runtime', executionTime);

    return res.status(200).json({ data: "ok" });
  } catch (error: any) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: error });
  }
}