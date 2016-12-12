const bindAll = require('lodash.bindall');
const React = require('react');

const SpriteSelectorItemComponent = require('../components/sprite-selector-item/sprite-selector-item.jsx');

class SpriteSelectorItem extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        this.props.onClick(this.props.id);
    }
    render () {
        const {
            id, // eslint-disable-line no-unused-vars
            onClick, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <SpriteSelectorItemComponent
                onClick={this.handleClick}
                {...props}
            />
        );
    }
}

SpriteSelectorItem.propTypes = {
    costumeURL: React.PropTypes.string,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool
};

module.exports = SpriteSelectorItem;
