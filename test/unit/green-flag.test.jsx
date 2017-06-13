/* eslint-env jest */
const React = require('react');
const {shallow} = require('enzyme');
// const GreenFlag = require('../../src/components/green-flag/green-flag');
const GreenFlag = require('../../src/containers/green-flag');
const renderer = require('react-test-renderer');

describe('GreenFlag', () => {
  test('renders active state', () => {
    const component = renderer.create(
        <GreenFlag active={true}/>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('triggers onClick when active', () => {
    const onClick = jest.fn();
    const component = shallow(
        <GreenFlag active={true} onClick={onClick}/>
    );
    component.find('img').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
