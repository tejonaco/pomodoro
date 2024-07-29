import { writeTextFile, readTextFile, exists, createDir } from '@tauri-apps/api/fs';
import { appConfigDir, join } from '@tauri-apps/api/path';


export type PomodoroSettings = {
  workingTime: number
  shortBreakTime: number
  longBreakTime: number
  rounds: number
  autoStartRound: boolean
}

const defaultSettings: PomodoroSettings = {
  workingTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  rounds: 4,
  autoStartRound: true
}

let SETTINGS_FILE: string;
export let settings: PomodoroSettings = defaultSettings;

export const setSettings = (update: PomodoroSettings) => settings = update

export async function readSettings(){
  const configDir = await appConfigDir();
  SETTINGS_FILE = await join(configDir, 'settings.json');

  if (!await exists(configDir)) {
    await createDir(configDir)
  }

  if (!await exists(SETTINGS_FILE)) {
    await saveConfig(defaultSettings)
  }

  const s = await readTextFile(SETTINGS_FILE)
  return JSON.parse(s) 
}

export async function saveConfig(config: PomodoroSettings) {
  try {
    const jsonString = JSON.stringify(config, null, 2);
    await writeTextFile(SETTINGS_FILE, jsonString);
    settings = config
    
  } catch (error) {
    console.error('Error writing config: ', error);
  }
}