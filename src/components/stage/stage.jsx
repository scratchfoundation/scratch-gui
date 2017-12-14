import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import Loupe from '../loupe/loupe.jsx';
import MonitorList from '../../containers/monitor-list.jsx';
import Question from '../../containers/question.jsx';
import styles from './stage.css';

const StageComponent = props => {
    const {
        canvasRef,
        height,
        isColorPicking,
        isZoomed,
        width,
        colorInfo,
        onDeactivateColorPicker,
        question,
        onQuestionAnswered,
        ...boxProps
    } = props;

    let heightCorrectedAspect = height;
    let widthCorrectedAspect = width;
    const spacingBorderAdjustment = 9;
    const stageMenuHeightAdjustment = 40;
    if (isZoomed) {
        heightCorrectedAspect = window.innerHeight - stageMenuHeightAdjustment - spacingBorderAdjustment;
        widthCorrectedAspect = heightCorrectedAspect + (heightCorrectedAspect / 3);
        if (widthCorrectedAspect > window.innerWidth) {
            widthCorrectedAspect = window.innerWidth;
            heightCorrectedAspect = widthCorrectedAspect * .75;
        }
    }
    return (
        <div>
            <Box
                className={classNames({
                    [styles.stageWrapper]: !isZoomed,
                    [styles.stageWrapperOverlay]: isZoomed,
                    [styles.withColorPicker]: !isZoomed && isColorPicking
                })}
            >
                <Box
                    className={classNames(
                        styles.stage,
                        {[styles.stageOverlayContent]: isZoomed}
                    )}
                    componentRef={canvasRef}
                    element="canvas"
                    height={heightCorrectedAspect}
                    width={widthCorrectedAspect}
                    {...boxProps}
                />
                <Box className={styles.monitorWrapper}>
                    <MonitorList />
                </Box>
                {isColorPicking && colorInfo ? (
                    <Box className={styles.colorPickerWrapper}>
                        <Loupe colorInfo={colorInfo} />
                    </Box>
                ) : null}
                {question === null ? null : (
                    <div
                        className={classNames(
                            styles.stageOverlayContent,
                            styles.stageOverlayContentBorderOverride
                        )}
                    >
                        <div
                            className={styles.questionWrapper}
                            style={{width: widthCorrectedAspect}}
                        >
                            <Question
                                question={question}
                                onQuestionAnswered={onQuestionAnswered}
                            />
                        </div>
                    </div>
                )}
            </Box>
            {isColorPicking ? (
                <Box
                    className={styles.colorPickerBackground}
                    onClick={onDeactivateColorPicker}
                />
            ) : null}
        </div>
    );
};
StageComponent.propTypes = {
    canvasRef: PropTypes.func,
    colorInfo: Loupe.propTypes.colorInfo,
    height: PropTypes.number,
    isColorPicking: PropTypes.bool,
    isZoomed: PropTypes.bool.isRequired,
    onDeactivateColorPicker: PropTypes.func,
    onQuestionAnswered: PropTypes.func,
    question: PropTypes.string,
    width: PropTypes.number
};
StageComponent.defaultProps = {
    canvasRef: () => {},
    width: 480,
    height: 360
};
export default StageComponent;
