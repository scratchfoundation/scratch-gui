const PropTypes = require('prop-types');
const React = require('react');
const ReactModal = require('react-modal');

const Box = require('../box/box.jsx');
const CloseButton = require('../close-button/close-button.jsx');

const styles = require('./modal.css');

class ModalComponent extends React.Component {
    render () {
        return (
            <ReactModal
                className={styles.fullModalContent}
                contentLabel={this.props.contentLabel}
                isOpen={this.props.visible}
                overlayClassName={styles.modalOverlay}
                ref={m => (this.modal = m)}
                onRequestClose={this.props.onRequestClose}
            >
                <CloseButton
                    className={styles.closeButton}
                    onClick={this.props.onRequestClose}
                />
                <Box
                    className={styles.fullModalChildren}
                    direction="column"
                >
                    {this.props.children}
                </Box>
            </ReactModal>
        );
    }
}

ModalComponent.propTypes = {
    children: PropTypes.node,
    contentLabel: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
};

module.exports = ModalComponent;
