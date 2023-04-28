import { Router } from "express";
import authenticateUser from "../middleware/authenticateUser";
import { changeNotificationSettings, getNotificationSettings, getUserSettings } from "./settingsControllers";

const userSettingsRouter = Router();

userSettingsRouter.get('/notifications', authenticateUser, getNotificationSettings);

userSettingsRouter.patch('/notifications/:id', authenticateUser, changeNotificationSettings);

userSettingsRouter.get('/', authenticateUser, getUserSettings);

userSettingsRouter.patch('/', authenticateUser, getUserSettings);

export default userSettingsRouter;