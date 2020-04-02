const ACTIVATE_MACHINE = 'scratch-gui/machine-learning/ACTIVATE_MACHINE';
const ACTIVE_MACHINE_MODAL = 'scratch-gui/machine-learning/ACTIVE_MACHINE_MODAL';
const ACTIVE_MACHINE_MINI = 'scratch-gui/machine-learning/ACTIVE_MACHINE_MINI';
const CLOSE_MACHINE = 'scratch-gui/machine-learning/CLOSE_MACHINE';
const CLOSE_MACHINE_MODAL = 'scratch-gui/machine-learning/CLOSE_MACHINE_MODAL';

const initialState = {
    active: false, // 删除 dom
    hidden: false, // 隐藏
    isMini: false // 小窗
};

const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ACTIVATE_MACHINE:
        if (state.hidden) {
            return Object.assign({}, state, {
                hidden: false,
                isMini: false
            });
        }
        return Object.assign({}, state, {
            active: true
        });
    case ACTIVE_MACHINE_MODAL:
        return Object.assign({}, state, {
            hidden: false,
            isMini: false
        });
    case ACTIVE_MACHINE_MINI:
        return Object.assign({}, state, {
            hidden: false,
            isMini: true
        });
    case CLOSE_MACHINE:
        return Object.assign({}, state, {
            active: false,
            hidden: false
        });
    case CLOSE_MACHINE_MODAL:
        return Object.assign({}, state, {
            hidden: true,
            isMini: false
        });
    default:
        return state;
    }
};

const activateMachine = () => ({
    type: ACTIVATE_MACHINE
});

const activeMachineModal = () => ({
    type: ACTIVE_MACHINE_MODAL
});

const activeMachineMini = () => ({
    type: ACTIVE_MACHINE_MINI
})

const closeMachine = () => ({
    type: CLOSE_MACHINE
});

const closeMachineModal = () => ({
    type: CLOSE_MACHINE_MODAL
});

export {
    reducer as default,
    initialState as machineLearningInitialState,
    activateMachine,
    activeMachineModal,
    activeMachineMini,
    closeMachine,
    closeMachineModal
};
