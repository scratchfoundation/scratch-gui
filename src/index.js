import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Root from './containers/Root'; // Root 컴포넌트 가져오기

import GUI from './containers/gui.jsx';
import AppStateHOC from './lib/app-state-hoc.jsx';
import GuiReducer, { guiInitialState, guiMiddleware, initEmbedded, initFullScreen, initPlayer } from './reducers/gui';
import LocalesReducer, { localesInitialState, initLocale } from './reducers/locales';
import { ScratchPaintReducer } from 'scratch-paint';
import { setFullScreen, setPlayer } from './reducers/mode';
import { remixProject } from './reducers/project-state';
import { setAppElement } from 'react-modal';
import VM from 'scratch-vm';

// VM 인스턴스를 window 객체에 할당
window.vm = new VM();
console.log('VM 인스턴스 초기화 완료:', window.vm);

const guiReducers = {
    locales: LocalesReducer,
    scratchGui: GuiReducer,
    scratchPaint: ScratchPaintReducer
};

export {
    GUI as default,
    AppStateHOC,
    setAppElement,
    guiReducers,
    guiInitialState,
    guiMiddleware,
    initEmbedded,
    initPlayer,
    initFullScreen,
    initLocale,
    localesInitialState,
    remixProject,
    setFullScreen,
    setPlayer
};

// URL 쿼리 파라미터에서 세션 ID 읽기
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 리덕스 스토어 생성
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// 초기 설정
document.addEventListener('DOMContentLoaded', () => {
    const sessionId = getQueryParam('scratchSession');
    console.log('세션 ID:', sessionId);

    if (sessionId) {
        // 세션 ID를 사용하여 서버에서 사용자 정보 가져오기
        fetch(`/get-user-session?sessionId=${sessionId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('사용자 정보:', data.user);
                    // 사용자 정보를 리덕스 상태에 설정
                    store.dispatch({ type: 'SET_USER_SESSION', user: data.user });
                } else {
                    console.error('사용자 정보를 가져오지 못했습니다:', data.error);
                }
            })
            .catch(error => {
                console.error('사용자 정보를 가져오는 중 오류 발생:', error);
            });
    }

    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        document.getElementById('app')
    );
});
