import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';

import SpriteSelectorItemComponent from '../components/sprite-selector-item/sprite-selector-item.jsx';

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
            /* eslint-disable no-unused-vars */
            assetId,
            id,
            onClick,
            onDeleteButtonClick,
            /* eslint-enable no-unused-vars */
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

const mapStateToProps = (state, {assetId, costumeURL}) => ({
    costumeURL: costumeURL || (assetId && state.vm.runtime.storage.get(assetId).encodeDataURI())
});

module.exports = connect(
    mapStateToProps
)(SpriteSelectorItem);
