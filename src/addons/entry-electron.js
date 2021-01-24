/**
 * @license
 * Copyright (c) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {ipcRenderer} from 'electron';
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

ipcRenderer.on('addon-settings-changed', (event, settings) => {
    SettingsStore.store = settings;
    SettingsStore.dispatchEvent(new CustomEvent('reread'));
});
