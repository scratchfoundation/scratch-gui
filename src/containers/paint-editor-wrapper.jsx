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
            'handleUpdateName',
            'handleUpdateSvg'
        ]);
    }
    componentDidMount () {
        analytics.pageview('/editors/paint');
    }
    handleUpdateName (name) {
        this.props.vm.renameCostume(this.props.editingCostumeIndex, name);
    }
    handleUpdateSvg (svg, rotationCenterX, rotationCenterY) {
        this.props.vm.updateSvg(this.props.editingCostumeIndex, svg, rotationCenterX, rotationCenterY);
    }
    render () {
        const {
            editingCostumeIndex, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        if (!this.props.svgId) return null;
        return (
            <PaintEditor
                {...props}
                svg={this.props.vm.getCostumeSvg(this.props.editingCostumeIndex)}
                onUpdateName={this.handleUpdateName}
                onUpdateSvg={this.handleUpdateSvg}
            />
        );
    }
}

PaintEditorWrapper.propTypes = {
    editingCostumeIndex: PropTypes.number,
    name: PropTypes.string,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    svgId: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => {
    const {
        editingTarget,
        sprites,
        stage
    } = state.targets;
    const editingCostumeIndex = state.editingCostumeIndex;
    const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
    const costume = target && target.costumes[editingCostumeIndex];
    return {
        editingCostumeIndex: editingCostumeIndex,
        name: costume && costume.name,
        rotationCenterX: costume && costume.rotationCenterX,
        rotationCenterY: costume && costume.rotationCenterY,
        svgId: editingTarget && `${editingTarget}${costume.skinId}`,
        vm: state.vm
    };
};

export default connect(
    mapStateToProps
)(PaintEditorWrapper);
