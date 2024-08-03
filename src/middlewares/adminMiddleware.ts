import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';

interface CustomRequest extends Request {
  user?: User;
}

const adminMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 2) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

export default adminMiddleware;