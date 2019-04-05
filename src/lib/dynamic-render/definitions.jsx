import {connect} from 'react-redux';
import {compose} from 'redux';

import {
    addProps,
    gate,
    placeholder
} from './gate.jsx';

import {
    loadComponent,
    loadNull
} from './load-module.jsx';

import {
    schedule
} from './schedule.jsx';

import {
    afterReady
} from './after-ready.jsx';

import {
    fetching,
    loading
} from './selectors';

const idleRequire = compose(
    placeholder,
    addProps({priority: 1}),
    schedule,
    gate,
    loadNull
);

const idleWhileOperationWithPriority = operation => priority => (
    compose(
        connect((state, props) => ({
            priority: props.priority || (operation(state) ? priority : -1)
        })),
        schedule
    )
);

const idleWhileFetchingWithPriority = idleWhileOperationWithPriority(fetching);

const idleWhileFetching = compose(
    idleWhileFetchingWithPriority(2),
    gate,
    loadComponent
);


const idleRequireWhileFetching = loadModule => (
    compose(
        idleWhileFetchingWithPriority(2),
        idleRequire(loadModule),
        loadComponent
    )(loadModule)
);

const idleWhileLoadingWithPriority = idleWhileOperationWithPriority(loading);

const idleWhileLoading = compose(
    idleWhileLoadingWithPriority(2),
    gate,
    loadComponent
);

const idleRequireWhileLoading = loadModule => (
    compose(
        idleWhileLoadingWithPriority(2),
        idleRequire(loadModule),
        loadComponent
    )(loadModule)
);

const afterFetching = compose(
    connect(state => ({ready: !fetching(state)})),
    afterReady,
    gate
);

const idleWhileLoadingAfterFetching = compose(
    afterFetching,
    idleWhileLoadingWithPriority(10),
    gate,
    loadComponent
);

const whileLoading = compose(
    connect((state, props) => ({ready: props.ready || loading(state)})),
    gate,
    loadComponent
);

export {
    idleWhileFetching,
    idleWhileLoading,
    idleRequireWhileFetching,
    idleRequireWhileLoading,
    idleWhileLoadingAfterFetching,
    whileLoading
};
