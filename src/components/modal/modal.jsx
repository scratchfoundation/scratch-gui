const React = require('react');
const ReactModal = require('react-modal');

const Box = require('../box/box.jsx');
const CloseButton = require('../close-button/close-button.jsx');

const styles = require('./modal.css');

class ModalComponent extends React.Component {
    render () {
        return (
            <ReactModal
                className={styles.modalContent}
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
                    className={styles.modalChildren}
                    direction="column"
                >
                    {this.props.children}
                </Box>
            </ReactModal>
        );
    }
}

ModalComponent.propTypes = {
    children: React.PropTypes.node,
    contentLabel: React.PropTypes.string.isRequired,
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool
};

module.exports = ModalComponent;
