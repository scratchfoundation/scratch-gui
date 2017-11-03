import React from 'react';
import ProjectLoaderHOC from '../../../src/lib/project-loader-hoc.jsx';
import storage from '../../../src/lib/storage';
import {mount} from 'enzyme';

describe('ProjectLoaderHOC', () => {
    test('when there is no project data, it renders null', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        window.location.hash = '#winning';
        const originalLoad = storage.load;
        storage.load = jest.fn(() => Promise.resolve(null));
        const mounted = mount(<WrappedComponent />);
        storage.load = originalLoad;
        window.location.hash = '';
        const mountedDiv = mounted.find('div');
        expect(mountedDiv.exists()).toEqual(false);
    });

    test('when there is no hash, it loads the default project', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        window.location.hash = '';
        const originalLoad = storage.load;
        storage.load = jest.fn((type, id) => Promise.resolve(id));
        const mounted = mount(<WrappedComponent />);
        expect(mounted.state().projectId).toEqual(0);
        expect(storage.load).toHaveBeenCalledWith(
            storage.AssetType.Project, 0, storage.DataFormat.JSON
        );
        storage.load = originalLoad;
    });

    test('when there is a hash, it tries to load that project', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        window.location.hash = '#winning';
        const originalLoad = storage.load;
        storage.load = jest.fn((type, id) => Promise.resolve({data: id}));
        const mounted = mount(<WrappedComponent />);
        expect(mounted.state().projectId).toEqual('winning');
        expect(storage.load).toHaveBeenLastCalledWith(
            storage.AssetType.Project, 'winning', storage.DataFormat.JSON
        );
        storage.load = originalLoad;
    });

    test('when hash change happens, the project data state is changed', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        window.location.hash = '';
        const mounted = mount(<WrappedComponent />);
        expect(mounted.state().projectId).toEqual(0);
        const originalLoad = storage.load;
        storage.load = jest.fn((type, id) => Promise.resolve({data: id}));
        window.location.hash = '#winning';
        mounted.instance().updateProject();
        expect(mounted.state().projectId).toEqual('winning');
        storage.load = originalLoad;
    });
});
