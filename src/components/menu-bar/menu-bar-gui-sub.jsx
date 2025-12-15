import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import bindAll from 'lodash.bindall'
import bowser from 'bowser'
import React from 'react'

import VM from 'scratch-vm'

import Box from '../box/box.jsx'
import Button from '../button/button.jsx'
import CommunityButton from './community-button.jsx'
import ShareButton from './share-button.jsx'
import { ComingSoonTooltip } from '../coming-soon/coming-soon.jsx'
import Divider from '../divider/divider.jsx'
import SaveStatus from './save-status.jsx'
import ProjectWatcher from '../../containers/project-watcher.jsx'
import MenuBarMenu from './menu-bar-menu.jsx'
import { MenuItem, MenuSection } from '../menu/menu.jsx'
import ProjectTitleInput from './project-title-input.jsx'
import AuthorInfo from './author-info.jsx'
import AccountNav from '../../containers/account-nav.jsx'
import LoginDropdown from './login-dropdown.jsx'
import SB3Downloader from '../../containers/sb3-downloader.jsx'
import DeletionRestorer from '../../containers/deletion-restorer.jsx'
import TurboMode from '../../containers/turbo-mode.jsx'
import MenuBarHOC from '../../containers/menu-bar-hoc.jsx'
import SettingsMenu from './settings-menu.jsx'
import debounce from 'lodash.debounce'

import { openTipsLibrary } from '../../reducers/modals'
import { setPlayer } from '../../reducers/mode'
import {
  isTimeTravel220022BC,
  isTimeTravel1920,
  isTimeTravel1990,
  isTimeTravel2020,
  isTimeTravelNow,
  setTimeTravel,
} from '../../reducers/time-travel'
import {
  autoUpdateProject,
  getIsUpdating,
  getIsShowingProject,
  manualUpdateProject,
  requestNewProject,
  remixProject,
  saveProjectAsCopy,
} from '../../reducers/project-state'
import { setIsLoadingState, setIsFirstState, setIsSavingState, setProjectName, addNotification, setIsEditable, setIsCloned, setCurrentLayout, setMyProjectsGetPending, pushProjectHistory } from '../../reducers/vm-status.js'
import {
  openAboutMenu,
  closeAboutMenu,
  aboutMenuOpen,
  openAccountMenu,
  closeAccountMenu,
  accountMenuOpen,
  openFileMenu,
  closeFileMenu,
  fileMenuOpen,
  openEditMenu,
  closeEditMenu,
  editMenuOpen,
  openLoginMenu,
  closeLoginMenu,
  loginMenuOpen,
  openModeMenu,
  closeModeMenu,
  modeMenuOpen,
  settingsMenuOpen,
  openSettingsMenu,
  closeSettingsMenu,
} from '../../reducers/menus'

import collectMetadata from '../../lib/collect-metadata'
import { processSB3Data } from '../../lib/sb3-processor'

import styles from './menu-bar.css'

import helpIcon from '../../lib/assets/icon--tutorials.svg'
import mystuffIcon from './icon--mystuff.png'
import profileIcon from './icon--profile.png'
import remixIcon from './icon--remix.svg'
import dropdownCaret from './dropdown-caret.svg'
import aboutIcon from './icon--about.svg'
import fileIcon from './icon--file.svg'
import editIcon from './icon--edit.svg'
import restore from './icon--restore.svg'
import scratchLogo from './scratch-logo.svg'
import ninetiesLogo from './nineties_logo.svg'
import catLogo from './cat_logo.svg'
import prehistoricLogo from './prehistoric-logo.svg'
import oldtimeyLogo from './oldtimey-logo.svg'

import sharedMessages from '../../lib/shared-messages'
import { ChevronDoubleDownIcon, FolderIcon } from '@heroicons/react/24/outline'
// import data from './content.json';


class MenuBarGuiSub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: null,
      downloadLocalStorageProject: null,
      currentLayout: null,
    }
    bindAll(this, [
      'handleClickNew',
      'handleClickRemix',
      'handleClickSave',
      'handleClickSaveAsCopy',
      'handleClickSeeCommunity',
      'handleClickShare',
      'handleSetMode',
      'handleKeyPress',
      'handleRestoreOption',
      'getSaveToComputerHandler',
      'restoreOptionMessage',
      'onLocalStorageFileUploadFromBlob',
      'handleDownloadLocalStorageProject',
      'handleReload',
    ])
  }

  handleReload = () => {
    window.parent.postMessage('reloadIframe', '*')
  }

  handleDownloadLocalStorageProject = (downloadLocalStorageProject) => {
    // Only update the state if downloadLocalStorageProject has changed
    if (this.state.downloadLocalStorageProject !== downloadLocalStorageProject) {
      this.setState({ downloadLocalStorageProject })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }
  handleClickNew() {
    const readyToReplaceProject = this.props.confirmReadyToReplaceProject(
      this.props.intl.formatMessage(sharedMessages.replaceProjectWarning),
    )
    this.props.onRequestCloseFile()
    if (readyToReplaceProject) {
      this.props.onClickNew(this.props.canSave && this.props.canCreateNew)
    }
    this.props.onRequestCloseFile()
  }
  handleClickRemix() {
    this.props.onClickRemix()
    this.props.onRequestCloseFile()
  }
  handleClickSave() {
    this.props.onClickSave()
    this.props.onRequestCloseFile()
  }
  handleClickSaveAsCopy() {
    this.props.onClickSaveAsCopy()
    this.props.onRequestCloseFile()
  }
  handleClickSeeCommunity(waitForUpdate) {
    if (this.props.shouldSaveBeforeTransition()) {
      this.props.autoUpdateProject() // save before transitioning to project page
      waitForUpdate(true) // queue the transition to project page
    } else {
      waitForUpdate(false) // immediately transition to project page
    }
  }
  handleClickShare(waitForUpdate) {
    if (!this.props.isShared) {
      if (this.props.canShare) {
        // save before transitioning to project page
        this.props.onShare()
      }
      if (this.props.canSave) {
        // save before transitioning to project page
        this.props.autoUpdateProject()
        waitForUpdate(true)
      } else {
        waitForUpdate(false)
      }
    }
  }
  handleSetMode(mode) {
    return () => {
      // Turn on/off filters for modes.
      if (mode === '1920') {
        document.documentElement.style.filter = 'brightness(.9)contrast(.8)sepia(1.0)'
        document.documentElement.style.height = '100%'
      } else if (mode === '1990') {
        document.documentElement.style.filter = 'hue-rotate(40deg)'
        document.documentElement.style.height = '100%'
      } else {
        document.documentElement.style.filter = ''
        document.documentElement.style.height = ''
      }

      // Change logo for modes
      if (mode === '1990') {
        document.getElementById('logo_img').src = ninetiesLogo
      } else if (mode === '2020') {
        document.getElementById('logo_img').src = catLogo
      } else if (mode === '1920') {
        document.getElementById('logo_img').src = oldtimeyLogo
      } else if (mode === '220022BC') {
        document.getElementById('logo_img').src = prehistoricLogo
      } else {
        document.getElementById('logo_img').src = this.props.logo
      }

      this.props.onSetTimeTravelMode(mode)
    }
  }
  handleRestoreOption(restoreFun) {
    return () => {
      restoreFun()
      this.props.onRequestCloseEdit()
    }
  }
  handleKeyPress(event) {
    const modifier = bowser.mac ? event.metaKey : event.ctrlKey
    if (modifier && event.key === 's') {
      this.props.onClickSave()
      event.preventDefault()
    }
  }
  getSaveToComputerHandler(downloadProjectCallback) {
    return () => {
      this.props.onRequestCloseFile()
      downloadProjectCallback()
      if (this.props.onProjectTelemetryEvent) {
        const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale)
        this.props.onProjectTelemetryEvent('projectDidSave', metadata)
      }
    }
  }

  getProjectIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('id') || null
  }

  async fetchProjectData(projectId, fetchapiurl) {
    if (!projectId) return
    
    this.props.setMyProjectsGetPending(true);
    
    this.props.addNotification({
      type: 'saving',
      icon: 'saving',
      message: 'Fetching project please wait',
    });
    this.props.setIsSavingStateTrue()
    try {
      const apiUrl = `${fetchapiurl}/projects/${projectId}`
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await response.json()
      
      this.props.setProjectName(data.name)
      
      // Process the base64 .sb3 data to validate and fix isStage issues
      if (data.content) {
        try {
          const processingResult = await processSB3Data(data.content)
          
          if (processingResult.success) {
            if (processingResult.hadIssues) {
              this.props.addNotification({
                type: 'warning',
                icon: 'warning',
                message: `Project data fixed: ${processingResult.issues.join(', ')}`,
                duration: 3000
              });
              // Use the corrected base64 data
              data.content = processingResult.outputBase64
            }
          } else {
            this.props.addNotification({
              type: 'error',
              icon: 'error',
              message: 'Warning: Project data could not be validated',
              duration: 5000
            });
          }
        } catch (processingError) {
          console.error('Error processing SB3 data:', processingError)
          // Continue with original data if processing fails
        }
      }
      
      // Push the initial project state to history for myprojects layout
      if (data.content) {
        this.props.pushProjectHistory(data.content);
      }
      
      this.props.addNotification({
        type: 'saving',
        icon: 'saving',
        message: 'Fetching project please wait',
        duration: 500
      });
      return data
    } catch (error) {
      this.props.setIsSavingStateFalse()
    } finally {
      this.props.setIsSavingStateFalse()
    }
  }

  async fetchProjectDataTeacher(
    scratchElementSettingsId,
    scratchSubmissionType,
    scratchUserId,
    scratchSubstatus,
    scratchisActivein,
    fetchapiurl,
  ) {
    if (!scratchElementSettingsId) return

      this.props.addNotification({
      type: 'saving',
      icon: 'saving',
      message: 'Fetching data please wait',
    });

    try {
      const apiUrl = `${fetchapiurl}/challenges/user-submission/${scratchElementSettingsId}?user=${scratchUserId}&type=${scratchSubmissionType}&filter=all`
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const dataReceived = await response.json()

      if (!Array.isArray(dataReceived) || dataReceived.length === 0) {
        console.error('No valid submissions found in API response.')
        return null
      }

      if (scratchSubstatus === 'submitted' || scratchSubstatus === 'graded') {
        const activeSubmission = dataReceived.find(
          (submission) =>
            (String(submission.submissionStatus) == 'submitted' || String(submission.submissionStatus) == 'graded') &&
            String(submission.isActive) == String(scratchisActivein),
        )
        if (activeSubmission) {
          return activeSubmission.submission
        }
      }

      if (scratchSubstatus === 'resubmitted' || scratchSubstatus === 'graded') {
        if (dataReceived && Array.isArray(dataReceived)) {
          const activeResubmission = dataReceived.find(
            (resub) =>
              (String(resub.submissionStatus) === 'resubmitted' || String(resub.submissionStatus) === 'graded') &&
              String(resub.isActive) === String(scratchisActivein),
          )
          if (activeResubmission) {
            return activeResubmission.submission
          }
        } else {
          console.error('Data received is not an array or is undefined')
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    } finally {
        this.props.addNotification({
        type: 'saving',
        icon: 'saving',
        message: 'Fetching data please wait',
        duration: 500
      });
    }
  }

  async fetchStudentChallengeSubmissionData(challengeId, chapterId, unitId, courseId, fetchapiurl) {
    this.props.onClickLoadingTrue()
      this.props.addNotification({
      type: 'saving',
      icon: 'saving',
      message: 'Fetching data please wait',
    });
    try {
      const apiUrl = `${fetchapiurl}/challenges/details/${challengeId}?chapter=${chapterId}&unit=${unitId}&course=${courseId}`
      const data = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const response = await data.json()
      if (
        response.challengeSettings[0].allowResubmission === false &&
        response.challengeSettings[0].challengeSubmissions.length > 1
      ) {
        const selectedsub = response.challengeSettings[0].challengeSubmissions.find(
          (submission) => {
            return submission.isActive === true
          },
        )
        if (selectedsub) {
          return selectedsub.submission
        }
      } else if (response.challengeSettings[0].allowResubmission === true) {
        return null
      } else {
        return response?.challengeSettings[0]?.challengeSubmissions[0]?.submission
      }
    }  catch (error) {
      this.props.onClickLoadingFalse()
    } finally {
      this.props.onClickLoadingFalse()
       this.props.addNotification({
        type: 'saving',
        icon: 'saving',
        message: 'Fetching data please wait',
        duration: 500
      });
    }
  }

  async fetchChpaterData(scratchUrl) {
    if (!scratchUrl) return
     this.props.addNotification({
        type: 'saving',
        icon: 'saving',
        message: 'Fetching data please wait',
      });
    
    try {
      const response = await fetch(scratchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
       this.props.addNotification({
        type: 'saving',
        icon: 'saving',
        message: 'Fetching data please wait',
        duration: 500
      });
    }
  }

  async fetchStudentSubmissionData(fetchapiurl, submissionId, challengeSubmissionType) {
    this.props.onClickLoadingTrue()
     this.props.addNotification({
        type: 'saving',
        icon: 'saving',
        message: 'Fetching data please wait',
      });
    try {
      const apiUrl = `${fetchapiurl}/challenges/submission/${submissionId}?type=${challengeSubmissionType}`
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await response.json()
      return data
    } catch (error) {
      this.props.onClickLoadingFalse()
    } finally {
      this.props.onClickLoadingFalse()
       this.props.addNotification({
        type: 'saving',
        icon: 'saving',
        message: 'Fetching data please wait',
        duration: 500
      });
    }
  }
  async componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
    const url = new URLSearchParams(window.location.search)

    const projectId = url.get('projectid')
    const currentLayout = url.get('inputLayout')
    let result

    const scratchElementSettingsId = url.get('scratchElementSettingsId')
    const scratchSubmissionType = url.get('scratchSubmissionType')
    const scratchUserId = url.get('scratchUserId')
    const scratchSubstatus = url.get('scratchSubstatus')
    const scratchisActivein = url.get('scratchisActivein')
    const fetchapiurl = url.get('fetchapiurl')
    const isprojecteditable = url.get('editable')
    const isCloned = url.get('isCloned') === 'true'
    this.props.setIsEditable(isprojecteditable)
    this.props.setIsCloned(isCloned)
    const challengeId = url.get('challengeId')
    const chapterId = url.get('chapterId')
    const unitId = url.get('unitId')
    const courseId = url.get('courseId')


    const submissionId = url.get('submissionId')
    const challengeSubmissionType = url.get('challengeSubmissionType')

    const scratchUrl = url.get('scratchUrl')
    this.props.setCurrentLayout(currentLayout)

    try {
      if (currentLayout === 'teacher') {
        result = await this.fetchProjectDataTeacher(
          scratchElementSettingsId,
          scratchSubmissionType,
          scratchUserId,
          scratchSubstatus,
          scratchisActivein,
          fetchapiurl,
        )
        this.onLocalStorageFileUploadTeacher(result)
      } else if (currentLayout === 'myprojects') {
        result = await this.fetchProjectData(projectId, fetchapiurl)
        this.onLocalStorageFileUploadStudentmyproject(result.content)
      } else if (currentLayout === 'chapter') {
        result = await this.fetchChpaterData(scratchUrl, fetchapiurl)
        this.onLocalStorageFileUploadStudentmyproject(result.content)
      } else if (currentLayout === 'studentChallenge') {
        result = await this.fetchStudentChallengeSubmissionData(challengeId, chapterId, unitId, courseId, fetchapiurl)
        this.onLocalStorageFileUploadStudentChallenge(result)
      } else if(currentLayout === 'student'){
        result = await this.fetchStudentSubmissionData(fetchapiurl, submissionId, challengeSubmissionType)
        this.onLocalStorageFileUploadStudentChallenge(result.submission)
      } else if(currentLayout === 'normal'){
         const response = await fetch(scratchUrl);
         const blob = await response.blob();
         this.onLocalStorageFileUploadFromBlob(blob);
      } 
    } catch(error) {
      console.error('Error fetching project:', error)
    }
  }

  debouncedOnLocalStorageSave = debounce(() => {
    this.onLocalStorageSave(this.state.downloadLocalStorageProject)();
  }, 1000);

  componentDidUpdate(prevProps) {

    if (this.props.greenFlagClicked !== prevProps.greenFlagClicked) {
      this.debouncedOnLocalStorageSave();
    }

    if (
      this.props.flagClicked !== prevProps.flagClicked ||
      this.props.autoSave !== prevProps.autoSave
    ) {
      this.onLocalStorageSave(this.state.downloadLocalStorageProject)()
    }
  }

  async onLocalStorageFileUploadStudentChallenge(base64blocks) {
    let binaryString = atob(base64blocks)
    let bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    await this.props.vm.loadProject(bytes.buffer)
  }

 async onLocalStorageFileUploadStudentmyproject(base64blocks) {
  try {
    if(base64blocks === null) {
      this.props.onClickFirstFalse()
      return;
    }
    let binaryString = atob(base64blocks)
    let bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    await this.props.vm.loadProject(bytes.buffer)
  } catch (error) {
    console.error('Error loading project:', error)
    // Handle error appropriately
  } finally {
    this.props.setMyProjectsGetPending(false);
    this.props.onClickFirstFalse()
  }
}




  async onLocalStorageFileUploadTeacher(base64blocks) {
    let binaryString = atob(base64blocks)
    let bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    await this.props.vm.loadProject(bytes.buffer)
  }

  async onLocalStorageFileUploadFromBlob(blob) {
    try {
      this.props.onClickLoadingTrue()
      
      const reader = new FileReader()
      
      return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
          try {
            const buffer = reader.result
            await new Promise((resolve) => setTimeout(resolve, 500))
            await this.props.vm.loadProject(buffer)
            this.props.onClickLoadingFalse()
            resolve()
          } catch (error) {
            this.props.onClickLoadingFalse()
            console.error('Error loading project from blob:', error)
            reject(error)
          }
        }
        
        reader.onerror = () => {
          this.props.onClickLoadingFalse()
          console.error('FileReader error while processing blob')
          reject(new Error('FileReader error'))
        }
        
        reader.readAsArrayBuffer(blob)
      })
    } catch (error) {
      this.props.onClickLoadingFalse()
      console.error('Error processing blob:', error)
      throw error
    }
  }

  onLocalStorageSave(downloadLocalStorageProject) {
    return () => {
      this.props.onRequestCloseFile()
      downloadLocalStorageProject()
      if (this.props.onProjectTelemetryEvent) {
        const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale)
        this.props.onProjectTelemetryEvent('projectDidSave', metadata)
      }
    }
  }
  restoreOptionMessage(deletedItem) {
    switch (deletedItem) {
      case 'Sprite':
        return (
          <FormattedMessage
            defaultMessage='Restore Sprite'
            description='Menu bar item for restoring the last deleted sprite.'
            id='gui.menuBar.restoreSprite'
          />
        )
      case 'Sound':
        return (
          <FormattedMessage
            defaultMessage='Restore Sound'
            description='Menu bar item for restoring the last deleted sound.'
            id='gui.menuBar.restoreSound'
          />
        )
      case 'Costume':
        return (
          <FormattedMessage
            defaultMessage='Restore Costume'
            description='Menu bar item for restoring the last deleted costume.'
            id='gui.menuBar.restoreCostume'
          />
        )
      default: {
        return (
          <FormattedMessage
            defaultMessage='Restore'
            description='Menu bar item for restoring the last deleted item in its disabled state.' /* eslint-disable-line max-len */
            id='gui.menuBar.restore'
          />
        )
      }
    }
  }
  buildAboutMenu(onClickAbout) {
    if (!onClickAbout) {
      // hide the button
      return null
    }
    if (typeof onClickAbout === 'function') {
      // make a button which calls a function
      return <AboutButton onClick={onClickAbout} />
    }
    // assume it's an array of objects
    // each item must have a 'title' FormattedMessage and a 'handleClick' function
    // generate a menu with items for each object in the array
    return (
      <div
        className={classNames(styles.menuBarItem, styles.hoverable, {
          [styles.active]: this.props.aboutMenuOpen,
        })}
        onMouseUp={this.props.onRequestOpenAbout}
      >
        <img className={styles.aboutIcon} src={aboutIcon} />
        <MenuBarMenu
          className={classNames(styles.menuBarMenu)}
          open={this.props.aboutMenuOpen}
          place={this.props.isRtl ? 'left' : 'left'}
          onRequestClose={this.props.onRequestCloseAbout}
        >
          {onClickAbout.map((itemProps) => (
            <MenuItem
              key={itemProps.title}
              isRtl={this.props.isRtl}
              onClick={this.wrapAboutMenuCallback(itemProps.onClick)}
            >
              {itemProps.title}
            </MenuItem>
          ))}
        </MenuBarMenu>
      </div>
    )
  }
  wrapAboutMenuCallback(callback) {
    return () => {
      callback()
      this.props.onRequestCloseAbout()
    }
  }
  render() {
    const {
      greenFlagClicked,
      ...componentProps
    } = this.props
    
    const newProjectMessage = (
      <FormattedMessage
        defaultMessage='New'
        description='Menu bar item for creating a new project'
        id='gui.menuBar.new'
      />
    )
    return (
      <Box className={classNames(componentProps.className, styles.menuBar)}>
        {this.props.canManageFiles && (
          <div
            className={classNames(styles.menuBarItem, styles.hoverable, {
              [styles.active]: this.props.fileMenuOpen,
            })}
            onMouseUp={this.props.onClickFile}
          >
            <div style={{ display: 'none' }}>
              <SB3Downloader>
                {(className, downloadProjectCallback, downloadLocalStorageProject) => {
                  this.handleDownloadLocalStorageProject(downloadLocalStorageProject)
                  return (
                    <div
                      className={className}
                      onClick={this.onLocalStorageSave(downloadLocalStorageProject)}
                    >
                      <FormattedMessage
                        defaultMessage='Save to your Local Storage'
                        description='Menu bar item for downloading a project to your computer' // eslint-disable-line max-len
                        id='gui.menuBar.downloadToLocalStorage'
                      />
                    </div>
                  )
                }}
              </SB3Downloader>
            </div>
            <FolderIcon className={styles.fileDropDown} />

            <MenuBarMenu
              className={classNames(styles.menuBarMenu)}
              open={this.props.fileMenuOpen}
              place={this.props.currentLayout === 'studentChallenge' ? 'right' : (this.props.isRtl || this.props.positionModal ? 'left' : 'right')}
              onRequestClose={this.props.onRequestCloseFile}
            >
              <MenuSection>
                <MenuItem isRtl={this.props.isRtl} onClick={this.handleClickNew}>
                  {newProjectMessage}
                </MenuItem>
              </MenuSection>
              {(this.props.canSave || this.props.canCreateCopy || this.props.canRemix) && (
                <MenuSection>
                  {this.props.canSave && (
                    <MenuItem onClick={this.handleClickSave}>{saveNowMessage}</MenuItem>
                  )}
                  {this.props.canCreateCopy && (
                    <MenuItem onClick={this.handleClickSaveAsCopy}>{createCopyMessage}</MenuItem>
                  )}
                  {this.props.canRemix && (
                    <MenuItem onClick={this.handleClickRemix}>{remixMessage}</MenuItem>
                  )}
                </MenuSection>
              )}
              <MenuSection>
                <MenuItem onClick={this.props.onStartSelectingFileUpload}>
                  {/* load from your computer */}
                  {this.props.intl.formatMessage(sharedMessages.loadFromComputerTitle)} 
                </MenuItem>
                <SB3Downloader>
                  {(className, downloadProjectCallback) => (
                    <MenuItem
                      className={className}
                      onClick={this.getSaveToComputerHandler(downloadProjectCallback)}
                    >
                      <FormattedMessage
                        defaultMessage='Save to your computer'
                        description='Menu bar item for downloading a project to your computer' // eslint-disable-line max-len
                        id='gui.menuBar.downloadToComputer'
                      />
                    </MenuItem>
                  )}
                </SB3Downloader>
              </MenuSection>

            </MenuBarMenu>
            
          </div>
        )}
          <div
              className={classNames(styles.menuBarItem, styles.hoverable, {
                [styles.active]: this.props.editMenuOpen,
              })}
              onMouseUp={this.props.onClickEdit}
            >
              <img src={restore} />
              <MenuBarMenu
                className={classNames(styles.menuBarMenu)}
                open={this.props.editMenuOpen}
                place={this.props.currentLayout === 'studentChallenge' ? 'right' : (this.props.isRtl || this.props.positionModal ? 'left' : 'right')}
                onRequestClose={this.props.onRequestCloseEdit}
              >
                <DeletionRestorer>
                  {(handleRestore, { restorable, deletedItem }) => (
                    <MenuItem
                      className={classNames({ [styles.disabled]: !restorable })}
                      onClick={this.handleRestoreOption(handleRestore)}
                    >
                      {this.restoreOptionMessage(deletedItem)}
                    </MenuItem>
                  )}
                </DeletionRestorer>
              </MenuBarMenu>
            </div>
      </Box>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const loadingState = state.scratchGui.projectState.loadingState
  const user = state.session && state.session.session && state.session.session.user
  return {
    aboutMenuOpen: aboutMenuOpen(state),
    accountMenuOpen: accountMenuOpen(state),
    currentLocale: state.locales.locale,
    fileMenuOpen: fileMenuOpen(state),
    editMenuOpen: editMenuOpen(state),
    isRtl: state.locales.isRtl,
    isUpdating: getIsUpdating(loadingState),
    isShowingProject: getIsShowingProject(loadingState),
    locale: state.locales.locale,
    loginMenuOpen: loginMenuOpen(state),
    modeMenuOpen: modeMenuOpen(state),
    projectTitle: state.scratchGui.projectTitle,
    sessionExists: state.session && typeof state.session.session !== 'undefined',
    settingsMenuOpen: settingsMenuOpen(state),
    username: user ? user.username : null,
    userOwnsProject: ownProps.authorUsername && user && ownProps.authorUsername === user.username,
    vm: state.scratchGui.vm,
    mode220022BC: isTimeTravel220022BC(state),
    mode1920: isTimeTravel1920(state),
    mode1990: isTimeTravel1990(state),
    mode2020: isTimeTravel2020(state),
    modeNow: isTimeTravelNow(state),
    flagClicked: state.scratchGui.vmStatus.flagClicked,
    greenFlagClicked: state.scratchGui.vmStatus.greenFlagClicked,
    isSaving: state.scratchGui.vmStatus.isSaving,
    isSavingStatus: state.scratchGui.vmStatus.isSavingStatus,
    isFirst: state.scratchGui.vmStatus.isFirst,
    isLoading: state.scratchGui.vmStatus.isLoading,
    autoSave: state.scratchGui.vmStatus.autoSave,
    positionModal: state.scratchGui.vmStatus.positionModal,
  }
}

const mapDispatchToProps = (dispatch) => ({
  autoUpdateProject: () => dispatch(autoUpdateProject()),
  onOpenTipLibrary: () => dispatch(openTipsLibrary()),
  onClickAccount: () => dispatch(openAccountMenu()),
  onRequestCloseAccount: () => dispatch(closeAccountMenu()),
  onClickFile: () => dispatch(openFileMenu()),
  onRequestCloseFile: () => dispatch(closeFileMenu()),
  onClickEdit: () => dispatch(openEditMenu()),
  onRequestCloseEdit: () => dispatch(closeEditMenu()),
  onClickLogin: () => dispatch(openLoginMenu()),
  onRequestCloseLogin: () => dispatch(closeLoginMenu()),
  onClickMode: () => dispatch(openModeMenu()),
  onRequestCloseMode: () => dispatch(closeModeMenu()),
  onRequestOpenAbout: () => dispatch(openAboutMenu()),
  onRequestCloseAbout: () => dispatch(closeAboutMenu()),
  onClickSettings: () => dispatch(openSettingsMenu()),
  onRequestCloseSettings: () => dispatch(closeSettingsMenu()),
  onClickNew: (needSave) => dispatch(requestNewProject(needSave)),
  onClickRemix: () => dispatch(remixProject()),
  onClickSave: () => dispatch(manualUpdateProject()),
  onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
  onSeeCommunity: () => dispatch(setPlayer(true)),
  onSetTimeTravelMode: (mode) => dispatch(setTimeTravel(mode)),
  onClickFirst: () => dispatch(setFirst()),
  onClickFirstFalse: () => dispatch(setIsFirstState(false)),
  onClickLoadingFalse: () => dispatch(setIsLoadingState(false)),
  onClickLoadingTrue: () => dispatch(setIsLoadingState(true)),
  setIsSavingStateTrue: () => dispatch(setIsSavingState(true)),
  setIsSavingStateFalse: () => dispatch(setIsSavingState(false)),
  setProjectName: (name) => dispatch(setProjectName(name)),
  addNotification: (notification) => dispatch(addNotification(notification)),
  setIsEditable: (isEditable) => dispatch(setIsEditable(isEditable)),
  setIsCloned: (isCloned) => dispatch(setIsCloned(isCloned)),
  setCurrentLayout: (currentLayout) => dispatch(setCurrentLayout(currentLayout)),
  setMyProjectsGetPending: (pending) => dispatch(setMyProjectsGetPending(pending)),
  pushProjectHistory: (historyEntry) => dispatch(pushProjectHistory(historyEntry)),
})

export default compose(
  injectIntl,
  MenuBarHOC,
  connect(mapStateToProps, mapDispatchToProps),
)(MenuBarGuiSub)
