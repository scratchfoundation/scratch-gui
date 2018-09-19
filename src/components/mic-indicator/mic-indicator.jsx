import React from 'react';
import PropTypes from 'prop-types';
import styles from './mic-indicator.css';
import micIcon from './mic-indicator.svg';

// @todo: this is duplicated from monitor-list.jsx, so that's not good
const stageSizeToTransform = ({width, height, widthDefault, heightDefault}) => {
    const scaleX = width / widthDefault;
    const scaleY = height / heightDefault;
    if (scaleX === 1 && scaleY === 1) {
        // Do not set a transform if the scale is 1 because
        // it messes up `position: fixed` elements like the context menu.
        return;
    }
    return {transform: `scale(${scaleX},${scaleY})`};
};

const MicIndicatorComponent = props => (
    <div
        className={props.className}
        style={stageSizeToTransform(props.stageSize)}
    >
        <img
            className={styles.micImg}
            src={micIcon}
        />
    </div>
);

MicIndicatorComponent.propTypes = {
    className: PropTypes.string,
    stageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        widthDefault: PropTypes.number,
        heightDefault: PropTypes.number
    }).isRequired
};

export default MicIndicatorComponent;
