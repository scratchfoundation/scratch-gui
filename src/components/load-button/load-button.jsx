import PropTypes from 'prop-types';
import React from 'react';

import ButtonComponent from '../button/button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';

import styles from './load-button.css';

const LoadButtonComponent = ({
    inputRef,
    onChange,
    onClick,
    title,
    ...props
}) => (
    <span {...props}>
        <ComingSoonTooltip
            place="bottom"
            tooltipId="load-button"
        >
            <ButtonComponent
                disabled
                onClick={onClick}
            >
                {title}
            </ButtonComponent>
            <input
                disabled
                accept=".sb2,.sb3"
                className={styles.fileInput}
                ref={inputRef}
                type="file"
                onChange={onChange}
            />
        </ComingSoonTooltip>
    </span>
);

LoadButtonComponent.propTypes = {
    className: PropTypes.string,
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};
LoadButtonComponent.defaultProps = {
    title: 'Load'
};
export default LoadButtonComponent;
