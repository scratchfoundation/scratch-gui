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
                projectState: {}
            }
        });
        vm = new VM();
    });

    test('if canSave becomes true when showing a project with an id, project will be saved', () => {
        const mockedSaveProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                isShowingWithId
                canSave={false}
                isCreating={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.SHOWING_WITH_ID}
                saveProject={mockedSaveProject}
                store={store}
                vm={vm}
            />
        );
        mounted.setProps({
            canSave: true
        });
        expect(mockedSaveProject).toHaveBeenCalled();
    });

    test('if canSave is alreatdy true and we show a project with an id, project will NOT be saved', () => {
        const mockedSaveProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                canSave
                isCreating={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.LOADING_VM_WITH_ID}
                saveProject={mockedSaveProject}
                store={store}
                vm={vm}
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
                createProject={mockedCreateProject}
                isCreating={false}
                isShowingWithId={false}
                isUpdating={false}
                loadingState={LoadingState.LOADING_VM_NEW_DEFAULT}
                store={store}
                vm={vm}
            />
        );
        mounted.setProps({
            isShowingWithoutId: true,
            loadingState: LoadingState.SHOWING_WITHOUT_ID
        });
        expect(mockedCreateProject).not.toHaveBeenCalled();
    });

    test('if canSave becomes true when showing a project without an id, project will be created', () => {
        const mockedCreateProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                isShowingWithoutId
                canSave={false}
                createProject={mockedCreateProject}
                isCreating={false}
                isShowingWithId={false}
                isUpdating={false}
                loadingState={LoadingState.SHOWING_WITHOUT_ID}
                store={store}
                vm={vm}
            />
        );
        mounted.setProps({
            canSave: true
        });
        expect(mockedCreateProject).toHaveBeenCalled();
    });

    test('if canSave is true and we transition to showing new project, project will be created', () => {
        const mockedCreateProject = jest.fn();
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                canSave
                createProject={mockedCreateProject}
                isCreating={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                isUpdating={false}
                loadingState={LoadingState.LOADING_VM_NEW_DEFAULT}
                store={store}
                vm={vm}
            />
        );
        mounted.setProps({
            isShowingWithoutId: true,
            loadingState: LoadingState.SHOWING_WITHOUT_ID
        });
        expect(mockedCreateProject).toHaveBeenCalled();
    });

    test('if we enter creating state, vm project should be requested', () => {
        vm.saveProjectSb3 = jest.fn(() => Promise.resolve());
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                canSave
                isCreating={false}
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
            isCreating: true,
            loadingState: LoadingState.CREATING_NEW
        });
        expect(vm.saveProjectSb3).toHaveBeenCalled();
    });

    test('if we enter updating/saving state, vm project shold be requested', () => {
        vm.saveProjectSb3 = jest.fn(() => Promise.resolve());
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                canSave
                isCreating={false}
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
            loadingState: LoadingState.SAVING_WITH_ID
        });
        expect(vm.saveProjectSb3).toHaveBeenCalled();
    });

    test('if we are already in updating/saving state, vm project shold be NOT requested', () => {
        vm.saveProjectSb3 = jest.fn(() => Promise.resolve());
        const Component = () => <div />;
        const WrappedComponent = projectSaverHOC(Component);
        const mounted = mount(
            <WrappedComponent
                canSave
                isUpdating
                isCreating={false}
                isShowingWithId={false}
                isShowingWithoutId={false}
                loadingState={LoadingState.SAVING_WITH_ID}
                reduxProjectId={'100'}
                store={store}
                vm={vm}
            />
        );
        mounted.setProps({
            isUpdating: true,
            loadingState: LoadingState.SAVING_WITH_ID,
            reduxProjectId: '99' // random change to force a re-render and componentDidUpdate
        });
        expect(vm.saveProjectSb3).not.toHaveBeenCalled();
    });

    // test('template', () => {
    //     vm.saveProjectSb3 = jest.fn(() => Promise.resolve());
    //     const mockedCreateProject = jest.fn();
    //     const mockedOnCreated = jest.fn();
    //     const mockedOnError = jest.fn();
    //     const mockedOnUpdated = jest.fn();
    //     const mockedSaveProject = jest.fn();
    //
    //     const Component = () => <div />;
    //     const WrappedComponent = projectSaverHOC(Component);
    //     const mounted = mount(
    //         <WrappedComponent
    //             canSave={false}
    //             createProject={mockedCreateProject}
    //             isCreating={false}
    //             isShowingWithId={false}
    //             isShowingWithoutId={false}
    //             isUpdating={false}
    //             loadingState={LoadingState.NOT_LOADED}
    //             reduxProjectId={'100'}
    //             saveProject={mockedSaveProject}
    //             store={store}
    //             vm={vm}
    //             onCreated={mockedOnCreated}
    //             onError={mockedOnError}
    //             onUpdated={mockedOnUpdated}
    //         />
    //     );
    //     mounted.setProps({
    //         canSave: true,
    //         isShowingWithId: true,
    //         loadingState: LoadingState.SHOWING_WITH_ID,
    //         projectData: '100'
    //     });
    //     expect(vm.loadProject).toHaveBeenLastCalledWith('100');
    //     // nextTick needed since vm.loadProject is async, and we have to wait for it :/
    //     process.nextTick(() => (
    //         expect(mockedCreateProject).toHaveBeenCalled()
    //     ));
    // });
});
