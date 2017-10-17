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
            'handleUpdateSvg'
        ]);
    }
    shouldComponentUpdate (nextProps) {
        // Only update on sprite change or costume change. No need to push the SVG to the paint
        // editor that it just exported; it causes the paint editor to lose some state.
        const {
            editingTarget,
            sprites,
            stage
        } = nextProps;
        const nextTarget = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
        const currentTarget =
            this.props.editingTarget && this.props.sprites[this.props.editingTarget] ?
                this.props.sprites[this.props.editingTarget] :
                this.props.stage;

        if (this.props.editingTarget !== editingTarget ||
                currentTarget.currentCostume !== nextTarget.currentCostume) {
            return true;
        }
        return false;
    }
    handleUpdateSvg (svg, rotationCenterX, rotationCenterY) {
        this.props.vm.updateSvg(this.props.selectedCostumeIndex, svg, rotationCenterX, rotationCenterY);
    }
    render () {
        const {
            editingTarget,
            sprites,
            stage
        } = this.props;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;

        if (!target || !target.costumes) {
            return null;
        }

        return (
            <PaintEditor
                rotationCenterX={target.costumes[this.props.selectedCostumeIndex].rotationCenterX}
                rotationCenterY={target.costumes[this.props.selectedCostumeIndex].rotationCenterY}
                svg={this.props.vm.getCostumeSvg(this.props.selectedCostumeIndex)}
                onUpdateSvg={this.handleUpdateSvg}
            />
        );
    }
}

PaintEditorWrapper.propTypes = {
    editingTarget: PropTypes.string,
    selectedCostumeIndex: PropTypes.number.isRequired,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            costumes: PropTypes.arrayOf(PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string.isRequired
            }))
        })
    }),
    stage: PropTypes.shape({
        sounds: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    }),
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: state.targets.sprites,
    stage: state.targets.stage,
    costumeLibraryVisible: state.modals.costumeLibrary,
    backdropLibraryVisible: state.modals.backdropLibrary
});

export default connect(
    mapStateToProps
)(PaintEditorWrapper);
