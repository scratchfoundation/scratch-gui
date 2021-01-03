import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import VM from 'scratch-vm';
import AutoSaveAPI from '../lib/tw-indexeddb-autosave-api';

class ToggleCompiler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'loadAutoSave'
        ]);
    }
    loadAutoSave () {
        AutoSaveAPI.load()
            .then(arrayBuffer => {
                this.props.vm.loadProject(arrayBuffer);
            })
            .catch(error => {
                // TODO: proper error alert
                console.error(error);
            });
    }
    render () {
        return this.props.children(
            this.props.className,
            this.loadAutoSave
        );
    }
}

ToggleCompiler.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ToggleCompiler);
