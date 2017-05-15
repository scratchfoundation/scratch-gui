const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const {connect} = require('react-redux');

const StageSelectorComponent = require('../components/stage-selector/stage-selector.jsx');

class StageSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        this.props.onSelect(this.props.id);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            assetId,
            id,
            onSelect,
            /* eslint-enable no-unused-vars */
            ...componentProps
        } = this.props;
        return (
            <StageSelectorComponent
                onClick={this.handleClick}
                {...componentProps}
            />
        );
    }
}
StageSelector.propTypes = {
    ...StageSelectorComponent.propTypes,
    id: PropTypes.string,
    onSelect: PropTypes.func
};

const mapStateToProps = (state, {assetId}) => ({
    url: assetId && state.vm.runtime.storage.get(assetId).encodeDataURI()
});

module.exports = connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(StageSelector);
