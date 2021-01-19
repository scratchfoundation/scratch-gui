import AddonRunner from './api';
import addons from './addon-manifests';
import SettingsStore from './settings-store';

for (const [id, manifest] of Object.entries(addons)) {
    if (!SettingsStore.getAddonEnabled(id)) {
        continue;
    }
    const runner = new AddonRunner(id, manifest);
    runner.run();
}
