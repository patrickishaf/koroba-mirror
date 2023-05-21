import { UserModel } from '../db/models'
import { Wallet } from './models';
import { defaultWallets } from './utils';

export const createDefaultWalletsForUser = async (userID: any) => {
  let wallets = [];
  for (const wallet of defaultWallets) {
    const userWallets = await createSingleWalletForUser(wallet, userID);
    wallets = userWallets;
  }
  return wallets;
}

export const createSingleWalletForUser = async (wallet: Wallet, userID: string) => {
  try {
    const existingUser = await UserModel.findOne({ id: userID }).exec();
    existingUser.wallets.push({ ...wallet, ownerId: userID });
    await existingUser.save();
    return existingUser.wallets;
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}