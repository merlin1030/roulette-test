import { Request, Response } from 'express';
import { findOrCreateUser } from '../services/userService';
import { getRoulettes } from '../services/rouletteService';

export const show = async (req: Request, res: Response) => {
  try {
    const userId = req.cookies.userId;
    const user = await findOrCreateUser(userId, res);
    if (user && user._id) {
      const { _id, credits, lastVisit, prizes } = user;
      const message = `¡Hola, Player: ${_id}!`;
      const lastVisitString = lastVisit ? lastVisit.toLocaleString() : 'Never';
      const actualDate = new Date().toLocaleString();
      const roulettes = await getRoulettes();
      res.render('index', { message, credits, lastVisit: lastVisitString, actualDate, prizes, roulettes });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

