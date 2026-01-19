import { Schema, model } from "mongoose";
import type { BookDocument } from "./book.schemas.js";

const bookSchema = new Schema<BookDocument>(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 200,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      minLength: 2,
      maxLength: 200,
      required: true,
      trim: true,
    },
    price: { type: Number, default: null }, //  If free -> It's null
  },
  { timestamps: true },
);

const bookModel = model<BookDocument>("Book", bookSchema);

export default bookModel;
