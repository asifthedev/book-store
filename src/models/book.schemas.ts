import { z } from "zod";
import type { Document } from "mongoose";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(2, "Author name must be at least 2 characters"),
  price: z.number().positive("Price must be greater than 0").nullable(),
});
export type Book = z.infer<typeof bookSchema>;

export interface BookDocument extends Book, Document {
  // Now, there we'll automatically have _id, __v, createdAt, updatedAt
}
