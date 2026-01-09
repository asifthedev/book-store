import type { Response, Request, NextFunction } from "express";

// Logs every request
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method}: ${req.path}`);
  next();
}
