import React from 'react';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import VM from 'scratch-vm';

import vmListenerHOC from '../../../src/lib/vm-listener-hoc.jsx';

describe('VMListenerHOC', () => {
    const mockStore = configureStore();
    let store;
    let vm;

    beforeEach(() => {
        vm = new VM();
        store = mockStore({
            scratchGui: {
                mode: {},
                vm: vm
            }
        });
    });

    test('vm green flag event is bound to the passed in prop callback', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);
        const onGreenFlag = jest.fn();
        mount(
            <WrappedComponent
                store={store}
                vm={vm}
                onGreenFlag={onGreenFlag}
            />
        );
        expect(onGreenFlag).not.toHaveBeenCalled();
        vm.emit('PROJECT_START');
        expect(onGreenFlag).toHaveBeenCalled();
    });

    test('onGreenFlag is not passed to the children', () => {
        const Component = () => (<div />);
        const WrappedComponent = vmListenerHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                store={store}
                vm={vm}
                onGreenFlag={jest.fn()}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().onGreenFlag).toBeUndefined();
    });
});
