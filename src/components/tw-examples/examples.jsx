import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import StudioView from '../tw-studioview/studioview.jsx';
import styles from './examples.css';
import {getIsLoading, getIsFetchingWithId, setProjectId} from '../../reducers/project-state';

const studioId = '27205657';

class Examples extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelect',
            'handleOpenProjects'
        ]);
        this.state = {
            opened: false
        };
    }
    handleSelect (id) {
        this.props.setProjectId(id);
    }
    handleOpenProjects () {
        this.setState({
            opened: true
        });
    }
    render () {
        const opened = this.state.opened;
        return (
            <div
                className={classNames(
                    styles.container,
                    {
                        [styles.opened]: opened,
                        [styles.responsive]: this.props.responsive
                    }
                )}
            >
                <div className={styles.projects}>
                    <StudioView
                        id={studioId}
                        onSelect={this.handleSelect}
                        disabled={this.props.loading}
                        placeholder={!opened}
                    />
                    {opened ? null : (
                        <div
                            className={styles.openerContainer}
                            onClick={this.handleOpenProjects}
                        >
                            <div className={styles.openerContent}>
                                <FormattedMessage
                                    defaultMessage="Click to view example projects."
                                    description="Text to view example projects"
                                    id="tw.examples.view"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.footer}>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://scratch.mit.edu/studios/${studioId}/`}
                    >
                        <FormattedMessage
                            defaultMessage="View studio on Scratch."
                            description="Link to turbowarp examples studio"
                            id="tw.examples.studioLink"
                        />
                    </a>
                </div>
            </div>
        );
    }
}

Examples.propTypes = {
    responsive: PropTypes.bool,
    loading: PropTypes.bool,
    setProjectId: PropTypes.func
};

const mapStateToProps = state => ({
    loading: getIsLoading(state.scratchGui.projectState.loadingState) || getIsFetchingWithId(state.scratchGui.projectState.loadingState)
});

const mapDispatchToProps = dispatch => ({
    setProjectId: projectId => dispatch(setProjectId(projectId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Examples);
