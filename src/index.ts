import express from "express";
import type { Express, Request, Response } from "express";
import { logger } from "./middlewars/middlewars.js";
import {
  getBooks,
  getBookById,
  addNewBook,
  deleteBookById,
} from "./controllers/books.controllers.js";

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(logger);

app.get("/", (_req: Request, res: Response<string>) => {
  res.send("Wellcome!");
});

app.get("/books", getBooks);

app.get("/books/:id", getBookById);

app.post("/books", addNewBook);

app.delete("/books/:id", deleteBookById);

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`);
});
