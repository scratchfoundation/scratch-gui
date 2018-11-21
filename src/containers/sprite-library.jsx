import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl';
import VM from 'scratch-vm';

import analytics from '../lib/analytics';
import spriteLibraryContent from '../lib/libraries/sprites.json';
import spriteTags from '../lib/libraries/sprite-tags';

import LibraryComponent from '../components/library/library.jsx';

const messages = defineMessages({
    libraryTitle: {
        defaultMessage: 'Choose a Sprite',
        description: 'Heading for the sprite library',
        id: 'gui.spriteLibrary.chooseASprite'
    }
});

class SpriteLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'handleMouseEnter',
            'handleMouseLeave',
            'rotateCostume',
            'startRotatingCostumes',
            'stopRotatingCostumes'
        ]);
        this.state = {
            activeSprite: null,
            costumeIndex: 0,
            sprites: spriteLibraryContent
        };
    }
    componentWillUnmount () {
        clearInterval(this.intervalId);
    }
    handleItemSelect (item) {
        this.props.vm.addSprite(JSON.stringify(item.json)).then(() => {
            this.props.onActivateBlocksTab();
        });
        analytics.event({
            category: 'library',
            action: 'Select Sprite',
            label: item.name
        });
    }
    handleMouseEnter (item) {
        this.stopRotatingCostumes();
        this.setState({activeSprite: item}, this.startRotatingCostumes);
    }
    handleMouseLeave () {
        this.stopRotatingCostumes();
    }
    startRotatingCostumes () {
        if (!this.state.activeSprite) return;
        this.rotateCostume();
        this.intervalId = setInterval(this.rotateCostume, 300);
    }
    stopRotatingCostumes () {
        this.intervalId = clearInterval(this.intervalId);
    }
    rotateCostume () {
        const costumes = this.state.activeSprite.json.costumes;
        const nextCostumeIndex = (this.state.costumeIndex + 1) % costumes.length;
        this.setState({
            costumeIndex: nextCostumeIndex,
            sprites: this.state.sprites.map(sprite => {
                if (sprite.name === this.state.activeSprite.name) {
                    return {
                        ...sprite,
                        md5: sprite.json.costumes[nextCostumeIndex].baseLayerMD5
                    };
                }
                return sprite;
            })
        });
    }
    render () {
        return (
            <LibraryComponent
                data={this.state.sprites}
                id="spriteLibrary"
                tags={spriteTags}
                title={this.props.intl.formatMessage(messages.libraryTitle)}
                onItemMouseEnter={this.handleMouseEnter}
                onItemMouseLeave={this.handleMouseLeave}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SpriteLibrary.propTypes = {
    intl: intlShape.isRequired,
    onActivateBlocksTab: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(SpriteLibrary);
