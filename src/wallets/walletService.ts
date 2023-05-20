import { UserModel } from "../db/models"
import { ErrorResponse } from "../net"
import { Wallet } from "./models";
import { defaultWallets } from "./utils";

export const createDefaultWalletsForUser = async (userID: any) => {
  for (const wallet of defaultWallets) {
    await createSingleWalletForUser(wallet, userID);
  }
}

export const createSingleWalletForUser = async (wallet: Wallet, userID: string) => {
  try {
    const existingUser = await UserModel.findOne({ id: userID }).exec();
    existingUser.wallets.push({ ...wallet, ownerId: userID })
    await existingUser.save()
  } catch (e) {
    const err = e as Error
    return ErrorResponse.from(err.message);
  }
}