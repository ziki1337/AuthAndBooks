import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser, changeUserRole } from '../services/userService';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: User;
}

// Регистрация пользователя
export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
};

// Аутентификация пользователя
export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
};

// Получение информации о текущем пользователе
export const me = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    res.status(200).json(req.user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
};

// Изменение роли пользователя
export const updateRole = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 1) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    const { role } = req.body;
    const user = await changeUserRole(Number(id), role);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
};