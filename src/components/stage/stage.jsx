import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import DOMElementRenderer from '../../containers/dom-element-renderer.jsx';
import Loupe from '../loupe/loupe.jsx';
import MonitorList from '../../containers/monitor-list.jsx';
import Question from '../../containers/question.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants.js';
import {getStageDimensions} from '../../lib/screen-utils.js';
import styles from './stage.css';

const StageComponent = props => {
    const {
        canvas,
        dragRef,
        isColorPicking,
        isFullScreen,
        colorInfo,
        question,
        stageSize,
        useEditorDragStyle,
        onDeactivateColorPicker,
        onDoubleClick,
        onQuestionAnswered,
        ...boxProps
    } = props;

    const stageDimensions = getStageDimensions(stageSize, isFullScreen);

    return (
        <div>
            <Box
                className={classNames({
                    [styles.stageWrapper]: !isFullScreen,
                    [styles.stageWrapperOverlay]: isFullScreen,
                    [styles.withColorPicker]: !isFullScreen && isColorPicking
                })}
                style={{
                    minHeight: stageDimensions.height,
                    minWidth: stageDimensions.width
                }}
                onDoubleClick={onDoubleClick}
            >
                <DOMElementRenderer
                    className={classNames(
                        styles.stage,
                        {[styles.stageOverlayContent]: isFullScreen}
                    )}
                    domElement={canvas}
                    style={{
                        height: stageDimensions.height,
                        width: stageDimensions.width
                    }}
                    {...boxProps}
                />
                <Box className={styles.monitorWrapper}>
                    <MonitorList
                        draggable={useEditorDragStyle}
                        stageSize={stageDimensions}
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
                            style={{width: stageDimensions.width}}
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
    canvas: PropTypes.instanceOf(Element).isRequired,
    colorInfo: Loupe.propTypes.colorInfo,
    dragRef: PropTypes.func,
    isColorPicking: PropTypes.bool,
    isFullScreen: PropTypes.bool.isRequired,
    onDeactivateColorPicker: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onQuestionAnswered: PropTypes.func,
    question: PropTypes.string,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    useEditorDragStyle: PropTypes.bool
};
StageComponent.defaultProps = {
    dragRef: () => {}
};
export default StageComponent;
