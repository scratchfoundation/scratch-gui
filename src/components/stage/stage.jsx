import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import 'aframe';
import 'arjs';
import {Sphere, Cylinder, Plane, Sky, Text, Scene} from 'react-aframe-ar';

import Box from '../box/box.jsx';
import DOMElementRenderer from '../../containers/dom-element-renderer.jsx';
import Loupe from '../loupe/loupe.jsx';
import MonitorList from '../../containers/monitor-list.jsx';
import TargetHighlight from '../../containers/target-highlight.jsx';
import Question from '../../containers/question.jsx';
import MicIndicator from '../mic-indicator/mic-indicator.jsx';
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
        micIndicator,
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
                {true ? (
                    <Scene
                        embedded
                    >
                        <Box
                            shadow
                            color="#4CC3D9"
                            position="-1 0.5 -3"
                            rotation="0 45 0"
                        />
                        <Sphere
                            shadow
                            color="#EF2D5E"
                            position="0 1.25 -5"
                            radius="1.25"
                        />
                        <Cylinder
                            shadow
                            color="#FFC65D"
                            height="1.5"
                            position="1 0.75 -3"
                            radius="0.5"
                        />
                        <Plane
                            shadow
                            color="#7BC8A4"
                            height="4"
                            position="0 0 -4"
                            rotation="-90 0 0"
                            width="4"
                        />
                        <Sky
                            color="#ECECEC"
                        />
                        <Text
                            align="center"
                            color="#7BC8A4"
                            position="0 2.3 -1.5"
                            value="Hello world, react-aframe-ar!"
                        />
                    </Scene>
                ) : (
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
                )}
                <Box className={styles.monitorWrapper}>
                    <MonitorList
                        draggable={useEditorDragStyle}
                        stageSize={stageDimensions}
                    />
                </Box>
                <Box className={styles.frameWrapper}>
                    <TargetHighlight
                        className={styles.frame}
                        stageHeight={stageDimensions.height}
                        stageWidth={stageDimensions.width}
                    />
                </Box>
                {isColorPicking && colorInfo ? (
                    <Box className={styles.colorPickerWrapper}>
                        <Loupe colorInfo={colorInfo} />
                    </Box>
                ) : null}
                <div
                    className={styles.stageBottomWrapper}
                    style={{
                        width: stageDimensions.width,
                        height: stageDimensions.height,
                        left: '50%',
                        marginLeft: stageDimensions.width * -0.5
                    }}
                >
                    {micIndicator ? (
                        <MicIndicator
                            className={styles.micIndicator}
                            stageSize={stageDimensions}
                        />
                    ) : null}
                    {question === null ? null : (
                        <div
                            className={styles.questionWrapper}
                            style={{width: stageDimensions.width}}
                        >
                            <Question
                                question={question}
                                onQuestionAnswered={onQuestionAnswered}
                            />
                        </div>
                    )}
                </div>
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
    micIndicator: PropTypes.bool,
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
