import { Request, Response } from "express";
import { AuthenticatedRequest } from "../core/types";

export const getUserSettings = (req: AuthenticatedRequest, res: Response) => {}

export const changeUserSettings = (req: AuthenticatedRequest, res: Response) => {}

export const getNotificationSettings = (req: AuthenticatedRequest, res: Response) => {}

export const changeNotificationSettings = (req: AuthenticatedRequest, res: Response) => {}