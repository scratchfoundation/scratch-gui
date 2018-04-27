import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import PaintEditor from 'scratch-paint';

import analytics from '../lib/analytics';

import {connect} from 'react-redux';

class PaintEditorWrapper extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpdateImage',
            'handleUpdateName'
        ]);
    }
    componentDidMount () {
        analytics.pageview('/editors/paint');
    }
    handleUpdateName (name) {
        this.props.vm.renameCostume(this.props.selectedCostumeIndex, name);
    }
    handleUpdateImage (isVector, image, rotationCenterX, rotationCenterY) {
        if (isVector) {
            this.props.vm.updateSvg(
                // Divide by 2 because the VM's definition of the rotation center
                // is the paint editor's definition of the rotation center
                // divided by the bitmap resolution
                this.props.selectedCostumeIndex,
                image, rotationCenterX / 2,
                rotationCenterY / 2,
                2 /* bitmapResolution */);
        } else {
            this.props.vm.updateBitmap(
                this.props.selectedCostumeIndex,
                image,
                rotationCenterX / 2,
                rotationCenterY / 2,
                2 /* bitmapResolution */);
        }
    }
    render () {
        if (!this.props.imageId) return null;
        return (
            <PaintEditor
                {...this.props}
                image={this.props.vm.getCostume(this.props.selectedCostumeIndex)}
                onUpdateImage={this.handleUpdateImage}
                onUpdateName={this.handleUpdateName}
            />
        );
    }
}

PaintEditorWrapper.propTypes = {
    imageFormat: PropTypes.string.isRequired,
    imageId: PropTypes.string.isRequired,
    name: PropTypes.string,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    selectedCostumeIndex: PropTypes.number.isRequired,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = (state, {selectedCostumeIndex}) => {
    const {
        editingTarget,
        sprites,
        stage
    } = state.targets;
    const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
    const costume = target && target.costumes[selectedCostumeIndex];
    const resolution = costume &&
        (costume.dataFormat === 'png' && costume.dataFormat === 'jpg') ? costume.bitmapResolution / 2 : 1;
    return {
        name: costume && costume.name,
        rotationCenterX: costume && costume.rotationCenterX / resolution,
        rotationCenterY: costume && costume.rotationCenterY / resolution,
        imageFormat: costume.dataFormat,
        imageId: editingTarget && `${editingTarget}${costume.skinId}`,
        vm: state.vm
    };
};

export default connect(
    mapStateToProps
)(PaintEditorWrapper);
