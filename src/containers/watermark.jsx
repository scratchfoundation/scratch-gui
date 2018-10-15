import bindAll from 'lodash.bindall';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import VM from 'scratch-vm';
import getCostumeUrl from '../lib/get-costume-url';

import WatermarkComponent from '../components/watermark/watermark.jsx';

class Watermark extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getCostumeData'
        ]);
        // Asset ID of the current sprite's current costume
        this.decodedAssetId = null;
    }

    getCostumeData () {
        if (!this.props.assetId) return null;

        return getCostumeUrl(this.props.assetId, this.props.vm);
    }

    render () {
        const componentProps = omit(this.props, ['assetId', 'vm']);
        return (
            <WatermarkComponent
                costumeURL={this.getCostumeData()}
                {...componentProps}
            />
        );
    }
}

Watermark.propTypes = {
    assetId: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => {
    const targets = state.scratchGui.targets;
    const currentTargetId = targets.editingTarget;

    let assetId;
    if (currentTargetId) {
        if (targets.stage.id === currentTargetId) {
            assetId = targets.stage.costume.assetId;
        } else if (targets.sprites.hasOwnProperty(currentTargetId)) {
            const currentSprite = targets.sprites[currentTargetId];
            assetId = currentSprite.costume.assetId;
        }
    }

    return {
        vm: state.scratchGui.vm,
        assetId: assetId
    };
};

const ConnectedComponent = connect(
    mapStateToProps
)(Watermark);

export default ConnectedComponent;
