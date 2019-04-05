import {idleRequireWhileLoading} from '../lib/dynamic-render';

export default idleRequireWhileLoading(() => require('./target-pane.jsx'));
