import type { Book, ResponseError } from "../models/types.js";
import { books } from "../models/data.js";
import type { Request, Response } from "express";

// GET: /books
export function getBooks(req: Request, res: Response<Book[]>) {
  res.json(books);
}

// GET: /book/:id
export function getBookById(
  req: Request<{ id: string }>,
  res: Response<Book | ResponseError>
) {
  const id = Number(req.params.id);
  const filteredBook = books.find((book) => book.id === id);
  if (!filteredBook) {
    return res.status(404).json({ message: "Not Found!" });
  }
  return res.json(filteredBook);
}

// POST: /books
export function addNewBook(req: Request<{}, {}, Book>, res: Response<Book>) {
  const newBook: Book = { ...req.body, id: books.length + 1 };
  books.push(newBook);
  res.json(newBook);
}

// DELETE: /books/:id
export function deleteBookById(
  req: Request<{ id: string }>,
  res: Response<ResponseError | {}>
) {
  const id = Number(req.params.id);
  const filteredBookIndex: number = books.findIndex((book) => book.id === id);
  if (filteredBookIndex === -1) {
    return res.status(404).json({ message: "Not Found!" });
  }
  books.splice(filteredBookIndex, 1);
  res.status(200).json({});
}
