import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';

const ConfirmReplaceHOC = function (WrappedComponent) {
    class ConfirmReplaceProject extends React.PureComponent {
        constructor (props) {
            super(props);

            bindAll(this, [
                'confirmReadyToReplaceProject'
            ]);
        }

        confirmReadyToReplaceProject (message) {
            let readyToReplaceProject = true;
            if (this.props.projectChanged && !this.props.canCreateNew) {
                readyToReplaceProject = confirm(message); // eslint-disable-line no-alert
            }
            return readyToReplaceProject;
        }

        render () {
            const {
                /* eslint-disable no-unused-vars */
                projectChanged,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return (<WrappedComponent
                confirmReadyToReplaceProject={this.confirmReadyToReplaceProject}
                {...props}
            />);
        }
    }

    ConfirmReplaceProject.propTypes = {
        canCreateNew: PropTypes.bool,
        projectChanged: PropTypes.bool
    };

    const _mapStateToProps = state => ({
        projectChanged: state.scratchGui.projectChanged
    });

    return connect(_mapStateToProps)(ConfirmReplaceProject);
};

export default ConfirmReplaceHOC;
