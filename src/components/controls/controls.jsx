import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import GreenFlag from '../green-flag/green-flag.jsx'
import StopAll from '../stop-all/stop-all.jsx'
import TurboMode from '../turbo-mode/turbo-mode.jsx'
import { connect } from 'react-redux'
import logo from './../../lib/assets/download.svg'
import styles from './controls.css'
import Reload from '../customi-cons/reload.jsx';

const messages = defineMessages({
  goTitle: {
    id: 'gui.controls.go',
    defaultMessage: 'Go',
    description: 'Green flag button title',
  },
  stopTitle: {
    id: 'gui.controls.stop',
    defaultMessage: 'Stop',
    description: 'Stop button title',
  },
})

const Controls = function (props) {
  const greenFlagRef = React.useRef(null);
  const {
    active,
    className,
    intl,
    onGreenFlagClick,
    onStopAllClick,
    onSpriteFlagClick,
    turbo,
    spriteClicked,
    flagClicked,
    isFullScreen,
    currentLayout,
    handleGreenbuttonClick,
    ...componentProps
  } = props


  const handleReload = () => {
    window.parent.postMessage('reloadIframe', '*');
  };

  return (
    <div className={classNames(currentLayout==='student'&&styles.controlsContainerStudent|| currentLayout==='teacher' && styles.controlsContainerTeacher || (currentLayout!=='student' &&currentLayout!=='student') && styles.controlsContainer, className)} {...componentProps}>
      
      {!isFullScreen  && (currentLayout==='student'|| currentLayout==='teacher') && (
        <div
          className={
            currentLayout === 'student' ? (spriteClicked?styles.spriteIconBgStudent:styles.spriteIconBgStudentHide) :
            currentLayout === 'teacher' ? (spriteClicked?styles.spriteIconBgTeacher:styles.spriteIconBgTeacherHide) :
            `${spriteClicked ? styles.spriteIconBg : styles.spriteIconHide}`
          }
          onClick={onSpriteFlagClick}
        >
          <div className={styles.spriteImageOuter} data-tooltip="Open Sprite Panel">
              {/* <img className={styles.spriteImage} draggable={false} src={logo} /> */}
              Sprite Panel
          </div>
        </div>
      )}

     {currentLayout!=='teacher' && currentLayout==='student' &&
        <div 
          onClick={handleGreenbuttonClick}
          className={
            currentLayout === 'student' ? styles.greenButton : styles.greenButtonNormal
          }
        >
          <div className={flagClicked ? styles.screenStage : styles.screenStageHide}  data-tooltip="Open Stage">
            Stage
          </div>
        </div>
      }

     {/* {currentLayout != 'normal' && <div onClick={handleReload} className={styles.reloadButton} data-tooltip="Reload" ><Reload /></div>} */}
     
      <div ref={greenFlagRef} className={styles.redGreenButtons}>
        <div data-tooltip="Green Flag" className={styles.redGreenButtonsSub} >
          <GreenFlag
            active={active}
            title={intl.formatMessage(messages.goTitle)}
            onClick={onGreenFlagClick}
          />
        </div>
        <div data-tooltip="Stop" className={styles.redGreenButtonsSub} >
          <StopAll
            active={active}
            title={intl.formatMessage(messages.stopTitle)}
            onClick={onStopAllClick}
          />
        </div>
      </div>
      {turbo ? <TurboMode /> : null}
    </div>
  )
}

Controls.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  intl: intlShape.isRequired,
  onGreenFlagClick: PropTypes.func.isRequired,
  onStopAllClick: PropTypes.func.isRequired,
  turbo: PropTypes.bool,
}

Controls.defaultProps = {
  active: false,
  turbo: false,
}

const mapStateToProps = (state) => ({
  costumeURLFax: state.scratchGui.vmStatus.costumeURLFax,
  spriteClicked: state.scratchGui.vmStatus.spriteClicked,
  isFullScreen: state.scratchGui.mode.isFullScreen,
  flagClicked: state.scratchGui.vmStatus.flagClicked,
})

export default injectIntl(connect(mapStateToProps, null)(Controls))