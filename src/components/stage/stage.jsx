/* const script3 = document.createElement('script');
script3.src = 'https://cdn.rawgit.com/mrdoob/three.js/dev/build/three.js';
document.head.appendChild(script3);

const script = document.createElement('script');
script.src = 'https://aframe.io/releases/0.8.2/aframe.js';
document.head.appendChild(script);

const script2 = document.createElement('script');
// script2.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js';
script2.src = 'https://cdn.jsdelivr.net/gh/RSpace/AR.js/aframe/build/aframe-ar.js';
document.head.appendChild(script2); */


// import 'aframe';
// import 'ar.js/aframe/build/aframe-ar.js';
// import 'node-ar.js';
// import {Sphere, Cylinder, Plane, Sky, Text, Scene} from 'react-aframe-ar';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import DOMElementRenderer from '../../containers/dom-element-renderer.jsx';
import Loupe from '../loupe/loupe.jsx';
import MonitorList from '../../containers/monitor-list.jsx';
import TargetHighlight from '../../containers/target-highlight.jsx';
import Question from '../../containers/question.jsx';
import MicIndicator from '../mic-indicator/mic-indicator.jsx';
import StageAFrameSprites from './stage-aframe-sprites.jsx';
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
        sprites,
        stageSize,
        stageURL,
        useEditorDragStyle,
        onDeactivateColorPicker,
        onDoubleClick,
        onQuestionAnswered,
        ...boxProps
    } = props;

    const stageDimensions = getStageDimensions(stageSize, isFullScreen);

    // *************************************************************************

    const timeoutID = setTimeout(() => {
        console.log('testing');
        console.log(window.frames['output']);
        console.log('stageURL passed to createARFrame:');
        console.log(stageURL);
        console.log('spritesList passed to createARFrame:');
        console.log(sprites);
        clearTimeout(timeoutID);
        let sprites_string = '';
        sprites.forEach(function (sprite, index) {
            if (sprite.visible) {
                sprites_string = sprites_string + '<a-image height="'+sprite.height / 100+'" material="alphaTest: 0.5" position="'+sprite.x / 100 + ' ' + ((sprite.y + 180) / 100)  + ' ' + (-0.3 * index)+'" src="'+sprite.url+'" width="'+sprite.width / 100+'"></a-image>';
            }
        });
        const marker_string = '<a-image height="3.6" position="0 1.8 -2" src="'+stageURL+'" width="4.8"></a-image><a-plane color="#7BC8A4" height="4" position="0 0 0" rotation="-90 0 0" width="4.8"></a-plane>';
        const entities_string = marker_string + sprites_string;
        window.frames['output'].contentWindow.document.getElementById('marker').innerHTML = entities_string;
    }, 5000);

    function createARFrame() {
        return {__html: '<iframe src="static/ar.html" id="output" width="480px" height="360px"></iframe>'};
    }

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
                    <div dangerouslySetInnerHTML={createARFrame()} />
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
    sprites: PropTypes.arrayOf(PropTypes.object),
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    stageURL: PropTypes.string,
    useEditorDragStyle: PropTypes.bool
};
StageComponent.defaultProps = {
    dragRef: () => {}
};
export default StageComponent;
