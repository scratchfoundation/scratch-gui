import React from 'react';
import ProjectLoaderHOC from '../../../src/lib/project-loader-hoc.jsx';
import storage from '../../../src/lib/storage';
import {mount} from 'enzyme';

jest.mock('react-ga');

describe('ProjectLoaderHOC', () => {

    test('when there is no id, it loads (default) project id 0', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        const originalLoad = storage.load;
        storage.load = jest.fn((type, id) => Promise.resolve(id));
        const mounted = mount(<WrappedComponent />);
        expect(mounted.props().projectId).toEqual(0);
        expect(storage.load).toHaveBeenCalledWith(
            storage.AssetType.Project, 0, storage.DataFormat.JSON
        );
        storage.load = originalLoad;
    });

    test('when there is an id, it tries to load that project', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        const originalLoad = storage.load;
        storage.load = jest.fn((type, id) => Promise.resolve({data: id}));
        const mounted = mount(<WrappedComponent projectId="100" />);
        expect(mounted.props().projectId).toEqual('100');
        expect(storage.load).toHaveBeenLastCalledWith(
            storage.AssetType.Project, '100', storage.DataFormat.JSON
        );
        storage.load = originalLoad;
    });

});
