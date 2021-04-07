/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import AddonRunner from './api';
import addons from './addon-manifests';
import SettingsStore from './settings-store-singleton';

for (const [id, manifest] of Object.entries(addons)) {
    if (!SettingsStore.getAddonEnabled(id)) {
        continue;
    }
    const runner = new AddonRunner(id, manifest);
    runner.run();
}
