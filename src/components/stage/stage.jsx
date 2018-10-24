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
        // console.log('testing');
        // console.log(window.frames['output']);
        // console.log('stageURL passed to createARFrame:');
        // console.log(stageURL);
        // console.log('spritesList passed to createARFrame:');
        // console.log(sprites);
        clearTimeout(timeoutID);
        let spritesString = '';
        let assetString = '';
        if (sprites) {
            sprites.forEach((sprite, index) => {
                if (sprite.visible) {
                    assetString = `
                        ${assetString}
                        <img id="sprite${index}" src="${sprite.url}">
                    `;
                    spritesString = `
                        ${spritesString}
                        <a-image
                            src="#sprite${index}"
                            height="${sprite.height / 100}"
                            material="alphaTest: 0.1; transparent: false; flatShading: true; npot: true;"
                            position="${sprite.x / 100} ${(sprite.y + 180) / 100} ${-0.3 * sprite.layerOrder}"
                            width="${sprite.width / 100}"
                        >
                        </a-image>
                    `;
                }
            });

            assetString = `
                ${assetString}
                <img id="stage" src="${stageURL}">
            `;

            const markerString = `
                <a-image
                    src="#stage"
                    height="3.6"
                    position="0 1.8 -2"
                    width="4.8"
                    material="alphaTest: 0.1; transparent: false; flatShading: true; npot: true;"
                >
                </a-image>
                <a-plane
                    color="#7BC8A4"
                    height="4"
                    position="0 0 0"
                    rotation="-90 0 0"
                    width="4.8"
                >
                </a-plane>
            `;
            const entitiesString = markerString + spritesString;
            window.frames.output.contentWindow.document.getElementById('assets').innerHTML = assetString;
            window.frames.output.contentWindow.document.getElementById('marker').innerHTML = entitiesString;
        }
    }, 10000);

    /* eslint-disable func-style */
    /* eslint-disable require-jsdoc */
    function createARFrame () {
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
                { /* eslint-disable no-constant-condition */ }
                {true ? (
                    /* eslint-disable react/no-danger */
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
