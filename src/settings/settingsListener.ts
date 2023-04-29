import { EventEmitter } from 'events';
import { SettingsEvents } from '../core/events';
import { createNewUserSettings } from './settingsControllers';

const settingsListener = new EventEmitter();

settingsListener.on(SettingsEvents.CREATE_USER_SETTINGS, createNewUserSettings);

export default settingsListener;