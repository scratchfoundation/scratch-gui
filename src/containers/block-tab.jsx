import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import {openExtensionLibrary} from '../reducers/modals.js';
import Box from '../components/box/box.jsx';
import Blocks from '../components/blocks/blocks.jsx';
import IconButton from '../components/icon-button/icon-button.jsx';
import styles from '../components/gui/gui.css';
import addExtensionIcon from '../components/gui/icon--extensions.svg';

class BlockTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectSound',
            'handleDeleteSound',
            'handleNewSound'
        ]);
        this.state = {selectedBlockIndex: 0};
    }

    render () {
        const {
            basePath,
            vm,
            enableExtensions,
            onExtensionButtonClick,
            ...componentProps
        } = this.props;

        const addExtensionMessage = (
            <FormattedMessage
                defaultMessage="Extensions"
                description="Button to add an extension in the target pane"
                id="gui.gui.addExtension"
            />
        );

        return (
            <Box {...componentProps}>
                <Box className={styles.blocksWrapper}>
                    <Blocks
                        grow={1}
                        isVisible={this.state.selectedBlockIndex === 0}
                        options={{
                            media: `${basePath}static/blocks-media/`
                        }}
                        vm={vm}
                    />
                </Box>
                <Box className={styles.extensionButtonContainer}>
                    <IconButton
                        className={classNames(styles.extensionButton, {
                            [styles.hidden]: !enableExtensions
                        })}
                        img={addExtensionIcon}
                        title={addExtensionMessage}
                        onClick={onExtensionButtonClick}
                    />
                </Box>
            </Box>
        );
    }
}

BlockTab.PropTypes = {
    basePath: PropTypes.string,
    enableExtensions: PropTypes.bool,
    onExtensionButtonClick: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    basePath: state.targets.basePath,
    enableExtensions: state.enableExtensions
});

const mapDispatchToProps = dispatch => ({
    onExtensionButtonClick: e => {
        e.preventDefault();
        dispatch(openExtensionLibrary());
    }
});

BlockTab.defaultProps = {
    basePath: './'
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockTab);
