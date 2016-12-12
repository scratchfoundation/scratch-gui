const bindAll = require('lodash.bindall');
const React = require('react');

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
    id: React.PropTypes.string,
    onSelect: React.PropTypes.func
};
module.exports = StageSelector;
