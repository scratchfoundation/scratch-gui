/* eslint-env jest */
import React from 'react'; // eslint-disable-line no-unused-vars
import {mountWithIntl, componentWithIntl} from '../../helpers/intl-helpers';
import SoundEditor from '../../../src/components/sound-editor/sound-editor'; // eslint-disable-line no-unused-vars

describe('Sound Editor Component', () => {
    let props;
    beforeEach(() => {
        props = {
            chunkLevels: [1, 2, 3],
            name: 'sound name',
            playhead: 0.5,
            trimStart: 0.2,
            trimEnd: 0.8,
            onActivateTrim: jest.fn(),
            onChangeName: jest.fn(),
            onPlay: jest.fn(),
            onReverse: jest.fn(),
            onSofter: jest.fn(),
            onLouder: jest.fn(),
            onRobot: jest.fn(),
            onEcho: jest.fn(),
            onFaster: jest.fn(),
            onSlower: jest.fn(),
            onSetTrimEnd: jest.fn(),
            onSetTrimStart: jest.fn(),
            onStop: jest.fn()
        };
    });

    test('matches snapshot', () => {
        const component = componentWithIntl(<SoundEditor {...props} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('trim button appears when trims are null', () => {
        const wrapper = mountWithIntl(<SoundEditor {...props} trimStart={null} trimEnd={null} />);
        wrapper.find('button[title="Trim"]').simulate('click');
        expect(props.onActivateTrim).toHaveBeenCalled();
    });

    test('save button appears when trims are not null', () => {
        const wrapper = mountWithIntl(<SoundEditor {...props} trimStart={0.25} trimEnd={0.75} />);
        wrapper.find('button[title="Save"]').simulate('click');
        expect(props.onActivateTrim).toHaveBeenCalled();
    });

    test('play button appears when playhead is null', () => {
        const wrapper = mountWithIntl(<SoundEditor {...props} playhead={null} />);
        wrapper.find('button[title="Play"]').simulate('click');
        expect(props.onPlay).toHaveBeenCalled();
    });

    test('stop button appears when playhead is not null', () => {
        const wrapper = mountWithIntl(<SoundEditor {...props} playhead={0.5} />);
        wrapper.find('button[title="Stop"]').simulate('click');
        expect(props.onStop).toHaveBeenCalled();
    });

    test('submitting name calls the callback', () => {
        const wrapper = mountWithIntl(<SoundEditor {...props} />);
        wrapper.find('input')
            .simulate('change', {target: {value: 'hello'}})
            .simulate('blur');
        expect(props.onChangeName).toHaveBeenCalled();
    });
    test('effect buttons call the correct callbacks', () => {
        const wrapper = mountWithIntl(<SoundEditor {...props} />);

        wrapper.find('[children="Reverse"]').simulate('click');
        expect(props.onReverse).toHaveBeenCalled();

        wrapper.find('[children="Echo"]').simulate('click');
        expect(props.onEcho).toHaveBeenCalled();

        wrapper.find('[children="Robot"]').simulate('click');
        expect(props.onRobot).toHaveBeenCalled();

        wrapper.find('[children="Faster"]').simulate('click');
        expect(props.onFaster).toHaveBeenCalled();

        wrapper.find('[children="Slower"]').simulate('click');
        expect(props.onSlower).toHaveBeenCalled();

        wrapper.find('[children="Louder"]').simulate('click');
        expect(props.onLouder).toHaveBeenCalled();

        wrapper.find('[children="Softer"]').simulate('click');
        expect(props.onSofter).toHaveBeenCalled();
    });
});
