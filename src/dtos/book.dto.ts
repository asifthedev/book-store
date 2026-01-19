import type { BookDocument } from "../models/book.schemas.js";

class BookResponseDTO {
  id: string;
  title: string;
  author: string;
  price: number | null;

  constructor(obj: BookDocument) {
    this.id = obj._id.toString();
    this.title = obj.title;
    this.author = obj.author;
    this.price = obj.price;
  }

  static async fromArray(docs: BookDocument[]): Promise<BookResponseDTO[]> {
    return docs.map((doc) => new BookResponseDTO(doc));
  }

  static async fromDocument(doc: BookDocument): Promise<BookResponseDTO> {
    return new BookResponseDTO(doc);
  }
}

export default BookResponseDTO;
