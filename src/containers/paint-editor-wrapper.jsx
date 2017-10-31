import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';

import PaintEditor from 'scratch-paint';

import {connect} from 'react-redux';

class PaintEditorWrapper extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpdateName',
            'handleUpdateSvg'
        ]);
    }
    handleUpdateName (name) {
        this.props.vm.renameCostume(this.props.selectedCostumeIndex, name);
    }
    handleUpdateSvg (svg, rotationCenterX, rotationCenterY) {
        this.props.vm.updateSvg(this.props.selectedCostumeIndex, svg, rotationCenterX, rotationCenterY);
    }
    render () {
        if (!this.props.svgId) return null;
        return (
            <PaintEditor
                {...this.props}
                svg={this.props.vm.getCostumeSvg(this.props.selectedCostumeIndex)}
                onUpdateName={this.handleUpdateName}
                onUpdateSvg={this.handleUpdateSvg}
            />
        );
    }
}

PaintEditorWrapper.propTypes = {
    name: PropTypes.string,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    selectedCostumeIndex: PropTypes.number.isRequired,
    svgId: PropTypes.string,
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
    return {
        name: costume && costume.name,
        rotationCenterX: costume && costume.rotationCenterX,
        rotationCenterY: costume && costume.rotationCenterY,
        svgId: editingTarget && `${editingTarget}${costume.skinId}`
    };
};

export default connect(
    mapStateToProps
)(PaintEditorWrapper);
