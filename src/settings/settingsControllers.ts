import { Response } from "express";
import { AuthenticatedRequest } from "../core/types";
import { defaultUserSettings } from "./defaultSettings";
import { addDefaultSettingsToUser } from "./settingsService";

export const getUserSettings = (req: AuthenticatedRequest, res: Response) => {}

export const changeUserSettings = (req: AuthenticatedRequest, res: Response) => {}

export const getNotificationSettings = (req: AuthenticatedRequest, res: Response) => {}

export const changeNotificationSettings = (req: AuthenticatedRequest, res: Response) => {}

export const createNewUserSettings = async (userID: string) => {
  try {
    await addDefaultSettingsToUser(userID);
  } catch (e) {
    const err = e as Error;
    console.error(err);
  }
}