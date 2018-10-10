import bindAll from 'lodash.bindall';
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

        if (this.decodedAssetId === this.props.assetId) {
            return this.cachedUrl;
        }

        this.decodedAssetId = this.props.assetId;
        this.cachedUrl = getCostumeUrl(this.props.assetId, this.props.vm);

        return this.cachedUrl;
    }

    render () {
        const {
            /* eslint-disable no-unused-vars */
            assetId,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return (
            <WatermarkComponent
                costumeURL={this.getCostumeData()}
                {...props}
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

const mapDispatchToProps = () => ({});

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Watermark);

export default ConnectedComponent;
