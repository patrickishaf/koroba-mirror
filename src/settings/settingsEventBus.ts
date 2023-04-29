import { EventEmitter } from 'events';
import { SettingsEvents } from '../core/events';
import { createNewUserSettings } from './settingsControllers';

const settingsEventBus = new EventEmitter();

settingsEventBus.on(SettingsEvents.CREATE_USER_SETTINGS, createNewUserSettings);

export default settingsEventBus;