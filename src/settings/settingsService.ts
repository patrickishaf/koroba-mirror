import { UserModel } from "../db/models";
import { DefaultUserSettings, UserSettings } from "./models";

export const addSettingsToUser = async (settings: DefaultUserSettings | UserSettings, user: any) => {
  try {
    const existingUser = await UserModel.findOneAndUpdate({ email: user.email }, { settings });
    return existingUser;
  } catch (e) {
    const err = e as Error;
    throw err;
  }
}