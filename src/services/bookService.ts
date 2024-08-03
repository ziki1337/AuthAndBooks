import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBooks = async () => {
  return prisma.book.findMany();
};

export const getBookById = async (id: number) => {
  return prisma.book.findUnique({
    where: {
      id: id, 
    },
  });
};

export const createBook = async (data: { title: string; author: string; publicationDate: Date; genres: string[] }) => {
  return prisma.book.create({
    data,
  });
};

export const updateBook = async (id: number, data: { title?: string; author?: string; publicationDate?: string; genres?: string[] }) => {
  return prisma.book.update({
    where: {
      id: id,
    },
    data: {
      ...data,
      ...(data.publicationDate && { publicationDate: new Date(data.publicationDate) }), // Строка в дату
    },
  });
};

export const deleteBook = async (id: number) => {
  return prisma.book.delete({
    where: {
      id: id, 
    },
  });
};