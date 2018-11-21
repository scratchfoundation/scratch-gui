import React from 'react';
import bindAll from 'lodash.bindall';

/* Higher Order Component to get and set the project title
 * @param {React.Component} WrappedComponent component to receive project title related props
 * @returns {React.Component} component with project loading behavior
 */
const TitledHOC = function (WrappedComponent) {
    class TitledComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleUpdateProjectTitle'
            ]);
            this.state = {
                projectTitle: null
            };
        }
        handleUpdateProjectTitle (newTitle) {
            this.setState({projectTitle: newTitle});
        }
        render () {
            return (
                <WrappedComponent
                    canEditTitle
                    projectTitle={this.state.projectTitle}
                    onUpdateProjectTitle={this.handleUpdateProjectTitle}
                    {...this.props}
                />
            );
        }
    }

    return TitledComponent;
};

export {
    TitledHOC as default
};
