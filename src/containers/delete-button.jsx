import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import DeleteButtonComponent from '../components/delete-button/delete-button.jsx';

class DeleteButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleKeyPress',
            'setRef'
        ]);
    }
    componentDidMount () {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    setRef (ref) {
        this.ref = ref;
    }
    handleKeyPress (event) {
        if (this.ref === event.currentTarget.activeElement && (event.key === 'Enter' || event.key === ' ')) {
            this.props.onClick(event);
            event.preventDefault();
        }
    }
    render () {
        return (
            <DeleteButtonComponent
                className={this.props.className}
                setRef={this.setRef}
                tabIndex={this.props.tabIndex}
                onClick={this.props.onClick}
            />
        );
    }
}

DeleteButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    tabIndex: PropTypes.number
};

DeleteButton.defaultProps = {
    tabIndex: 0
};

export default DeleteButton;
