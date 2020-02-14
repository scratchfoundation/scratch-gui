import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import Button from '../button/button.jsx';
import SBFileUploader from '../../containers/sb-file-uploader.jsx';
import SB3Downloader from '../../containers/sb3-downloader.jsx';

import styles from './save-menu.css';

const SaveMenuComponent = function (props) {
    const {
        grokShouldHideLoad,
        grokShouldHideSave
    } = props;

    return (<div className={styles.menu}>
        <SB3Downloader>{(className, downloadProjectCallback) => (
            <Button
                className={styles.menuButton}
                onClick={downloadProjectCallback}
                style={{display: grokShouldHideSave ? 'none' : 'block'}}
            >
                {'Save to your computer'}
            </Button>
        )}</SB3Downloader>

        <SBFileUploader>
            {(className, renderFileInput, handleLoadProject) => (
                <Button
                    className={styles.menuButton}
                    onClick={handleLoadProject}
                    style={{display: grokShouldHideLoad ? 'none' : 'block'}}
                >
                    {'Load from your computer'}
                    {renderFileInput()}
                </Button>

            )}
        </SBFileUploader>
    </div>);
};

const mapStateToProps = state => ({
  // TODO: If necessary
});

SaveMenuComponent.propTypes = {
    grokShouldHideLoad: PropTypes.bool.isRequired,
    grokShouldHideSave: PropTypes.bool.isRequired
};

SaveMenuComponent.defaultProps = {
  // TODO: If necessary
};

export default connect(
    mapStateToProps
)(SaveMenuComponent);
