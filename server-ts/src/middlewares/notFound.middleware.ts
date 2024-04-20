import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  return res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};
