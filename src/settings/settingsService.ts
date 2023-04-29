import { UserModel } from "../db/models";
import { defaultUserSettings } from "./defaultSettings";

export const addDefaultSettingsToUser = async (userID: string) => {
  try {
    const existingUser = await UserModel.findOneAndUpdate({ id: userID }, { settings: defaultUserSettings });
    return existingUser;
  } catch (e) {
    const err = e as Error;
    throw err;
  }
}
