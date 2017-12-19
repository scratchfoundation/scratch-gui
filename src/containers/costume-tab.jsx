import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {FormattedMessage} from 'react-intl';
import VM from 'scratch-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';
import addCostumeIcon from '../components/asset-panel/icon--add-costume-lib.svg';
import PaintEditorWrapper from './paint-editor-wrapper.jsx';
import CostumeLibrary from './costume-library.jsx';
import BackdropLibrary from './backdrop-library.jsx';
import {connect} from 'react-redux';

import {
    closeCostumeLibrary,
    closeBackdropLibrary,
    openCostumeLibrary,
    openBackdropLibrary
} from '../reducers/modals';

class CostumeTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectCostume',
            'handleDeleteCostume',
            'handleNewCostume'
        ]);
        this.state = {selectedCostumeIndex: 0};
    }

    componentWillReceiveProps (nextProps) {
        const {
            editingTarget,
            sprites,
            stage
        } = nextProps;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
        if (target && target.costumes && this.state.selectedCostumeIndex > target.costumes.length - 1) {
            this.setState({selectedCostumeIndex: target.costumes.length - 1});
        }
    }

    handleSelectCostume (costumeIndex) {
        this.props.vm.editingTarget.setCostume(costumeIndex);
        this.setState({selectedCostumeIndex: costumeIndex});
    }

    handleDeleteCostume (costumeIndex) {
        this.props.vm.deleteCostume(costumeIndex);
    }

    handleNewCostume () {
        if (!this.props.vm.editingTarget) return;
        const costumes = this.props.vm.editingTarget.sprite.costumes || [];
        this.setState({selectedCostumeIndex: Math.max(costumes.length - 1, 0)});
    }

    render () {
        // For paint wrapper
        const {
            onNewBackdropClick,
            onNewCostumeClick,
            costumeLibraryVisible,
            backdropLibraryVisible,
            onRequestCloseCostumeLibrary,
            onRequestCloseBackdropLibrary,
            ...props
        } = this.props;

        const {
            editingTarget,
            sprites,
            stage,
            vm
        } = props;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;

        if (!target) {
            return null;
        }

        const addBackdropMsg = (
            <FormattedMessage
                defaultMessage="Add Backdrop"
                description="Button to add a backdrop in the editor tab"
                id="gui.costumeTab.addBackdrop"
            />
        );
        const addCostumeMsg = (
            <FormattedMessage
                defaultMessage="Add Costume"
                description="Button to add a costume in the editor tab"
                id="gui.costumeTab.addCostume"
            />
        );

        const addMessage = target.isStage ? addBackdropMsg : addCostumeMsg;
        const addFunc = target.isStage ? onNewBackdropClick : onNewCostumeClick;

        return (
            <AssetPanel
                buttons={[{
                    message: addMessage,
                    img: addCostumeIcon,
                    onClick: addFunc
                }]}
                items={target.costumes || []}
                selectedItemIndex={this.state.selectedCostumeIndex}
                onDeleteClick={this.handleDeleteCostume}
                onItemClick={this.handleSelectCostume}
            >
                {target.costumes ?
                    <PaintEditorWrapper
                        {...props}
                        selectedCostumeIndex={this.state.selectedCostumeIndex}
                    /> :
                    null
                }
                {costumeLibraryVisible ? (
                    <CostumeLibrary
                        vm={vm}
                        onNewCostume={this.handleNewCostume}
                        onRequestClose={onRequestCloseCostumeLibrary}
                    />
                ) : null}
                {backdropLibraryVisible ? (
                    <BackdropLibrary
                        vm={vm}
                        onNewBackdrop={this.handleNewCostume}
                        onRequestClose={onRequestCloseBackdropLibrary}
                    />
                ) : null}
            </AssetPanel>
        );
    }
}

CostumeTab.propTypes = {
    backdropLibraryVisible: PropTypes.bool,
    costumeLibraryVisible: PropTypes.bool,
    editingTarget: PropTypes.string,
    onNewBackdropClick: PropTypes.func.isRequired,
    onNewCostumeClick: PropTypes.func.isRequired,
    onRequestCloseBackdropLibrary: PropTypes.func.isRequired,
    onRequestCloseCostumeLibrary: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => ({
    onNewBackdropClick: e => {
        e.preventDefault();
        dispatch(openBackdropLibrary());
    },
    onNewCostumeClick: e => {
        e.preventDefault();
        dispatch(openCostumeLibrary());
    },
    onRequestCloseBackdropLibrary: () => {
        dispatch(closeBackdropLibrary());
    },
    onRequestCloseCostumeLibrary: () => {
        dispatch(closeCostumeLibrary());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CostumeTab);
