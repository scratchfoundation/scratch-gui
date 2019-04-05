import {idleWhileLoading} from '../lib/dynamic-render';

import './sound-tab.jsx';

export default idleWhileLoading(() => require('./sound-tab.jsx'));
