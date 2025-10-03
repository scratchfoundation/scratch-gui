import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import VM from 'scratch-vm'

import Box from '../box/box.jsx'
import { STAGE_DISPLAY_SIZES } from '../../lib/layout-constants.js'
import StageHeader from '../../containers/stage-header.jsx'
import Stage from '../../containers/stage.jsx'
import Loader from '../loader/loader.jsx'
import { connect } from 'react-redux'
import { setFlagClickedState } from './../../reducers/vm-status.js'

import styles from './stage-wrapper.css'


const StageWrapperComponent = function (props) {
  const { isFullScreen, isRtl, isRendererSupported, loading, stageSize, vm, flagClicked, currentLayout, setFlagClickedState } = props
  return (
    <Box
      className={classNames(styles.stageWrapper, { [styles.fullScreen]: isFullScreen })}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <Box className={
            currentLayout === 'student' ? styles.stageMenuWrapperStudent :
            currentLayout === 'teacher' ? styles.stageMenuWrapperTeacher :
            styles.stageMenuWrapper
          }>
        <StageHeader stageSize={stageSize} vm={vm} currentLayout={currentLayout} />
      </Box>
      <div className={styles.stageBackground}>
           
          <div className={
              classNames(
                currentLayout === 'student' ? styles.stageCurrentStudent :
                currentLayout === 'teacher' ? styles.stageCurrentTeacher :
                styles.stageCurrentNormal,
                { [styles.fullScreen]: isFullScreen }
              )
            }>
            <div className={
            currentLayout === 'student' ? (
              isFullScreen ? (
                flagClicked ? styles.stagePositionStudentFullScreen : styles.stagePositionStudentHide
              ) : (
                flagClicked ? styles.stagePositionStudent : styles.stagePositionStudentHide
              )
            ):
            currentLayout === 'teacher' ? (flagClicked?styles.stagePositionTeacher:styles.stagePositionTeacherHide) :
            flagClicked ?(isFullScreen ? styles.stagePositionFullScreen : styles.stagePosition) :styles.stagePositionHide
          }>
            {/* <div className={styles.stageBackgroundPos}></div> */}
              { currentLayout !== 'teacher' && flagClicked&&<div className={styles.relativeContainer}>
              {!isFullScreen && (
                <div className={styles.canvasPos} onClick={() => props.setFlagClickedState(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>}
            <Box className={ currentLayout==='teacher'?styles.stageCanvasWrapperTeacher:styles.stageCanvasWrapper}>
              {
                isRendererSupported ? (
                  <Stage stageSize={stageSize} vm={vm} currentLayout={currentLayout}/>
                ) : (
                  <Stage stageSize={stageSize} vm={vm} currentLayout={currentLayout}/>
                )
                // (to-do)need to change this to the following the css is conflicting with isRendererSupported check that
              }
            </Box>
          </div>
          </div> 
      </div>
      
      {loading ? <Loader isFullScreen={isFullScreen} /> : null}
    </Box>
  )
}

StageWrapperComponent.propTypes = {
  isFullScreen: PropTypes.bool,
  isRendererSupported: PropTypes.bool.isRequired,
  isRtl: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
  vm: PropTypes.instanceOf(VM).isRequired,
}

const mapStateToProps = (state) => ({
  flagClicked: state.scratchGui.vmStatus.flagClicked,
})
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = {
  setFlagClickedState,
}
export default connect(mapStateToProps, mapDispatchToProps)(StageWrapperComponent)
