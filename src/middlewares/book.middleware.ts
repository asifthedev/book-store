import type { Response, Request, NextFunction } from "express";
import { z, ZodError } from "zod";
import type { ZodSchema } from "zod";
import type { ApiErrorResponse } from "../models/types.js";
import mongoose from "mongoose";

// Logs every request
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method}: ${req.path}`);
  next();
}

export function validateBody<T>(schema: ZodSchema<T>) {
  return async (
    req: Request<{}, {}, T>,
    res: Response<ApiErrorResponse>,
    next: NextFunction,
  ) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => {
          return { field: issue.path.join(""), message: issue.message };
        });

        res.status(400).json({
          success: false,
          message: "Validation faild",
          errors,
        });

        return;
      }
      next(error);
    }
  };
}

export async function idValidator(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id;

  // If book id is not in a valid MongoDB book id format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid book ID format: ${id}`,
    });
  }

  next();
}
