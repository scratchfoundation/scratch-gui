/**
 * @license
 * Copyright (c) 2020 Thomas Weber
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

import './import-first';

import ReactDOM from 'react-dom';
import React from 'react';

import Interface from './render-interface.jsx';
import appTarget from './app-target';

ReactDOM.render(<Interface
    isPlayerOnly
    isFullScreen
/>, appTarget);
