import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {setPlayer} from '../../reducers/mode';

import styles from './see-inside.css';

class SeeInside extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        const {
            onSeeInside,
        } = this.props;
        return <button
            onClick={onSeeInside}
            className={styles.seeInsideButton}
        >
            See inside
        </button>;
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
