import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import { logger, validateBody } from "./middlewares/book.middleware.js";
import connectDB from "./database/connection.js";
import {
  getAllBooks,
  getBookById,
  addNewBook,
  // deleteBookById,
} from "./controllers/books.controllers.js";
import type { ApiErrorResponse } from "./models/types.js";
import type { Book } from "./models/book.schemas.js";
import { bookSchema } from "./models/book.schemas.js";
await connectDB();
const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(logger);

app.get("/", (_req: Request, res: Response<string>) => {
  res.send("Wellcome!");
});

app.get("/api/v1/books", getAllBooks);

app.get("/api/v1/books/:id", getBookById);

app.post("/api/v1/books", validateBody<Book>(bookSchema), addNewBook);

// app.delete("/books/:id", deleteBookById);

app.use(
  (
    err: Error,
    req: Request,
    res: Response<ApiErrorResponse>,
    next: NextFunction,
  ) => {
    console.log(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  },
);

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`);
});
