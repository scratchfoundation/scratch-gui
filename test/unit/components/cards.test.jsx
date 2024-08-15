import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';

// Mock this utility because it uses dynamic imports that do not work with jest
jest.mock('../../../src/lib/libraries/decks/translate-image.js', () => {});

import Cards, {ImageStep, VideoStep} from '../../../src/components/cards/cards.jsx';

describe('Cards component', () => {
    const defaultProps = () => ({
        activeDeckId: 'id1',
        content: {
            id1: {
                name: 'id1 - name',
                img: 'id1 - img',
                steps: [{video: 'videoUrl'}]
            }
        },
        dragging: false,
        expanded: true,
        isRtl: false,
        locale: 'en',
        onActivateDeckFactory: jest.fn(),
        onCloseCards: jest.fn(),
        onDrag: jest.fn(),
        onEndDrag: jest.fn(),
        onNextStep: jest.fn(),
        onPrevStep: jest.fn(),
        onShowAll: jest.fn(),
        onShrinkExpandCards: jest.fn(),
        onStartDrag: jest.fn(),
        showVideos: true,
        step: 0,
        x: 0,
        y: 0
    });

    test('showVideos=true shows the video step', () => {
        const component = mountWithIntl(
            <Cards
                {...defaultProps()}
                showVideos
            />
        );
        expect(component.find(ImageStep).exists()).toEqual(false);
        expect(component.find(VideoStep).exists()).toEqual(true);
    });

    test('showVideos=false shows the title image/name instead of video step', () => {
        const component = mountWithIntl(
            <Cards
                {...defaultProps()}
                showVideos={false}
            />
        );
        expect(component.find(VideoStep).exists()).toEqual(false);

        const imageStep = component.find(ImageStep);
        expect(imageStep.props().image).toEqual('id1 - img');
        expect(imageStep.props().title).toEqual('id1 - name');
    });
});
