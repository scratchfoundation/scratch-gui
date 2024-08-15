import React from 'react';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import HashParserHOC from '../../../src/lib/hash-parser-hoc.jsx';

jest.mock('react-ga');

describe('HashParserHOC', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore({
            scratchGui: {
                projectState: {}
            }
        });
    });

    test('when there is a hash, it passes the hash as projectId', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = HashParserHOC(Component);
        window.location.hash = '#1234567';
        const mockSetProjectIdFunc = jest.fn();
        mount(
            <WrappedComponent
                setProjectId={mockSetProjectIdFunc}
                store={store}
            />
        );
        expect(mockSetProjectIdFunc.mock.calls[0][0]).toBe('1234567');
    });

    test('when there is no hash, it passes 0 as the projectId', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = HashParserHOC(Component);
        window.location.hash = '';
        const mockSetProjectIdFunc = jest.fn();
        mount(
            <WrappedComponent
                setProjectId={mockSetProjectIdFunc}
                store={store}
            />
        );
        expect(mockSetProjectIdFunc.mock.calls[0][0]).toBe('0');
    });

    test('when the hash is not a number, it passes 0 as projectId', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = HashParserHOC(Component);
        window.location.hash = '#winning';
        const mockSetProjectIdFunc = jest.fn();
        mount(
            <WrappedComponent
                setProjectId={mockSetProjectIdFunc}
                store={store}
            />
        );
        expect(mockSetProjectIdFunc.mock.calls[0][0]).toBe('0');
    });

    test('when hash change happens, the projectId state is changed', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = HashParserHOC(Component);
        window.location.hash = '';
        const mockSetProjectIdFunc = jest.fn();
        const mounted = mount(
            <WrappedComponent
                setProjectId={mockSetProjectIdFunc}
                store={store}
            />
        );
        window.location.hash = '#1234567';
        mounted
            .childAt(0)
            .instance()
            .handleHashChange();
        expect(mockSetProjectIdFunc.mock.calls.length).toBe(2);
    });
});
