/* eslint-env jest */
const React = require('react');
const {shallow} = require('enzyme');
const GreenFlag = require('../../src/containers/green-flag');
const renderer = require('react-test-renderer');
const VM = require('scratch-vm');

describe('GreenFlag', () => {
  let vm;
  beforeEach(() => {
    // TODO(bogusred): Ask scratch team their thoughts on mocking the VM.
    vm = new VM();
  });

  test('renders active state', () => {
    const component = renderer.create(
        <GreenFlag active={true} vm={vm}/>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('triggers onClick when active', () => {
    const onClick = jest.fn();
    const component = shallow(
        <GreenFlag active={true} onClick={onClick} vm={vm}/>
    );
    component.find('img').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
