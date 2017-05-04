const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const {connect} = require('react-redux');

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
    assetId: PropTypes.string,
    costumeURL: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    selected: PropTypes.bool
};

const mapStateToProps = (state, {assetId}) => ({
    costumeURL: assetId && state.vm.runtime.storage.get(assetId).encodeDataURI()
});

module.exports = connect(
    mapStateToProps
)(SpriteSelectorItem);
