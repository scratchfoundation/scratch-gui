import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import throttle from 'redux-throttle';

import {intlInitialState, IntlProvider} from '../reducers/intl.js';
import reducer from '../reducers/gui';

// 增强开发工具 redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        // 限制 redux 行动
        throttle(300, {leading: true, trailing: true})
    )
);

// 创建一个带增强开发工具,并限制了行动的 store
const store = createStore(reducer, intlInitialState, enhancer);

/*
 * 提供 redux state 的高阶组件 (Higher Order Component to provide redux state)
 * @param {React.Component} WrappedComponent  需要提供 state 的组件(component to provide state for)
 * @returns {React.Component} 已初始化 redux state 的组件(component with redux and intl state provided)
 */
const AppStateHOC = function (WrappedComponent) {
    // Provider 唯一功能是传入 store
    const AppStateWrapper = ({...props}) => (
        <Provider store={store}>
            <IntlProvider>
                <WrappedComponent {...props} />
            </IntlProvider>
        </Provider>
    );
    return AppStateWrapper;
};

export default AppStateHOC;
