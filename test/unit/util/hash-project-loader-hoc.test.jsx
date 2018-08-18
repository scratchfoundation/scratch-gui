import React from 'react';
import HashParserHOC from '../../../src/lib/hash-parser-hoc.jsx';
import {mount} from 'enzyme';

jest.mock('react-ga');

describe('HashParserHOC', () => {
    test('when there is a hash, it passes the hash as projectId', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = HashParserHOC(Component);
        window.location.hash = '#1234567';
        const mounted = mount(<WrappedComponent />);
        expect(mounted.state().projectId).toEqual('1234567');
    });

    test('when there is no hash, it passes 0 as the projectId', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = HashParserHOC(Component);
        window.location.hash = '';
        const mounted = mount(<WrappedComponent />);
        expect(mounted.state().projectId).toEqual(0);
    });

    test('when the hash is not a number, it passes 0 as projectId', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = HashParserHOC(Component);
        window.location.hash = '#winning';
        const mounted = mount(<WrappedComponent />);
        expect(mounted.state().projectId).toEqual(0);
    });

    test('when hash change happens, the projectId state is changed', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = HashParserHOC(Component);
        window.location.hash = '';
        const mounted = mount(<WrappedComponent />);
        expect(mounted.state().projectId).toEqual(0);
        window.location.hash = '#1234567';
        mounted.instance().handleHashChange();
        expect(mounted.state().projectId).toEqual('1234567');
    });
});
