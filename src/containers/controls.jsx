import bindAll from 'lodash.bindall'
import PropTypes from 'prop-types'
import React from 'react'
import VM from 'scratch-vm'
import { connect } from 'react-redux'
import { setFlagClickedState, setSpriteClickedState, greenFlagClicked } from './../reducers/vm-status.js'

import ControlsComponent from '../components/controls/controls.jsx'

class Controls extends React.Component {
  constructor(props) {
    super(props)
    bindAll(this, ['handleGreenFlagClick', 'handleStopAllClick', 'handleSpriteFlagClick', 'handleGreenbuttonClick'])
  }
  handleGreenbuttonClick() {
    this.props.setSpriteClickedState(false)
    this.props.setFlagClickedState(!this.props.flagClicked)
  }
  handleGreenFlagClick(e) {
    e.preventDefault()
    this.props.greenFlagClicked()
    if (e.shiftKey) {
      this.props.vm.setTurboMode(!this.props.turbo)
    } else {
      if (!this.props.isStarted) {
        this.props.vm.start()
      }
      if(this.props.flagClicked === false){
        this.props.setFlagClickedState(true);
        setTimeout(() => {
            this.props.vm.greenFlag();
        }, 700); 
    } else {
        this.props.vm.greenFlag();
    }
    
      
    }
  }
  handleStopAllClick(e) {
    e.preventDefault()
    this.props.vm.stopAll()
  }
  handleSpriteFlagClick(e) {
    e.preventDefault()
    this.props.setSpriteClickedState(false)
    if (this.props.spriteClicked === true) {
      this.props.setSpriteClickedState(false)
    } else {
      this.props.setFlagClickedState(false)
      this.props.setSpriteClickedState(true)
    }
  }

  render() {
    const {
      vm, // eslint-disable-line no-unused-vars
      isStarted, // eslint-disable-line no-unused-vars
      projectRunning,
      turbo,
      greenFlagClicked, // eslint-disable-line no-unused-vars
      setFlagClickedState, // eslint-disable-line no-unused-vars
      setSpriteClickedState, // eslint-disable-line no-unused-vars
      ...props
    } = this.props
    return (
      <ControlsComponent
        {...props}
        active={projectRunning}
        turbo={turbo}
        onGreenFlagClick={this.handleGreenFlagClick}
        onStopAllClick={this.handleStopAllClick}
        onSpriteFlagClick={this.handleSpriteFlagClick}
        handleGreenbuttonClick={this.handleGreenbuttonClick}
      />
    )
  }
}

Controls.propTypes = {
  isStarted: PropTypes.bool.isRequired,
  projectRunning: PropTypes.bool.isRequired,
  turbo: PropTypes.bool.isRequired,
  vm: PropTypes.instanceOf(VM),
}

const mapStateToProps = (state) => ({
  isStarted: state.scratchGui.vmStatus.running,
  projectRunning: state.scratchGui.vmStatus.running,
  turbo: state.scratchGui.vmStatus.turbo,
  flagClicked: state.scratchGui.vmStatus.flagClicked,
  spriteClicked: state.scratchGui.vmStatus.spriteClicked,
})
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = {
  setFlagClickedState,
  setSpriteClickedState,
  greenFlagClicked,
}
export default connect(mapStateToProps, mapDispatchToProps)(Controls)
