import { Request, Response, NextFunction } from 'express';
import { updateUserCreditsAndLastVisitCookies } from '../utils/utils';

export const checkCreditsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.cookies.userId;
  if (userId) {
    await updateUserCreditsAndLastVisitCookies(res, userId);
  }
  next();
};