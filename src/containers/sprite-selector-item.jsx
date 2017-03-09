const bindAll = require('lodash.bindall');
const React = require('react');

const SpriteSelectorItemComponent = require('../components/sprite-selector-item/sprite-selector-item.jsx');

class SpriteSelectorItem extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleDelete'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        this.props.onClick(this.props.id);
    }
    handleDelete () {
        // eslint-disable-next-line no-alert
        if (window.confirm('Are you sure you want to delete this sprite?')) {
            this.props.onDeleteButtonClick(this.props.id);
        }
    }
    render () {
        const {
            id, // eslint-disable-line no-unused-vars
            onClick, // eslint-disable-line no-unused-vars
            onDeleteButtonClick, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <SpriteSelectorItemComponent
                onClick={this.handleClick}
                onDeleteButtonClick={this.handleDelete}
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
    onDeleteButtonClick: React.PropTypes.func,
    selected: React.PropTypes.bool
};

module.exports = SpriteSelectorItem;
