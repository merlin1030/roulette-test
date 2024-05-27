import { ResponseWithCookie } from '../interfaces/ResponseWithCookie';
import { User, IUser } from '../models/User';

export async function createUser() {
  const user = new User({ credits: 0, lastVisit: new Date() });
  await user.save();
  return user;
}

export const findOrCreateUser = async (userId: string, res: ResponseWithCookie) => {
  let user = userId ? await User.findById(userId) : null;
  if (!user) {
    user = await createUser();
    if (user && user._id) {
      res.cookie('userId', user._id.toString());
    }
  }
  return user;
}

export const getUserById = async (userId: string) => {
  return await User.findById(userId);
}

export const findAndUpdateUser = async (user: IUser, update: Partial<IUser>) => {
  return await User.findByIdAndUpdate(user._id, update, { new: true });
}
