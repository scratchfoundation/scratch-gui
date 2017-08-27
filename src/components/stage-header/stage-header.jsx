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
        className,
        height,
        isZoomed,
        onUnzoom,
        onZoom,
        titleZoomIcon,
        vm,
        width,
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
                height={'100%'}
                width={'100%'}
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
    className: PropTypes.string,
    height: PropTypes.number,
    isZoomed: PropTypes.bool.isRequired,
    onUnzoom: PropTypes.func.isRequired,
    onZoom: PropTypes.func.isRequired,
    titleZoomIcon: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired,
    width: PropTypes.number
};
StageHeaderComponent.defaultProps = {
    width: 480,
    height: 360,
    titleZoomIcon: 'Zoom Control'
};
export default StageHeaderComponent;
