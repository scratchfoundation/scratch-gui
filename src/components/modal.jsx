const React = require('react');
const ReactModal = require('react-modal');
const stylePropType = require('react-style-proptype');

class ModalComponent extends React.Component {
    render () {
        return (
            <ReactModal
                isOpen={this.props.visible}
                ref={m => (this.modal = m)}
                style={this.props.modalStyle}
                onRequestClose={this.props.onRequestClose}
            >
                <div
                    style={this.props.closeButtonStyle}
                    onClick={this.props.onRequestClose}
                >
                    {'x'}
                </div>
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
    closeButtonStyle: stylePropType,
    modalStyle: React.PropTypes.shape({
        overlay: stylePropType, // eslint-disable-line react/no-unused-prop-types
        content: stylePropType // eslint-disable-line react/no-unused-prop-types
    }),
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool
};

module.exports = ModalComponent;
