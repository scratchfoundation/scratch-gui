import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {FormattedMessage} from 'react-intl';
import VM from 'scratch-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';
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

import addBlankCostumeIcon from '../components/asset-panel/icon--add-blank-costume.svg';
import addLibraryBackdropIcon from '../components/asset-panel/icon--add-backdrop-lib.svg';
import addLibraryCostumeIcon from '../components/asset-panel/icon--add-costume-lib.svg';
import costumeLibraryContent from '../lib/libraries/costumes.json';

const messages = {
    addLibraryBackdropMsg: (
        <FormattedMessage
            defaultMessage="Add Backdrop From Library"
            description="Button to add a backdrop in the editor tab"
            id="gui.costumeTab.addBackdrop"
        />
    ),
    addLibraryCostumeMsg: (
        <FormattedMessage
            defaultMessage="Add Costume From Library"
            description="Button to add a costume in the editor tab"
            id="gui.costumeTab.addCostume"
        />
    ),
    addBlankBackdropMsg: (
        <FormattedMessage
            defaultMessage="Add Blank Backdrop"
            description="Button to add a blank backdrop in the editor tab"
            id="gui.costumeTab.addBlankBackdrop"
        />
    ),
    addBlankCostumeMsg: (
        <FormattedMessage
            defaultMessage="Add Blank Costume"
            description="Button to add a blank costume in the editor tab"
            id="gui.costumeTab.addBlankCostume"
        />
    )
};

class CostumeTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectCostume',
            'handleDeleteCostume',
            'handleNewCostume',
            'handleNewBlankCostume'
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
    handleNewBlankCostume () {
        const emptyItem = costumeLibraryContent.find(item => (
            item.name === 'Empty'
        ));
        const name = this.props.vm.editingTarget.isStage ? `backdrop1` : `costume1`;
        const vmCostume = {
            name: name,
            rotationCenterX: emptyItem.info[0],
            rotationCenterY: emptyItem.info[1],
            bitmapResolution: emptyItem.info.length > 2 ? emptyItem.info[2] : 1,
            skinId: null
        };

        this.props.vm.addCostume(emptyItem.md5, vmCostume).then(() => {
            this.handleNewCostume();
        });
    }
    render () {
        // For paint wrapper
        const {
            onNewLibraryBackdropClick,
            onNewLibraryCostumeClick,
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

        const addLibraryMessage = target.isStage ? messages.addLibraryBackdropMsg : messages.addLibraryCostumeMsg;
        const addBlankMessage = target.isStage ? messages.addBlankBackdropMsg : messages.addBlankCostumeMsg;
        const addLibraryFunc = target.isStage ? onNewLibraryBackdropClick : onNewLibraryCostumeClick;
        const addLibraryIcon = target.isStage ? addLibraryBackdropIcon : addLibraryCostumeIcon;

        return (
            <AssetPanel
                buttons={[
                    {
                        message: addBlankMessage,
                        img: addBlankCostumeIcon,
                        onClick: this.handleNewBlankCostume
                    },
                    {
                        message: addLibraryMessage,
                        img: addLibraryIcon,
                        onClick: addLibraryFunc
                    }
                ]}
                items={target.costumes || []}
                selectedItemIndex={this.state.selectedCostumeIndex}
                onDeleteClick={target.costumes.length > 1 ? this.handleDeleteCostume : null}
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
    onNewLibraryBackdropClick: PropTypes.func.isRequired,
    onNewLibraryCostumeClick: PropTypes.func.isRequired,
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
    onNewLibraryBackdropClick: e => {
        e.preventDefault();
        dispatch(openBackdropLibrary());
    },
    onNewLibraryCostumeClick: e => {
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
