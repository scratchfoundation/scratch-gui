import SettingsStore from './settings-store';

const settingStore = new SettingsStore();
settingStore.readLocalStorage();
export default settingStore;
