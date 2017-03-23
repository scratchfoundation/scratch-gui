const React = require('react');
const bindAll = require('lodash.bindall');

const VM = require('scratch-vm');

const AssetPanel = require('../components/asset-panel/asset-panel.jsx');

const {connect} = require('react-redux');

const {
    openCostumeLibrary
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

    handleSelectCostume (costumeIndex) {
        this.setState({selectedCostumeIndex: costumeIndex});
    }

    handleDeleteCostume (costumeIndex) {
        // @todo the VM should handle all of this logic
        const {editingTarget} = this.props.vm;

        if (costumeIndex === editingTarget.currentCostume) {
            editingTarget.setCostume(costumeIndex - 1);
        }

        editingTarget.sprite.costumes = editingTarget.sprite.costumes
            .slice(0, costumeIndex)
            .concat(editingTarget.sprite.costumes.slice(costumeIndex + 1));
        this.props.vm.emitTargetsUpdate();
        // @todo not sure if this is getting redrawn correctly
        this.props.vm.runtime.requestRedraw();

        this.setState({
            selectedCostumeIndex: this.state.selectedCostumeIndex % editingTarget.sprite.costumes.length
        });
    }

    render () {
        const {
            vm,
            onNewCostumeClick
        } = this.props;

        const costumes = vm.editingTarget ? vm.editingTarget.sprite.costumes.map(costume => (
            {
                image: costume.skin,
                name: costume.name
            }
        )) : [];

        const addText = vm.editingTarget && vm.editingTarget.isStage ? 'Add Backdrop' : 'Add Costume';

        return (
            <AssetPanel
                items={costumes}
                newText={addText}
                selectedItemIndex={this.state.selectedCostumeIndex}
                onDeleteClick={this.handleDeleteCostume}
                onItemClick={this.handleSelectCostume}
                onNewClick={onNewCostumeClick}
            />
        );
    }
}

CostumeTab.propTypes = {
    ...AssetPanel.propTypes,
    vm: React.PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: state.targets.sprites,
    costumeLibraryVisible: state.modals.costumeLibrary
});

const mapDispatchToProps = dispatch => ({
    onNewCostumeClick: e => {
        e.preventDefault();
        dispatch(openCostumeLibrary());
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(CostumeTab);
