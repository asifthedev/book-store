import type { ApiSuccessResponse, ApiErrorResponse } from "../models/types.js";
import BookResponseDTO from "../dtos/book.dto.js";
import type { Request, Response } from "express";
import bookModel from "../models/book.model.js";
import mongoose from "mongoose";
import type { Book, BookDocument } from "../models/book.schemas.js";
// Method: GET, Path: /api/v1/books
export async function getAllBooks(
  req: Request,
  res: Response<Partial<ApiSuccessResponse> | ApiErrorResponse>,
) {
  try {
    // Fetching books from database
    const books = await bookModel.find();

    // If there's no book in books collection in database
    if (books.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: [], message: "No book found." });
    }

    // Convert to DTO (hiding unnecessary details and standardization)
    const booksDTO = await BookResponseDTO.fromArray(books);

    return res.status(200).json({ success: true, data: booksDTO });
  } catch (error: any) {
    console.error("[getAllBooks] Error:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

// GET: /api/book/:id
export async function getBookById(
  req: Request<{ id: string }>,
  res: Response<Partial<ApiSuccessResponse> | ApiErrorResponse>,
) {
  const id = req.params.id;

  try {
    // If book id is not in a valid MongoDB book id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid book ID format: ${id}`,
      });
    }

    // Id format is valid, searching for book in database
    const bookDoc = await bookModel.findById(id);

    // If no book found in the database against passed id
    if (!bookDoc) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    // Convert to DTO (hiding unnecessary details and standardization)
    const bookDTO = await BookResponseDTO.fromDocument(bookDoc);

    return res.status(200).json({
      success: true,
      data: bookDTO,
    });
  } catch (error: any) {
    console.error("[getBookById] Error:", {
      id,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

// POST: /books
export async function addNewBook(
  req: Request<{}, {}, Book>,
  res: Response<ApiSuccessResponse | ApiErrorResponse>,
) {
  try {
    // Creating book document
    const newBook: BookDocument = new bookModel(req.body);

    // Saving book into database
    const saveBookDoc: BookDocument = await newBook.save();

    // Convert to DTO (hiding unnecessary details and standardization)
    const bookDTO = await BookResponseDTO.fromDocument(saveBookDoc);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: bookDTO,
    });
  } catch (error: any) {
    console.error("[addNewBook] Error:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

// DELETE: /books/:id
export function deleteBookById(
  req: Request<{ id: string }>,
  res: Response<ApiSuccessResponse | ApiErrorResponse>,
) {
  const id = Number(req.params.id);
  const bookDocIndex: number = books.findIndex((book) => book.id === id);
  if (bookDocIndex === -1) {
    return res.status(404).json({ message: "Not Found!" });
  }
  books.splice(bookDocIndex, 1);
  res.status(200).json({});
}
