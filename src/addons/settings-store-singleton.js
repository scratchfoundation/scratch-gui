import SettingsStore from './settings-store';

const settingStore = new SettingsStore();
settingStore.store = settingStore.readLocalStorage();
export default settingStore;
