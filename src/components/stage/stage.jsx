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
        width,
        height,
        colorInfo,
        onDeactivateColorPicker,
        isColorPicking,
        question,
        onQuestionAnswered,
        ...boxProps
    } = props;
    return (
        <div>
            <Box
                className={classNames(styles.stageWrapper, {
                    [styles.withColorPicker]: isColorPicking
                })}
            >
                <Box
                    className={styles.stage}
                    componentRef={canvasRef}
                    element="canvas"
                    height={height}
                    width={width}
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
                    <Question
                        question={question}
                        onQuestionAnswered={onQuestionAnswered}
                    />
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
