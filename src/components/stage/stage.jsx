/* const script3 = document.createElement('script');
script3.src = 'https://cdn.rawgit.com/mrdoob/three.js/dev/build/three.js';
document.head.appendChild(script3);

const script = document.createElement('script');
script.src = 'https://aframe.io/releases/0.6.1/aframe.min.js';
document.head.appendChild(script);

const script2 = document.createElement('script');
script2.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js';
document.head.appendChild(script2); */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import 'three';
import 'aframe';

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
        costume1URL,
        costume2URL,
        micIndicator,
        question,
        stageSize,
        stageURL,
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
                    // 09dc888b0b7df19f70d81588ae73420e
                    <a-scene embedded>
                        <a-box
                            color="#4CC3D9"
                            position="-1 0.5 -3"
                            rotation="0 45 0"
                        />
                        <a-sphere
                            color="#EF2D5E"
                            position="0 1.25 -5"
                            radius="1.25"
                        />
                        <a-cylinder
                            color="#FFC65D"
                            height="1.5"
                            position="1 0.75 -3"
                            radius="0.5"
                        />
                        <a-image
                            position="2.5 0.5 -3"
                            src={costume1URL}
                        />
                        <a-plane
                            color="#7BC8A4"
                            height="10"
                            position="1 0 -3"
                            rotation="-90 0 0"
                            width="10"
                        />
                        <a-sky color="#ECECEC" />
                    </a-scene>
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
    costume1URL: PropTypes.string,
    costume2URL: PropTypes.string,
    dragRef: PropTypes.func,
    isColorPicking: PropTypes.bool,
    isFullScreen: PropTypes.bool.isRequired,
    micIndicator: PropTypes.bool,
    onDeactivateColorPicker: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onQuestionAnswered: PropTypes.func,
    question: PropTypes.string,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    stageURL: PropTypes.string,
    useEditorDragStyle: PropTypes.bool
};
StageComponent.defaultProps = {
    dragRef: () => {}
};
export default StageComponent;
