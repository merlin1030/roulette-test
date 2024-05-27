import { User } from '../models/User';
import { Response } from 'express';

export async function getLastVisitFromUser(userId: string): Promise<Date | null> {
  const user = await User.findById(userId);
  return user?.lastVisit || null;
}

export async function getCreditsFromUser(userId: string): Promise<number> {
  const user = await User.findById(userId);
  return user?.credits || 0;
}

export async function addCreditToUserIfNecessary(userId: string): Promise<number> {
  const now = new Date();
  const lastVisit = await getLastVisitFromUser(userId);
  const diffInMinutes = lastVisit ? (now.getTime() - lastVisit.getTime()) / (1000 * 60) : Infinity;

  if (diffInMinutes >= 1) {
    const user = await User.findById(userId);
    if (user) {
      user.credits = (user.credits || 0) + 1;
      user.lastVisit = now;
      await user.save();
      return user.credits;
    }
  }

  return await getCreditsFromUser(userId);
}

export async function updateUserCreditsAndLastVisitCookies(res: Response, userId: string) {
  const credits = await addCreditToUserIfNecessary(userId);
  const lastVisit = await getLastVisitFromUser(userId);
  const lastVisitFormatted = lastVisit ? lastVisit.toLocaleString() : 'Nunca';
  res.cookie('credits', credits);
  res.cookie('lastVisit', lastVisitFormatted);
}