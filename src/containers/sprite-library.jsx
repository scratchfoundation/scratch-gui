import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import spriteLibraryContent from '../lib/libraries/sprites.json';

import LibraryComponent from '../components/library/library.jsx';

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
    componentWillReceiveProps (newProps) {
        if (!newProps.visible) clearInterval(this.intervalId);
    }
    handleItemSelect (item) {
        this.props.vm.addSprite2(JSON.stringify(item.json));
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
                title="Sprite Library"
                visible={this.props.visible}
                onItemMouseEnter={this.handleMouseEnter}
                onItemMouseLeave={this.handleMouseLeave}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SpriteLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default SpriteLibrary;
