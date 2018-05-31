import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import BackpackComponent from '../components/backpack/backpack.jsx';

class Backpack extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleToggle'
        ]);
        this.state = {
            expanded: false,
            contents: []
        };
    }
    handleToggle () {
        this.setState({expanded: !this.state.expanded});
    }
    render () {
        return (
            <BackpackComponent
                contents={this.state.contents}
                expanded={this.state.expanded}
                onToggle={this.props.host ? this.handleToggle : null}
            />
        );
    }
}

Backpack.propTypes = {
    host: PropTypes.string
};

export default Backpack;
