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

import React from 'react';
import ReactDOM from 'react-dom';
import downloadBlob from '../lib/download-blob.js';
import Settings from '../addons/settings/settings.jsx';
import SettingsStore from '../addons/settings-store-singleton';
import appTarget from './app-target';

const onReloadNow = () => {
    if (window.opener) {
        window.opener.postMessage({
            type: 'reload'
        }, location.origin);
    }
};

let timeout = null;
const onSettingsChanged = () => {
    if (timeout !== null) {
        return;
    }
    timeout = setTimeout(() => {
        timeout = null;
        if (window.opener) {
            window.opener.postMessage({
                type: 'settings-changed',
                store: SettingsStore.store
            }, location.origin);
        }
    });
};

const onExportSettings = settings => {
    const blob = new Blob([JSON.stringify(settings)]);
    downloadBlob('turbowarp-addon-settings.json', blob);
};

ReactDOM.render((
    <Settings
        onReloadNow={window.opener && onReloadNow}
        onSettingsChanged={onSettingsChanged}
        onExportSettings={onExportSettings}
    />
), appTarget);
