import { Request, Response } from 'express';
import { createRoulette, deleteRoulette, getRoulettes, playRoulette } from '../services/rouletteService';
import { getUserById } from '../services/userService';
import { IUser } from '../models/User';
import { Roulette } from '../models/Roulette';



export const show = async (req: Request, res: Response) => {
  try {
    const { userId } = req.cookies;
    const user = await getUserById(userId) as IUser;
    const roulettes = await getRoulettes();
    res.render('roulette', { user, roulettes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'internal server error' });
    }
  }
}

export const spin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.cookies;
    const { rouletteId } = req.body;
    const user = await getUserById(userId) as IUser;
    if (!user) {
      throw new Error('user not found');
    }
    const prize = await playRoulette(user, rouletteId);
    res.status(200).json({ prize: prize });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'internal server error' });
    }
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { name, cost, prizes } = req.body;
    const roulette = new Roulette({ name, cost, prizes });
    await createRoulette(roulette);
    res.status(201).json({ roulette });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'internal server error' });
    }
  }
}

export const detele = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const roulette = await deleteRoulette(id);
    if (!roulette) {
      res.status(404).json({ message: 'Roulette not found' });
    } else {
      res.status(204).json({ message: 'Roulette deleted successfully' });
    }
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'internal server error' });
    }
  }
}


