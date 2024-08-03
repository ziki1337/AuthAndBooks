import { Request, Response } from 'express';
import { getBookById, updateBook, deleteBook, getAllBooks } from '../services/bookService';
import prisma from '../prisma/client';

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publicationDate, genres } = req.body;
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publicationDate: new Date(publicationDate),
        genres,
      },
    });
    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listBooks = async (_req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);  // Преобразование id из строки в число
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const editBook = async (req: Request, res: Response) => {
  try {
    const book = await updateBook(Number(req.params.id), req.body);
    res.status(200).json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
};

export const removeBook = async (req: Request, res: Response) => {
  try {
    await deleteBook(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
};

export { getBookById, updateBook, deleteBook };
