import React from 'react';
import ProjectLoaderHOC, {ProjectLoader} from '../../../src/lib/project-loader-hoc.jsx';
import {mount} from 'enzyme';

describe('ProjectLoaderHOC', () => {
    test('when there is no project data, it renders null', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        window.location.hash = '#winning';
        ProjectLoader.load = jest.fn((id, cb) => cb(null, null));
        const mounted = mount(<WrappedComponent />);
        ProjectLoader.load.mockRestore();
        window.location.hash = '';
        expect(mounted.find('div').exists()).toEqual(false);
    });

    test('when there is no hash, it loads the default project', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        window.location.hash = '';
        const mounted = mount(<WrappedComponent />);
        expect(mounted.find('div').text()).toEqual(JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA));
    });

    test('when there is a hash, it tries to load that project', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        window.location.hash = '#winning';
        ProjectLoader.load = jest.fn((id, cb) => cb(null, id));
        const mounted = mount(<WrappedComponent />);
        mounted.update();
        ProjectLoader.load.mockRestore();
        window.location.hash = '';
        expect(mounted
            .find('div')
            .text()
        ).toEqual('winning');
    });

    test('when hash change happens, the project data state is changed', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        window.location.hash = '';
        const mounted = mount(<WrappedComponent />);
        const before = mounted.find('div').text();
        ProjectLoader.load = jest.fn((id, cb) => cb(null, id));
        window.location.hash = `#winning`;
        mounted.node.updateProject();
        expect(mounted.find('div').text()).not.toEqual(before);
    });
});
