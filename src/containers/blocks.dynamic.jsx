import {idleWhileLoadingAfterFetching} from '../lib/dynamic-render';

export default idleWhileLoadingAfterFetching(() => require('./blocks.jsx'));
