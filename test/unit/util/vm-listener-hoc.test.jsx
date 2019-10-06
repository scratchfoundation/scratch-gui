import React from 'react';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import VM from 'scratch-vm';

import vmListenerHOC from '../../../src/lib/vm-listener-hoc.jsx';

describe('VMListenerHOC', () => {
    const mockStore = configureStore();
    let store;
    let vm;

    beforeEach(() => {
        vm = new VM();
        store = mockStore({
            scratchGui: {
                mode: {},
                modals: {},
                vm: vm
            }
        });
    });

    test('vm green flag event is bound to the passed in prop callback', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);
        const onGreenFlag = jest.fn();
        mount(
            <WrappedComponent
                store={store}
                vm={vm}
                onGreenFlag={onGreenFlag}
            />
        );
        expect(onGreenFlag).not.toHaveBeenCalled();
        vm.emit('PROJECT_START');
        expect(onGreenFlag).toHaveBeenCalled();
    });

    test('onGreenFlag is not passed to the children', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                store={store}
                vm={vm}
                onGreenFlag={jest.fn()}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().onGreenFlag).toBeUndefined();
    });

    test('targetsUpdate event from vm triggers targets update action', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);
        mount(
            <WrappedComponent
                store={store}
                vm={vm}
            />
        );
        const targetList = [];
        const editingTarget = 'id';
        vm.emit('targetsUpdate', {targetList, editingTarget});
        const actions = store.getActions();
        expect(actions[0].type).toEqual('scratch-gui/targets/UPDATE_TARGET_LIST');
        expect(actions[0].targets).toEqual(targetList);
        expect(actions[0].editingTarget).toEqual(editingTarget);
    });

    test('targetsUpdate does not dispatch if the sound recorder is visible', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);
        store = mockStore({
            scratchGui: {
                mode: {},
                modals: {soundRecorder: true},
                vm: vm
            }
        });
        mount(
            <WrappedComponent
                store={store}
                vm={vm}
            />
        );
        const targetList = [];
        const editingTarget = 'id';
        vm.emit('targetsUpdate', {targetList, editingTarget});
        const actions = store.getActions();
        expect(actions.length).toEqual(0);
    });

    test('PROJECT_CHANGED does dispatch if the sound recorder is visible', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);
        store = mockStore({
            scratchGui: {
                mode: {},
                modals: {soundRecorder: true},
                vm: vm
            }
        });
        mount(
            <WrappedComponent
                store={store}
                vm={vm}
            />
        );
        vm.emit('PROJECT_CHANGED');
        const actions = store.getActions();
        expect(actions.length).toEqual(1);
    });

    test('PROJECT_CHANGED does not dispatch if in fullscreen mode', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);
        store = mockStore({
            scratchGui: {
                mode: {isFullScreen: true},
                modals: {soundRecorder: true},
                vm: vm
            }
        });
        mount(
            <WrappedComponent
                store={store}
                vm={vm}
            />
        );
        vm.emit('PROJECT_CHANGED');
        const actions = store.getActions();
        expect(actions.length).toEqual(0);
    });

    test('keypresses go to the vm', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);

        // Mock document.addEventListener so we can trigger keypresses manually
        // Cannot use the enzyme simulate method because that only works on synthetic events
        const eventTriggers = {};
        document.addEventListener = jest.fn((event, cb) => {
            eventTriggers[event] = cb;
        });

        vm.postIOData = jest.fn();

        store = mockStore({
            scratchGui: {
                mode: {isFullScreen: true},
                modals: {soundRecorder: true},
                vm: vm
            }
        });
        mount(
            <WrappedComponent
                attachKeyboardEvents
                store={store}
                vm={vm}
            />
        );

        // keyboard events that do not target the document or body are ignored
        eventTriggers.keydown({key: 'A', target: null});
        expect(vm.postIOData).not.toHaveBeenLastCalledWith('keyboard', {key: 'A', isDown: true});

        // keydown/up with target as the document are sent to the vm via postIOData
        eventTriggers.keydown({key: 'A', target: document});
        expect(vm.postIOData).toHaveBeenLastCalledWith('keyboard', {key: 'A', isDown: true});

        eventTriggers.keyup({key: 'A', target: document});
        expect(vm.postIOData).toHaveBeenLastCalledWith('keyboard', {key: 'A', isDown: false});

        // When key is 'Dead' e.g. bluetooth keyboards on iOS, it sends keyCode instead
        // because the VM can process both named keys or keyCodes as the `key` property
        eventTriggers.keyup({key: 'Dead', keyCode: 10, target: document});
        expect(vm.postIOData).toHaveBeenLastCalledWith('keyboard', {key: 10, isDown: false});
    });
});
