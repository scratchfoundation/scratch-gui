import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {setPlayer} from '../../reducers/mode';
import classNames from 'classnames';

import styles from './see-inside.css';

class SeeInside extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        const {
            onSeeInside,
            ...props
        } = this.props;
        return <button
            onClick={onSeeInside}
            {...props}
        >See inside</button>;
    }
}

SeeInside.propTypes = {
    onSeeInside: PropTypes.func,
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username
});

const mapDispatchToProps = dispatch => ({
    onSeeInside: () => dispatch(setPlayer(false))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SeeInside);
