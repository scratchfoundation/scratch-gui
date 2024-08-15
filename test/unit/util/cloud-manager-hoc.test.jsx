import 'web-audio-test-api';

import React from 'react';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import VM from 'scratch-vm';
import {LoadingState} from '../../../src/reducers/project-state';
import CloudProvider from '../../../src/lib/cloud-provider';
const mockCloudProviderInstance = {
    connection: true,
    requestCloseConnection: jest.fn()
};
jest.mock('../../../src/lib/cloud-provider', () =>
    jest.fn().mockImplementation(() => mockCloudProviderInstance)
);

import cloudManagerHOC from '../../../src/lib/cloud-manager-hoc.jsx';

describe('CloudManagerHOC', () => {
    const mockStore = configureStore();
    let store;
    let vm;
    let stillLoadingStore;

    beforeEach(() => {
        store = mockStore({
            scratchGui: {
                projectState: {
                    projectId: '1234',
                    loadingState: LoadingState.SHOWING_WITH_ID
                },
                mode: {
                    hasEverEnteredEditor: false
                }
            }
        });
        stillLoadingStore = mockStore({
            scratchGui: {
                projectState: {
                    projectId: '1234',
                    loadingState: LoadingState.LOADING_WITH_ID
                },
                mode: {
                    hasEverEnteredEditor: false
                }
            }
        });
        vm = new VM();
        vm.setCloudProvider = jest.fn();
        vm.runtime = {
            hasCloudData: jest.fn(() => true)
        };
        vm.extensionManager = {
            isExtensionLoaded: jest.fn(() => false)
        };
        CloudProvider.mockClear();
        mockCloudProviderInstance.requestCloseConnection.mockClear();
    });
    test('when it mounts, the cloud provider is set on the vm', () => {
        const Component = () => (<div />);
        const WrappedComponent = cloudManagerHOC(Component);
        const onShowCloudInfo = jest.fn();

        mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
                onShowCloudInfo={onShowCloudInfo}
            />
        );
        expect(vm.setCloudProvider.mock.calls.length).toBe(1);
        expect(CloudProvider).toHaveBeenCalledTimes(1);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(mockCloudProviderInstance);
        expect(onShowCloudInfo).not.toHaveBeenCalled();
    });

    test('when cloudHost is missing, the cloud provider is not set on the vm', () => {
        const Component = () => (<div />);
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
                hasCloudPermission
                store={store}
                username="user"
                vm={vm}
            />
        );
        expect(vm.setCloudProvider.mock.calls.length).toBe(0);
        expect(CloudProvider).not.toHaveBeenCalled();

    });

    test('when projectID is missing, the cloud provider is not set on the vm', () => {

        const Component = () => (<div />);
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                vm={vm}
            />
        );
        expect(vm.setCloudProvider.mock.calls.length).toBe(0);
        expect(CloudProvider).not.toHaveBeenCalled();
    });

    test('when project is not showingWithId, the cloud provider is not set on the vm', () => {

        const Component = () => (<div />);
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={stillLoadingStore}
                username="user"
                vm={vm}
            />
        );
        expect(vm.setCloudProvider.mock.calls.length).toBe(0);
        expect(CloudProvider).not.toHaveBeenCalled();
    });

    test('when hasCloudPermission is false, the cloud provider is not set on the vm', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
                cloudHost="nonEmpty"
                hasCloudPermission={false}
                store={store}
                username="user"
                vm={vm}
            />
        );

        expect(vm.setCloudProvider.mock.calls.length).toBe(0);
        expect(CloudProvider).not.toHaveBeenCalled();
    });

    test('when videoSensing extension is active, the cloud provider is not set on the vm', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        vm.extensionManager.isExtensionLoaded = jest.fn(extension => extension === 'videoSensing');

        mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );

        expect(vm.setCloudProvider.mock.calls.length).toBe(0);
        expect(CloudProvider).not.toHaveBeenCalled();
    });

    test('if the isShowingWithId prop becomes true, it sets the cloud provider on the vm', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        const onShowCloudInfo = jest.fn();
        vm.runtime.hasCloudData = jest.fn(() => false);

        const mounted = mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={stillLoadingStore}
                username="user"
                vm={vm}
                onShowCloudInfo={onShowCloudInfo}
            />
        );
        expect(onShowCloudInfo).not.toHaveBeenCalled();

        vm.runtime.hasCloudData = jest.fn(() => true);
        vm.emit('HAS_CLOUD_DATA_UPDATE', true);

        mounted.setProps({
            isShowingWithId: true,
            loadingState: LoadingState.SHOWING_WITH_ID
        });
        expect(vm.setCloudProvider.mock.calls.length).toBe(1);
        expect(CloudProvider).toHaveBeenCalledTimes(1);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(mockCloudProviderInstance);
        expect(onShowCloudInfo).not.toHaveBeenCalled();
    });

    test('projectId change should not trigger cloudProvider connection unless isShowingWithId becomes true', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={stillLoadingStore}
                username="user"
                vm={vm}
            />
        );
        mounted.setProps({
            projectId: 'a different id'
        });
        expect(vm.setCloudProvider.mock.calls.length).toBe(0);
        expect(CloudProvider).not.toHaveBeenCalled();
        mounted.setProps({
            isShowingWithId: true,
            loadingState: LoadingState.SHOWING_WITH_ID
        });
        expect(vm.setCloudProvider.mock.calls.length).toBe(1);
        expect(CloudProvider).toHaveBeenCalledTimes(1);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(mockCloudProviderInstance);
    });

    test('when it unmounts, the cloud provider is reset to null on the vm', () => {
        const Component = () => (<div />);
        const WrappedComponent = cloudManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );

        expect(CloudProvider).toHaveBeenCalled();
        const requestCloseConnection = mockCloudProviderInstance.requestCloseConnection;

        mounted.unmount();

        // vm.setCloudProvider is called twice,
        // once during mount and once during unmount
        expect(vm.setCloudProvider.mock.calls.length).toBe(2);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(null);
        expect(requestCloseConnection).toHaveBeenCalledTimes(1);
    });

    test('projectId changing should trigger cloudProvider disconnection', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );

        expect(CloudProvider).toHaveBeenCalled();
        const requestCloseConnection = mockCloudProviderInstance.requestCloseConnection;

        mounted.setProps({
            projectId: 'a different id'
        });

        expect(vm.setCloudProvider.mock.calls.length).toBe(2);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(null);
        expect(requestCloseConnection).toHaveBeenCalledTimes(1);

    });

    test('username changing should trigger cloudProvider disconnection', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );

        expect(CloudProvider).toHaveBeenCalled();
        const requestCloseConnection = mockCloudProviderInstance.requestCloseConnection;

        mounted.setProps({
            username: 'a different user'
        });

        expect(vm.setCloudProvider.mock.calls.length).toBe(2);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(null);
        expect(requestCloseConnection).toHaveBeenCalledTimes(1);

    });

    test('project without cloud data should not trigger cloud connection', () => {
        // Mock the vm runtime function so that has cloud data is not
        // initially true
        vm.runtime.hasCloudData = jest.fn(() => false);

        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );
        expect(vm.setCloudProvider.mock.calls.length).toBe(0);
        expect(CloudProvider).not.toHaveBeenCalled();
    });

    test('projectHasCloudData becoming true should trigger a cloud connection', () => {
        // Mock the vm runtime function so that has cloud data is not
        // initially true
        vm.runtime.hasCloudData = jest.fn(() => false);
        const onShowCloudInfo = jest.fn();

        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
                onShowCloudInfo={onShowCloudInfo}
            />
        );
        expect(vm.setCloudProvider.mock.calls.length).toBe(0);
        expect(CloudProvider).not.toHaveBeenCalled();
        expect(onShowCloudInfo).not.toHaveBeenCalled();

        // Mock VM hasCloudData becoming true and emitting an update
        vm.runtime.hasCloudData = jest.fn(() => true);
        vm.emit('HAS_CLOUD_DATA_UPDATE', true);

        expect(vm.setCloudProvider.mock.calls.length).toBe(1);
        expect(CloudProvider).toHaveBeenCalledTimes(1);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(mockCloudProviderInstance);
        expect(onShowCloudInfo).toHaveBeenCalled();
    });

    test('projectHasCloudDataUpdate becoming false should trigger cloudProvider disconnection', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );

        expect(CloudProvider).toHaveBeenCalled();
        const requestCloseConnection = mockCloudProviderInstance.requestCloseConnection;

        vm.runtime.hasCloudData = jest.fn(() => false);
        vm.emit('HAS_CLOUD_DATA_UPDATE', false);

        expect(vm.setCloudProvider.mock.calls.length).toBe(2);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(null);
        expect(requestCloseConnection).toHaveBeenCalledTimes(1);
    });

    // Editor Mode Connection/Disconnection Tests
    test('Entering editor mode and can\'t save project should disconnect cloud provider', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                hasCloudPermission
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );

        expect(CloudProvider).toHaveBeenCalled();
        const requestCloseConnection = mockCloudProviderInstance.requestCloseConnection;

        mounted.setProps({
            canModifyCloudData: false
        });

        expect(vm.setCloudProvider.mock.calls.length).toBe(2);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(null);
        expect(requestCloseConnection).toHaveBeenCalledTimes(1);
    });
});
