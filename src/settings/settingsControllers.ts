import { Response } from "express";
import { AuthenticatedRequest } from "../core/types";
import { defaultUserSettings } from "./defaultSettings";

export const getUserSettings = (req: AuthenticatedRequest, res: Response) => {}

export const changeUserSettings = (req: AuthenticatedRequest, res: Response) => {}

export const getNotificationSettings = (req: AuthenticatedRequest, res: Response) => {}

export const changeNotificationSettings = (req: AuthenticatedRequest, res: Response) => {}

export const createNewUserSettings = (user: any) => {
  try {} catch (e) {
    const err = e as Error;
  }
}