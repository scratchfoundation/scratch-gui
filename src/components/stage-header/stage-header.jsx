import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import Box from '../box/box.jsx';
import Controls from '../../containers/controls.jsx';

import zoomIcon from './icon--zoom.svg';
import unzoomIcon from './icon--unzoom.svg';
import styles from './stage-header.css';

const StageHeaderComponent = function (props) {
    const {
	isZoomed,
        onZoom,
	onUnzoom,
	width,
	height,
	vm,
        className,
        title,
	titleZoomIcon,
        ...componentProps
    } = props;
    return isZoomed === false ? (
        <Box className={styles.stageHeaderWrapper}>
            <Box
	        className={styles.stageMenuWrapper}
	        height={height}
                width={width}
	    >
                <Controls vm={vm} />
	        <img
                    className={classNames(
                        className,
                        styles.stageZoomIcon
                    )}
                    src={zoomIcon}
                    title={titleZoomIcon}
                    onClick={onZoom}
                    {...componentProps}
                />
            </Box>
        </Box>
    ) : (
        <Box className={styles.stageHeaderWrapperOverlay}>
            <Box 
	        className={styles.stageMenuWrapper}
	        height={"100%"}
                width={"100%"}
	    >
                <Controls vm={vm} />
                <img
                    className={classNames(
                        className,
                        styles.stageZoomIcon
                    )}
                    src={unzoomIcon}
                    title={titleZoomIcon}
                    onClick={onUnzoom}
                    {...componentProps}
                />
            </Box>
        </Box>
    );
};
StageHeaderComponent.propTypes = {
    isZoomed: PropTypes.bool.isRequired,
    onZoom: PropTypes.func.isRequired,
    onUnzoom: PropTypes.func.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    className: PropTypes.string,
    title: PropTypes.string,
    titleZoomIcon: PropTypes.string
};
StageHeaderComponent.defaultProps = {
    width: 480,
    height: 360,
    title: 'Stage Header',
    titleZoomIcon: 'Zoom Control'
};
export default StageHeaderComponent;
