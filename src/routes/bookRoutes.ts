import express from 'express';
import { addBook, getBook, getBookById, updateBook, deleteBook, listBooks, editBook, removeBook } from '../controllers/bookController';
import authMiddleware from '../middlewares/authMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';

const router = express.Router();

router.post('/books', authMiddleware, adminMiddleware, addBook);
router.get('/books', listBooks);
router.get('/books/:id', getBook);
router.put('/books/:id', authMiddleware, adminMiddleware, editBook);
router.delete('/books/:id', authMiddleware, adminMiddleware, removeBook);

export default router;