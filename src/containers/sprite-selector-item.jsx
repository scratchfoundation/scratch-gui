const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const styles = require('../components/sprite-selector/sprite-selector.css');

const {connect} = require('react-redux');

const SpriteSelectorItemComponent = require('../components/sprite-selector-item/sprite-selector-item.jsx');

const AssetDelete = require('./asset-delete.jsx');

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
    shouldComponentUpdate (nextProps, nextState) {
        return this.state.prompt !== nextState.prompt;
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
        function callback(props) {
            props.onDeleteButtonClick(props.id);
        }
        var message = "Are you sure you want to delete this?";
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
            <Box className={styles.itemsWrapper}>
                <SpriteSelectorItemComponent
                    onClick={this.handleClick}
                    onDeleteButtonClick={this.handleDelete}
                    {...props}
                />
                {this.state.prompt ? (
                    <AssetDelete
                        label={this.state.prompt.message}
                        title="Are you sure?"
                        onCancel={this.handlePromptClose}
                        onOk={this.handlePromptCallback}
                    />
                ) : null}
            </Box>
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
