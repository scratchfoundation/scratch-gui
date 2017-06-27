const PropTypes = require('prop-types');
const React = require('react');
const bindAll = require('lodash.bindall');

const VM = require('scratch-vm');

const AssetPanel = require('../components/asset-panel/asset-panel.jsx');
const addCostumeIcon = require('../components/asset-panel/icon--add-costume-lib.svg');

const {connect} = require('react-redux');

const {
    openCostumeLibrary,
    openBackdropLibrary
} = require('../reducers/modals');

class CostumeTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectCostume',
            'handleDeleteCostume'
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
        this.setState({selectedCostumeIndex: costumeIndex});
    }

    handleDeleteCostume (costumeIndex) {
        this.props.vm.deleteCostume(costumeIndex);
    }

    render () {
        const {
            editingTarget,
            sprites,
            stage,
            onNewCostumeClick,
            onNewBackdropClick
        } = this.props;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;

        if (!target) {
            return null;
        }

        const addText = target.isStage ? 'Add Backdrop' : 'Add Costume';
        const addFunc = target.isStage ? onNewBackdropClick : onNewCostumeClick;

        return (
            <AssetPanel
                buttons={[{
                    text: addText,
                    img: addCostumeIcon,
                    onClick: addFunc
                }]}
                items={target.costumes || []}
                newText={addText}
                selectedItemIndex={this.state.selectedCostumeIndex}
                onDeleteClick={this.handleDeleteCostume}
                onItemClick={this.handleSelectCostume}
            />
        );
    }
}

CostumeTab.propTypes = {
    editingTarget: PropTypes.string,
    onNewBackdropClick: PropTypes.func.isRequired,
    onNewCostumeClick: PropTypes.func.isRequired,
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
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(CostumeTab);
