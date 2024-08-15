/* global WebAudioTestAPI */
import 'web-audio-test-api';
WebAudioTestAPI.setState({
    'AudioContext#resume': 'enabled'
});

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
                projectState: {},
                mode: {},
                vmStatus: {}
            },
            locales: {
                locale: '',
                messages: {}
            }
        });
        vm = new VM();
        vm.attachAudioEngine = jest.fn();
        vm.setCompatibilityMode = jest.fn();
        vm.setLocale = jest.fn();
        vm.start = jest.fn();
    });
    test('when it mounts in player mode, the vm is initialized but not started', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmManagerHOC(Component);
        mount(
            <WrappedComponent
                isPlayerOnly
                isStarted={false}
                store={store}
                vm={vm}
            />
        );
        expect(vm.attachAudioEngine.mock.calls.length).toBe(1);
        expect(vm.setCompatibilityMode.mock.calls.length).toBe(1);
        expect(vm.setLocale.mock.calls.length).toBe(1);
        expect(vm.initialized).toBe(true);

        // But vm should not be started automatically
        expect(vm.start).not.toHaveBeenCalled();
    });
    test('when it mounts in editor mode, the vm is initialized and started', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmManagerHOC(Component);
        mount(
            <WrappedComponent
                isPlayerOnly={false}
                isStarted={false}
                store={store}
                vm={vm}
            />
        );
        expect(vm.attachAudioEngine.mock.calls.length).toBe(1);
        expect(vm.setCompatibilityMode.mock.calls.length).toBe(1);
        expect(vm.setLocale.mock.calls.length).toBe(1);
        expect(vm.initialized).toBe(true);

        expect(vm.start).toHaveBeenCalled();
    });
    test('if it mounts with an initialized vm, it does not reinitialize the vm but will start it', () => {
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        vm.initialized = true;
        mount(
            <WrappedComponent
                isPlayerOnly={false}
                isStarted={false}
                store={store}
                vm={vm}
            />
        );
        expect(vm.attachAudioEngine.mock.calls.length).toBe(0);
        expect(vm.setCompatibilityMode.mock.calls.length).toBe(0);
        expect(vm.setLocale.mock.calls.length).toBe(0);
        expect(vm.initialized).toBe(true);

        expect(vm.start).toHaveBeenCalled();
    });

    test('if it mounts without starting the VM, it can be started by switching to editor mode', () => {
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        vm.initialized = true;
        const mounted = mount(
            <WrappedComponent
                isPlayerOnly
                isStarted={false}
                store={store}
                vm={vm}
            />
        );
        expect(vm.start).not.toHaveBeenCalled();
        mounted.setProps({
            isPlayerOnly: false
        });
        expect(vm.start).toHaveBeenCalled();
    });
    test('if it mounts with an initialized and started VM, it does not start again', () => {
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        vm.initialized = true;
        const mounted = mount(
            <WrappedComponent
                isPlayerOnly
                isStarted
                store={store}
                vm={vm}
            />
        );
        expect(vm.start).not.toHaveBeenCalled();
        mounted.setProps({
            isPlayerOnly: false
        });
        expect(vm.start).not.toHaveBeenCalled();
    });
    test('if the isLoadingWithId prop becomes true, it loads project data into the vm', () => {
        vm.loadProject = jest.fn(() => Promise.resolve());
        const mockedOnLoadedProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                fontsLoaded
                isLoadingWithId={false}
                store={store}
                vm={vm}
                onLoadedProject={mockedOnLoadedProject}
            />
        );
        mounted.setProps({
            canSave: true,
            isLoadingWithId: true,
            loadingState: LoadingState.LOADING_VM_WITH_ID,
            projectData: '100'
        });
        expect(vm.loadProject).toHaveBeenLastCalledWith('100');
        // nextTick needed since vm.loadProject is async, and we have to wait for it :/
        process.nextTick(() => (
            expect(mockedOnLoadedProject).toHaveBeenLastCalledWith(LoadingState.LOADING_VM_WITH_ID, true)
        ));
    });
    test('if the fontsLoaded prop becomes true, it loads project data into the vm', () => {
        vm.loadProject = jest.fn(() => Promise.resolve());
        const mockedOnLoadedProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                isLoadingWithId
                store={store}
                vm={vm}
                onLoadedProject={mockedOnLoadedProject}
            />
        );
        mounted.setProps({
            canSave: false,
            fontsLoaded: true,
            loadingState: LoadingState.LOADING_VM_WITH_ID,
            projectData: '100'
        });
        expect(vm.loadProject).toHaveBeenLastCalledWith('100');
        // nextTick needed since vm.loadProject is async, and we have to wait for it :/
        process.nextTick(() => (
            expect(mockedOnLoadedProject).toHaveBeenLastCalledWith(LoadingState.LOADING_VM_WITH_ID, false)
        ));
    });
    test('if the fontsLoaded prop is false, project data is never loaded', () => {
        vm.loadProject = jest.fn(() => Promise.resolve());
        const mockedOnLoadedProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = vmManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                isLoadingWithId
                store={store}
                vm={vm}
                onLoadedProject={mockedOnLoadedProject}
            />
        );
        mounted.setProps({
            loadingState: LoadingState.LOADING_VM_WITH_ID,
            projectData: '100'
        });
        expect(vm.loadProject).toHaveBeenCalledTimes(0);
        process.nextTick(() => expect(mockedOnLoadedProject).toHaveBeenCalledTimes(0));
    });
});
