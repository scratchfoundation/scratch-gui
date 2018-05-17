import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import Loupe from '../loupe/loupe.jsx';
import MonitorList from '../../containers/monitor-list.jsx';
import Question from '../../containers/question.jsx';
import {getStageSize} from '../../lib/screen-utils.js';
import styles from './stage.css';

const StageComponent = props => {
    const {
        canvasRef,
        dragRef,
        height,
        isColorPicking,
        isFullScreen,
        width,
        colorInfo,
        onDeactivateColorPicker,
        question,
        onQuestionAnswered,
        useEditorDragStyle,
        ...boxProps
    } = props;

    const stageSize = getStageSize(isFullScreen, height, width);

    return (
        <div>
            <Box
                className={classNames({
                    [styles.stageWrapper]: !isFullScreen,
                    [styles.stageWrapperOverlay]: isFullScreen,
                    [styles.withColorPicker]: !isFullScreen && isColorPicking
                })}
            >
                <Box
                    className={classNames(
                        styles.stage,
                        {[styles.stageOverlayContent]: isFullScreen}
                    )}
                    componentRef={canvasRef}
                    element="canvas"
                    height={stageSize.height}
                    width={stageSize.width}
                    {...boxProps}
                />
                <Box className={styles.monitorWrapper}>
                    <MonitorList
                        draggable={useEditorDragStyle}
                        stageSize={stageSize}
                    />
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
                            style={{width: stageSize.width}}
                        >
                            <Question
                                question={question}
                                onQuestionAnswered={onQuestionAnswered}
                            />
                        </div>
                    </div>
                )}
                <canvas
                    className={styles.draggingSprite}
                    height={0}
                    ref={dragRef}
                    width={0}
                />
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
    dragRef: PropTypes.func,
    height: PropTypes.number,
    isColorPicking: PropTypes.bool,
    isFullScreen: PropTypes.bool.isRequired,
    onDeactivateColorPicker: PropTypes.func,
    onQuestionAnswered: PropTypes.func,
    question: PropTypes.string,
    useEditorDragStyle: PropTypes.bool,
    width: PropTypes.number
};
StageComponent.defaultProps = {
    canvasRef: () => {},
    dragRef: () => {},
    width: 480,
    height: 360
};
export default StageComponent;
