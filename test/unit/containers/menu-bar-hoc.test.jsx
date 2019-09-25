import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import MenuBarHOC from '../../../src/containers/menu-bar-hoc.jsx';

describe('Menu Bar HOC', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore({
            scratchGui: {
                projectChanged: true
            }
        });
    });

    test('Logged in user who IS owner and HAS changed project will NOT be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canCreateNew
                canSave
                projectChanged
                // assume the user will click "cancel" on the confirm dialog
                confirmWithMessage={() => (false)} // eslint-disable-line react/jsx-no-bind
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(true);
    });

    test('Logged in user who IS owner and has NOT changed project will NOT be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canCreateNew
                canSave
                confirmWithMessage={() => (false)} // eslint-disable-line react/jsx-no-bind
                projectChanged={false}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(true);
    });

    test('Logged in user who is NOT owner and HAS changed project will NOT be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canCreateNew
                projectChanged
                canSave={false}
                confirmWithMessage={() => (false)} // eslint-disable-line react/jsx-no-bind
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(true);
    });

    test('Logged OUT user who HAS changed project WILL be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                projectChanged
                canCreateNew={false}
                canSave={false}
                confirmWithMessage={() => (false)} // eslint-disable-line react/jsx-no-bind
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(false);
    });

    test('Logged OUT user who has NOT changed project WILL NOT be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canCreateNew={false}
                canSave={false}
                confirmWithMessage={() => (false)} // eslint-disable-line react/jsx-no-bind
                projectChanged={false}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(true);
    });

    test('Logged in user who IS owner and HAS changed project SHOULD save before transition to project page', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canSave
                projectChanged
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().shouldSaveBeforeTransition()).toBe(true);
    });

    test('Logged in user who IS owner and has NOT changed project should NOT save before transition', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canSave
                projectChanged={false}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().shouldSaveBeforeTransition()).toBe(false);
    });

    test('Logged in user who is NOT owner and HAS changed project should NOT save before transition', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                projectChanged
                canSave={false}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().shouldSaveBeforeTransition()).toBe(false);
    });

    test('Logged in user who is NOT owner and has NOT changed project should NOT save before transition', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canSave={false}
                projectChanged={false}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().shouldSaveBeforeTransition()).toBe(false);
    });

});
