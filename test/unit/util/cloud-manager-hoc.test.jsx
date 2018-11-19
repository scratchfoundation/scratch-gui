import 'web-audio-test-api';

import React from 'react';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import VM from 'scratch-vm';
import {LoadingState} from '../../../src/reducers/project-state';
import CloudProvider from '../../../src/lib/cloud-provider';
jest.mock('../../../src/lib/cloud-provider');

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
                }
            }
        });
        stillLoadingStore = mockStore({
            scratchGui: {
                projectState: {
                    projectId: '1234',
                    loadingState: LoadingState.LOADING_WITH_ID
                }
            }
        });
        vm = new VM();
        vm.setCloudProvider = jest.fn();
        CloudProvider.mockClear();
    });
    test('when it mounts, the cloud provider is set on the vm', () => {
        const Component = () => (<div />);
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );
        expect(vm.setCloudProvider.mock.calls.length).toBe(1);
        expect(CloudProvider).toHaveBeenCalledTimes(1);
        const cloudProviderInstance = CloudProvider.mock.instances[0];
        expect(vm.setCloudProvider).toHaveBeenCalledWith(cloudProviderInstance);
    });

    test('when cloudHost is missing, the cloud provider is not set on the vm', () => {
        const Component = () => (<div />);
        const WrappedComponent = cloudManagerHOC(Component);
        mount(
            <WrappedComponent
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
                cloudHost="nonEmpty"
                store={stillLoadingStore}
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
        const mounted = mount(
            <WrappedComponent
                cloudHost="nonEmpty"
                store={stillLoadingStore}
                username="user"
                vm={vm}
            />
        );
        mounted.setProps({
            isShowingWithId: true,
            loadingState: LoadingState.SHOWING_WITH_ID
        });
        expect(vm.setCloudProvider.mock.calls.length).toBe(1);
        expect(CloudProvider).toHaveBeenCalledTimes(1);
        const cloudProviderInstance = CloudProvider.mock.instances[0];
        expect(vm.setCloudProvider).toHaveBeenCalledWith(cloudProviderInstance);
    });

    test('projectId change should not trigger cloudProvider connection unless isShowingWithId becomes true', () => {
        const Component = () => <div />;
        const WrappedComponent = cloudManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
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
        const cloudProviderInstance = CloudProvider.mock.instances[0];
        expect(vm.setCloudProvider).toHaveBeenCalledWith(cloudProviderInstance);
    });

    test('when it unmounts, the cloud provider is set on the vm', () => {
        const Component = () => (<div />);
        const WrappedComponent = cloudManagerHOC(Component);
        const mounted = mount(
            <WrappedComponent
                cloudHost="nonEmpty"
                store={store}
                username="user"
                vm={vm}
            />
        );

        expect(CloudProvider).toHaveBeenCalledTimes(1);
        const cloudProviderInstance = CloudProvider.mock.instances[0];
        const requestCloseConnection = cloudProviderInstance.requestCloseConnection;

        mounted.unmount();

        // vm.setCloudProvider is called twice,
        // once during mount and once during unmount
        expect(vm.setCloudProvider.mock.calls.length).toBe(2);
        expect(vm.setCloudProvider).toHaveBeenCalledWith(null);
        expect(requestCloseConnection).toHaveBeenCalledTimes(1);
    });
});
