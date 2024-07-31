import GUI from './containers/gui.jsx';
import AppStateHOC from './lib/app-state-hoc.jsx';
import GuiReducer, {guiInitialState, guiMiddleware, initEmbedded, initFullScreen, initPlayer} from './reducers/gui';
import LocalesReducer, {localesInitialState, initLocale} from './reducers/locales';
import {ScratchPaintReducer} from 'scratch-paint';
import {setFullScreen, setPlayer} from './reducers/mode';
import {remixProject} from './reducers/project-state';
import {setAppElement} from 'react-modal';
import VM from 'scratch-vm';

// VM 인스턴스를 window 객체에 할당
window.vm = new VM();

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

// URL 해시 처리 코드 추가
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substr(1);
    console.log('URL 해시 값:', hash); // 해시 값 출력
    if (hash) {
        fetch(hash)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const projectData = new Uint8Array(buffer);
                if (window.vm) {
                    window.vm.loadProject(projectData)
                        .then(() => {
                            console.log('SB2 파일 로드 완료:', projectData);
                        })
                        .catch(error => {
                            console.error('SB2 파일 로드 오류:', error);
                        });
                } else {
                    console.error('Scratch VM 인스턴스를 찾을 수 없습니다.');
                }
            })
            .catch(error => console.error('SB2 파일을 불러오는 중 오류 발생:', error));
    }
});

