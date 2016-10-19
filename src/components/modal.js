const React = require('react');
const ReactModal = require('react-modal');

class ModalComponent extends React.Component {
    render () {
        return (
            <ReactModal
                ref="modal"
                style={this.props.modalStyle}
                isOpen={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <div
                    onClick={this.props.onRequestClose}
                    style={this.props.closeButtonStyle}>x</div>
                {this.props.children}
            </ReactModal>
        );
    }
}

const modalStyle = {
    overlay: {
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, .75)'
    },
    content: {
        position: 'absolute',
        overflow: 'visible',
        borderRadius: '6px',
        padding: 0,
        top: '5%',
        bottom: '5%',
        left: '5%',
        right: '5%',
        background: '#fcfcfc'
    }
};

const closeButtonStyle = {
    color: 'rgb(255, 255, 255)',
    background: 'rgb(50, 50, 50)',
    borderRadius: '15px',
    width: '30px',
    height: '25px',
    textAlign: 'center',
    paddingTop: '5px',
    position: 'absolute',
    right: '3px',
    top: '3px',
    cursor: 'pointer'
};

ModalComponent.defaultProps = {
    modalStyle: modalStyle,
    closeButtonStyle: closeButtonStyle
};

ModalComponent.propTypes = {
    children: React.PropTypes.node,
    modalStyle: React.PropTypes.object,
    closeButtonStyle: React.PropTypes.object,
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool
};

module.exports = ModalComponent;
