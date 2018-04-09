import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {setHoveredSprite} from '../reducers/hovered-target';

import SpriteSelectorItemComponent from '../components/sprite-selector-item/sprite-selector-item.jsx';

class SpriteSelectorItem extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleDelete',
            'handleDuplicate',
            'handleMouseEnter',
            'handleMouseLeave'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        this.props.onClick(this.props.id);
    }
    handleDelete (e) {
        e.stopPropagation(); // To prevent from bubbling back to handleClick
        // @todo add i18n here
        // eslint-disable-next-line no-alert
        if (window.confirm('Are you sure you want to delete this?')) {
            this.props.onDeleteButtonClick(this.props.id);
        }
    }
    handleDuplicate (e) {
        e.stopPropagation(); // To prevent from bubbling back to handleClick
        this.props.onDuplicateButtonClick(this.props.id);
    }
    handleMouseLeave () {
        this.props.dispatchSetHoveredSprite(null);
    }
    handleMouseEnter () {
        this.props.dispatchSetHoveredSprite(this.props.id);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            assetId,
            id,
            onClick,
            onDeleteButtonClick,
            onDuplicateButtonClick,
            receivedBlocks,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return (
            <SpriteSelectorItemComponent
                onClick={this.handleClick}
                onDeleteButtonClick={onDeleteButtonClick ? this.handleDelete : null}
                onDuplicateButtonClick={onDuplicateButtonClick ? this.handleDuplicate : null}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                {...props}
            />
        );
    }
}

SpriteSelectorItem.propTypes = {
    assetId: PropTypes.string,
    costumeURL: PropTypes.string,
    dispatchSetHoveredSprite: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onDuplicateButtonClick: PropTypes.func,
    receivedBlocks: PropTypes.bool.isRequired,
    selected: PropTypes.bool
};

const mapStateToProps = (state, {assetId, costumeURL, id}) => ({
    costumeURL: costumeURL || (assetId && state.vm.runtime.storage.get(assetId).encodeDataURI()),
    receivedBlocks: state.hoveredTarget.receivedBlocks &&
            state.hoveredTarget.sprite === id
});
const mapDispatchToProps = dispatch => ({
    dispatchSetHoveredSprite: spriteId => {
        dispatch(setHoveredSprite(spriteId));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpriteSelectorItem);
