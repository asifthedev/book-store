/*This file is for database seeding, it will insert demo data inside our database.*/

import connectDB from "./connection.js";
import bookModel from "../models/book.model.js";
import type { Book } from "../models/book.schemas.js";

const seedBooks: Book[] = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
  },
  {
    title: "Peer-e-Kamil",
    author: "Umera Ahmed",
    price: 450,
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 350,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 400,
  },
  {
    title: "Jannat Kay Pattay",
    author: "Nimra Ahmed",
    price: 500,
  },
  {
    title: "Free Programming Guide",
    author: "Open Source Community",
    price: null, // Free book
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    price: 550,
  },
  {
    title: "Aangan",
    author: "Khadija Mastoor",
    price: 300,
  },
];

async function dbSeeder() {
  try {
    await bookModel.insertMany(seedBooks);
  } catch (error: any) {
    console.error(`[MongoDB] Error: ${error.message}`);
  }
}

// await connectDB();
// await dbSeeder();

const docs = await bookModel.find({});
console.log(docs);
