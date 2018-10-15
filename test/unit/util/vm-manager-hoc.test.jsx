import 'web-audio-test-api';

import React from 'react';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import VM from 'scratch-vm';
import {LoadingState} from '../../../src/reducers/project-state';

import vmManagerHOC from '../../../src/lib/vm-manager-hoc.jsx';

describe('VMManagerHOC', () => {
    const mockStore = configureStore();
    let store;
    let vm;

    beforeEach(() => {
        store = mockStore({
            scratchGui: {
                projectState: {}
            }
        });
        vm = new VM();
        vm.attachAudioEngine = jest.fn();
        vm.setCompatibilityMode = jest.fn();
        vm.start = jest.fn();
    });
    test('when it mounts, the vm is initialized', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmManagerHOC(Component);
        mount(
            <WrappedComponent
                store={store}
                vm={vm}
            />
        );
        expect(vm.attachAudioEngine.mock.calls.length).toBe(1);
        expect(vm.setCompatibilityMode.mock.calls.length).toBe(1);
        expect(vm.start.mock.calls.length).toBe(1);
        expect(vm.initialized).toBe(true);
    });
    test('if it mounts with an initialized vm, it does not reinitialize the vm', () => {
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        vm.initialized = true;
        mount(
            <WrappedComponent
                store={store}
                vm={vm}
            />
        );
        expect(vm.attachAudioEngine.mock.calls.length).toBe(0);
        expect(vm.setCompatibilityMode.mock.calls.length).toBe(0);
        expect(vm.start.mock.calls.length).toBe(0);
        expect(vm.initialized).toBe(true);
    });
    test('if the isLoadingWithId prop becomes true, it loads project data into the vm', () => {
        vm.loadProject = jest.fn(() => Promise.resolve());
        const mockedOnLoadedProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                isLoadingWithId={false}
                store={store}
                vm={vm}
                onLoadedProject={mockedOnLoadedProject}
            />
        );
        mounted.setProps({
            isLoadingWithId: true,
            loadingState: LoadingState.LOADING_VM_WITH_ID,
            projectData: '100'
        });
        expect(vm.loadProject).toHaveBeenLastCalledWith('100');
        // nextTick needed since vm.loadProject is async, and we have to wait for it :/
        process.nextTick(() => expect(mockedOnLoadedProject).toHaveBeenLastCalledWith(LoadingState.LOADING_VM_WITH_ID));
    });
    test('if there is projectData, the child is rendered', () => {
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                projectData="100"
                store={store}
                vm={vm}
            />
        );
        expect(mounted.find('div').length).toBe(1);
    });
    test('if there is no projectData, nothing is rendered', () => {
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                store={store}
                vm={vm}
            />
        );
        expect(mounted.find('div').length).toBe(0);
    });
});
