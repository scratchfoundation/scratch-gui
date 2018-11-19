import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import RubyGenerator from '../lib/ruby-generator';
import VM from 'scratch-vm';

class RubyDownloader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'downloadProject'
        ]);
    }
    saveRuby () {
        const idToTarget = {};
        this.props.vm.runtime.targets.forEach(target => {
            idToTarget[target.id] = target;
        });
        const targets = [idToTarget[this.props.stage.id]];
        for (const id in this.props.sprites) {
            const sprite = this.props.sprites[id];
            targets[sprite.order + 1] = idToTarget[id];
        }
        const code = RubyGenerator.targetsToCode(targets, {
            requires: ['smalruby3'],
            withSpriteNew: true
        });

        return new Blob([code], {
            type: 'text/x-ruby-script'
        });
    }
    downloadProject () {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        const content = this.saveRuby();
        if (this.props.onSaveFinished) {
            this.props.onSaveFinished();
        }
        // Use special ms version if available to get it working on Edge.
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(content, this.props.projectFilename);
            return;
        }

        const url = window.URL.createObjectURL(content);
        downloadLink.href = url;
        downloadLink.download = this.props.projectFilename;
        downloadLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.props.className,
            this.downloadProject
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.rb`;
};

RubyDownloader.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    sprites: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
    })),
    stage: PropTypes.shape({
        id: PropTypes.string
    }),
    vm: PropTypes.instanceOf(VM)
};
RubyDownloader.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    sprites: state.scratchGui.targets.sprites,
    stage: state.scratchGui.targets.stage,
    vm: state.scratchGui.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(RubyDownloader);
