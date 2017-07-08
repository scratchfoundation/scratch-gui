import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';

import SpriteSelectorItemComponent from '../components/sprite-selector-item/sprite-selector-item.jsx';

import AssetDelete from './asset-delete.jsx';

class SpriteSelectorItem extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleDelete',
            'handlePromptCallback',
            'handlePromptClose'
        ]);
        this.state = {prompt: null};
    }
    handlePromptCallback () {
        this.state.prompt.callback(this.props);
        this.handlePromptClose();
    }
    handlePromptClose () {
        this.setState({prompt: null});
    }
    handleClick (e) {
        e.preventDefault();
        this.props.onClick(this.props.id);
    }
    handleDelete () {
        const callback = function (props) {
            props.onDeleteButtonClick(props.id);
        };
        const message = `Are you sure you want to delete ${this.props.name}?`;
        this.setState({prompt: {callback, message}});
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
            <div>
                <SpriteSelectorItemComponent
                    onClick={this.handleClick}
                    onDeleteButtonClick={this.handleDelete}
                    {...props}
                />
                {this.state.prompt ? (
                    <AssetDelete
                        assetName={this.props.name}
                        assetURL={this.props.costumeURL}
                        label={this.state.prompt.message}
                        title="Are you sure?"
                        onCancel={this.handlePromptClose}
                        onOk={this.handlePromptCallback}
                    />
                ) : null}
            </div>
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
