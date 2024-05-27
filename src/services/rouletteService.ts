import { IUser } from '../models/User';
import { Prize } from '../interfaces/Prize';
import { Roulette, IRoulette } from '../models/Roulette';
import { findAndUpdateUser } from './userService';

export const playRoulette = async (user: IUser, rouletteId: string) => {
  const roulette: IRoulette | null = await getRouletteById(rouletteId);
  if (!roulette) {
    throw new Error(`Unknowed roulette : ${rouletteId}`);
  }
  if (user.credits < roulette.cost) {
    throw new Error('Not enough credits to play this roulette');
  }
  try {
    const newUserCreditsBalance = user.credits -= roulette.cost;
    const prize = determinePrize(roulette.prizes);
    findAndUpdateUser(user, { credits: newUserCreditsBalance, prizes: [...user.prizes, prize] });
    return prize;
  } catch (error) {
    console.error(error);
    throw new Error('internal server error');
  }
}

const determinePrize = (prizes: Prize[]) => {
  const rand = Math.random();
  let cumulativeProbability = 0;
  for (const prize of prizes) {
    cumulativeProbability += Number(prize.probability);
    if (rand < cumulativeProbability) {
      return prize.name;
    }
  }
  return "Sorry, no prize for u";  // Esto no debería suceder si las probabilidades de los premios suman 1
}

export const getRoulettes = async () => {
  return await Roulette.find();
}

export const getRouletteById = async (rouletteId: string) => {
  return await Roulette.findById(rouletteId);
}

export const createRoulette = async (roulette: IRoulette) => {
  return await new Roulette(roulette).save();
}

export const deleteRoulette = async (rouletteId: string) => {
  return await Roulette.findByIdAndDelete(rouletteId);
}