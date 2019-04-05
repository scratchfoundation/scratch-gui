import {idleRequireWhileLoading} from '../../lib/dynamic-render';

export default idleRequireWhileLoading(() => require('./menu-bar.jsx'));
