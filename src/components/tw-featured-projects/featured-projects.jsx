import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import StudioView from '../tw-studioview/studioview.jsx';
import styles from './featured-projects.css';
import {getIsLoading, getIsFetchingWithId, setProjectId} from '../../reducers/project-state';
import analytics from '../../lib/analytics';

class FeaturedProjects extends React.Component {
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
        analytics.twEvent('Load Featured');
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
                        [styles.opened]: opened
                    }
                )}
            >
                <div className={styles.projects}>
                    <StudioView
                        id={this.props.studio}
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
                                    defaultMessage="Click to view featured projects."
                                    description="Text to view featured projects"
                                    id="tw.viewFeaturedProjects"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.footer}>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://scratch.mit.edu/studios/${this.props.studio}/`}
                    >
                        <FormattedMessage
                            defaultMessage="View studio on Scratch."
                            description="Link to turbowarp featured projects studio"
                            id="tw.featuredProjectsStudio"
                        />
                    </a>
                </div>
            </div>
        );
    }
}

FeaturedProjects.propTypes = {
    loading: PropTypes.bool,
    setProjectId: PropTypes.func,
    studio: PropTypes.string
};

const mapStateToProps = state => ({
    loading: getIsLoading(state.scratchGui.projectState.loadingState) ||
        getIsFetchingWithId(state.scratchGui.projectState.loadingState)
});

const mapDispatchToProps = dispatch => ({
    setProjectId: projectId => dispatch(setProjectId(projectId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeaturedProjects);
