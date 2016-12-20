const React = require('react');
const ReactModal = require('react-modal');

const Box = require('../box/box.jsx');

const styles = require('./modal.css');

class ModalComponent extends React.Component {
    render () {
        return (
            <ReactModal
                className={styles.modalContent}
                isOpen={this.props.visible}
                overlayClassName={styles.modalOverlay}
                ref={m => (this.modal = m)}
                onRequestClose={this.props.onRequestClose}
            >
                <div
                    className={styles.modalCloseButton}
                    onClick={this.props.onRequestClose}
                >
                    {'x'}
                </div>
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
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool
};

module.exports = ModalComponent;
