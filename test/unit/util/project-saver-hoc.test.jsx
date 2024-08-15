import 'web-audio-test-api';

import React from 'react';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {LoadingState} from '../../../src/reducers/project-state';
import VM from 'scratch-vm';

import projectSaverHOC from '../../../src/lib/project-saver-hoc.jsx';

describe('projectSaverHOC', () => {
    const mockStore = configureStore();
    let store;
    let vm;

    beforeEach(() => {
        store = mockStore({
            scratchGui: {
                projectChanged: false,
                projectState: {},
                projectTitle: 'Scratch Project',
                timeout: {
                    autoSaveTimeoutId: null
                }
            },
            locales: {
                locale: 'en'
            }
        });
        vm = new VM();
        jest.useFakeTimers();
    });

    test('if canSave becomes true when showing a project with an id, project will be saved', () => {
        const mockedUpdateProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                isShowingWithId
                canSave={false}
                isCreatingNew={false}
                isShowingSaveable={false} // set explicitly because it relies on ownProps.canSave
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.SHOWING_WITH_ID}
                store={store}
                vm={vm}
                onAutoUpdateProject={mockedUpdateProject}
            />
        );
        mounted.setProps({
            canSave: true,
            isShowingSaveable: true
        });
        expect(mockedUpdateProject).toHaveBeenCalled();
    });

    test('if canSave is already true and we show a project with an id, project will NOT be saved', () => {
        const mockedSaveProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                canSave
                isCreatingNew={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.LOADING_VM_WITH_ID}
                store={store}
                vm={vm}
                onAutoUpdateProject={mockedSaveProject}
            />
        );
        mounted.setProps({
            canSave: true,
            isShowingWithId: true,
            loadingState: LoadingState.SHOWING_WITH_ID
        });
        expect(mockedSaveProject).not.toHaveBeenCalled();
    });

    test('if canSave is false when showing a project without an id, project will NOT be created', () => {
        const mockedCreateProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                isShowingWithoutId
                canSave={false}
                isCreatingNew={false}
                isShowingWithId={false}
                isUpdating={false}
                loadingState={LoadingState.LOADING_VM_NEW_DEFAULT}
                store={store}
                vm={vm}
                onCreateProject={mockedCreateProject}
            />
        );
        mounted.setProps({
            isShowingWithoutId: true,
            loadingState: LoadingState.SHOWING_WITHOUT_ID
        });
        expect(mockedCreateProject).not.toHaveBeenCalled();
    });

    test('if canCreateNew becomes true when showing a project without an id, project will be created', () => {
        const mockedCreateProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                isShowingWithoutId
                canCreateNew={false}
                isCreatingNew={false}
                isShowingWithId={false}
                isUpdating={false}
                loadingState={LoadingState.SHOWING_WITHOUT_ID}
                store={store}
                vm={vm}
                onCreateProject={mockedCreateProject}
            />
        );
        mounted.setProps({
            canCreateNew: true
        });
        expect(mockedCreateProject).toHaveBeenCalled();
    });

    test('if canCreateNew is true and we transition to showing new project, project will be created', () => {
        const mockedCreateProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                canCreateNew
                isCreatingNew={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.LOADING_VM_NEW_DEFAULT}
                store={store}
                vm={vm}
                onCreateProject={mockedCreateProject}
            />
        );
        mounted.setProps({
            isShowingWithoutId: true,
            loadingState: LoadingState.SHOWING_WITHOUT_ID
        });
        expect(mockedCreateProject).toHaveBeenCalled();
    });

    test('if we enter creating new state, vm project should be requested', () => {
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mockedStoreProject = jest.fn(() => Promise.resolve());
        // The first wrapper is redux's Connect HOC
        WrappedComponent.WrappedComponent.prototype.storeProject = mockedStoreProject;
        const mounted = mount(
            <WrappedComponent
                canSave
                isCreatingCopy={false}
                isCreatingNew={false}
                isRemixing={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.LOADING_VM_NEW_DEFAULT}
                reduxProjectId={'100'}
                store={store}
                vm={vm}
            />
        );
        mounted.setProps({
            isCreatingNew: true,
            loadingState: LoadingState.CREATING_NEW
        });
        expect(mockedStoreProject).toHaveBeenCalled();
    });

    test('if we enter remixing state, vm project should be requested, and alert should show', () => {
        const mockedShowCreatingRemixAlert = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mockedStoreProject = jest.fn(() => Promise.resolve());
        // The first wrapper is redux's Connect HOC
        WrappedComponent.WrappedComponent.prototype.storeProject = mockedStoreProject;
        const mounted = mount(
            <WrappedComponent
                canSave
                isCreatingCopy={false}
                isCreatingNew={false}
                isRemixing={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.SHOWING_WITH_ID}
                reduxProjectId={'100'}
                store={store}
                vm={vm}
                onShowCreatingRemixAlert={mockedShowCreatingRemixAlert}
            />
        );
        mounted.setProps({
            isRemixing: true,
            loadingState: LoadingState.REMIXING
        });
        expect(mockedStoreProject).toHaveBeenCalled();
        expect(mockedShowCreatingRemixAlert).toHaveBeenCalled();
    });

    test('if we enter creating copy state, vm project should be requested, and alert should show', () => {
        const mockedShowCreatingCopyAlert = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mockedStoreProject = jest.fn(() => Promise.resolve());
        // The first wrapper is redux's Connect HOC
        WrappedComponent.WrappedComponent.prototype.storeProject = mockedStoreProject;
        const mounted = mount(
            <WrappedComponent
                canSave
                isCreatingCopy={false}
                isCreatingNew={false}
                isRemixing={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.SHOWING_WITH_ID}
                reduxProjectId={'100'}
                store={store}
                vm={vm}
                onShowCreatingCopyAlert={mockedShowCreatingCopyAlert}
            />
        );
        mounted.setProps({
            isCreatingCopy: true,
            loadingState: LoadingState.CREATING_COPY
        });
        expect(mockedStoreProject).toHaveBeenCalled();
        expect(mockedShowCreatingCopyAlert).toHaveBeenCalled();
    });

    test('if we enter updating/saving state, vm project should be requested', () => {
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mockedStoreProject = jest.fn(() => Promise.resolve());
        // The first wrapper is redux's Connect HOC
        WrappedComponent.WrappedComponent.prototype.storeProject = mockedStoreProject;
        const mounted = mount(
            <WrappedComponent
                canSave
                isCreatingNew={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.LOADING_VM_WITH_ID}
                reduxProjectId={'100'}
                store={store}
                vm={vm}
            />
        );
        mounted.setProps({
            isUpdating: true,
            loadingState: LoadingState.MANUAL_UPDATING
        });
        expect(mockedStoreProject).toHaveBeenCalled();
    });

    test('if we are already in updating/saving state, vm project ' +
            'should NOT requested, alert should NOT show', () => {
        const mockedShowCreatingAlert = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mockedStoreProject = jest.fn(() => Promise.resolve());
        // The first wrapper is redux's Connect HOC
        WrappedComponent.WrappedComponent.prototype.storeProject = mockedStoreProject;
        const mounted = mount(
            <WrappedComponent
                canSave
                isUpdating
                isCreatingNew={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                loadingState={LoadingState.MANUAL_UPDATING}
                reduxProjectId={'100'}
                store={store}
                vm={vm}
                onShowCreatingAlert={mockedShowCreatingAlert}
            />
        );
        mounted.setProps({
            isUpdating: true,
            loadingState: LoadingState.AUTO_UPDATING,
            reduxProjectId: '99' // random change to force a re-render and componentDidUpdate
        });
        expect(mockedStoreProject).not.toHaveBeenCalled();
        expect(mockedShowCreatingAlert).not.toHaveBeenCalled();
    });

    test('if user saves, inline saving alert should show', () => {
        const mockedShowSavingAlert = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                canSave
                isShowingWithoutId
                canCreateNew={false}
                isCreatingNew={false}
                isManualUpdating={false}
                isShowingWithId={false}
                isUpdating={false}
                loadingState={LoadingState.SHOWING_WITH_ID}
                store={store}
                vm={vm}
                onShowSavingAlert={mockedShowSavingAlert}
            />
        );
        mounted.setProps({
            isManualUpdating: true,
            isUpdating: true
        });
        expect(mockedShowSavingAlert).toHaveBeenCalled();
    });

    test('if project is changed, it should autosave after interval', () => {
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mockedAutoUpdate = jest.fn(() => Promise.resolve());
        const mounted = mount(
            <WrappedComponent
                canSave
                isShowingSaveable
                isShowingWithId
                loadingState={LoadingState.SHOWING_WITH_ID}
                store={store}
                vm={vm}
                onAutoUpdateProject={mockedAutoUpdate}
            />
        );
        mounted.setProps({
            projectChanged: true
        });
        // Fast-forward until all timers have been executed
        jest.runAllTimers();
        expect(mockedAutoUpdate).toHaveBeenCalled();
    });

    test('if project is changed several times in a row, it should only autosave once', () => {
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mockedAutoUpdate = jest.fn(() => Promise.resolve());
        const mounted = mount(
            <WrappedComponent
                canSave
                isShowingSaveable
                isShowingWithId
                loadingState={LoadingState.SHOWING_WITH_ID}
                store={store}
                vm={vm}
                onAutoUpdateProject={mockedAutoUpdate}
            />
        );
        mounted.setProps({
            projectChanged: true,
            reduxProjectTitle: 'a'
        });
        mounted.setProps({
            projectChanged: true,
            reduxProjectTitle: 'b'
        });
        mounted.setProps({
            projectChanged: true,
            reduxProjectTitle: 'c'
        });
        // Fast-forward until all timers have been executed
        jest.runAllTimers();
        expect(mockedAutoUpdate).toHaveBeenCalledTimes(1);
    });

    test('if project is not changed, it should not autosave after interval', () => {
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mockedAutoUpdate = jest.fn(() => Promise.resolve());
        const mounted = mount(
            <WrappedComponent
                canSave
                isShowingSaveable
                isShowingWithId
                loadingState={LoadingState.SHOWING_WITH_ID}
                store={store}
                vm={vm}
                onAutoUpdateProject={mockedAutoUpdate}
            />
        );
        mounted.setProps({
            projectChanged: false
        });
        // Fast-forward until all timers have been executed
        jest.runAllTimers();
        expect(mockedAutoUpdate).not.toHaveBeenCalled();
    });

    test('when starting to remix, onRemixing should be called with param true', () => {
        const mockedOnRemixing = jest.fn();
        const mockedStoreProject = jest.fn(() => Promise.resolve());
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        WrappedComponent.WrappedComponent.prototype.storeProject = mockedStoreProject;
        const mounted = mount(
            <WrappedComponent
                isRemixing={false}
                store={store}
                vm={vm}
                onRemixing={mockedOnRemixing}
            />
        );
        mounted.setProps({
            isRemixing: true
        });
        expect(mockedOnRemixing).toHaveBeenCalledWith(true);
    });

    test('when starting to remix, onRemixing should be called with param false', () => {
        const mockedOnRemixing = jest.fn();
        const mockedStoreProject = jest.fn(() => Promise.resolve());
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        WrappedComponent.WrappedComponent.prototype.storeProject = mockedStoreProject;
        const mounted = mount(
            <WrappedComponent
                isRemixing
                store={store}
                vm={vm}
                onRemixing={mockedOnRemixing}
            />
        );
        mounted.setProps({
            isRemixing: false
        });
        expect(mockedOnRemixing).toHaveBeenCalledWith(false);
    });

    test('uses onSetProjectThumbnailer on mount/unmount', () => {
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const setThumb = jest.fn();
        const mounted = mount(
            <WrappedComponent
                store={store}
                vm={vm}
                onSetProjectThumbnailer={setThumb}
            />
        );
        // Set project thumbnailer should be called on mount
        expect(setThumb).toHaveBeenCalledTimes(1);

        // And it should not pass that function on to wrapped element
        expect(mounted.find(Component).props().onSetProjectThumbnailer).toBeUndefined();

        // Unmounting should call it again with null
        mounted.unmount();
        expect(setThumb).toHaveBeenCalledTimes(2);
        expect(setThumb.mock.calls[1][0]).toBe(null);
    });

    test('uses onSetProjectSaver on mount/unmount', () => {
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const setSaver = jest.fn();
        const mounted = mount(
            <WrappedComponent
                store={store}
                vm={vm}
                onSetProjectSaver={setSaver}
            />
        );
        // Set project saver should be called on mount
        expect(setSaver).toHaveBeenCalledTimes(1);

        // And it should not pass that function on to wrapped element
        expect(mounted.find(Component).props().onSetProjectSaver).toBeUndefined();

        // Unmounting should call it again with null
        mounted.unmount();
        expect(setSaver).toHaveBeenCalledTimes(2);
        expect(setSaver.mock.calls[1][0]).toBe(null);
    });
});
