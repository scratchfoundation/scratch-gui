import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';

class RubyDownloader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'downloadProject'
        ]);
    }
    saveRuby () {
        let code = 'require "smalruby3"\n';
        const generator = this.props.rubyCodes.generator;
        const sprites = [this.props.stage];
        for(let id in this.props.sprites) {
            const sprite = this.props.sprites[id]
            sprites[sprite.order + 1] = sprite;
        }
        sprites.forEach(sprite => {
            const rubyCode = this.props.rubyCodes.rubyCode[sprite.id];
            if (rubyCode) {
                const spriteNewCode = generator.spriteNew(rubyCode.target);
                const bodyCode = rubyCode.code ? generator.prefixLines(rubyCode.code, generator.INDENT) : '';
                code += `\n${spriteNewCode} do\n${bodyCode}end\n`;
            }
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
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    stage: PropTypes.shape({
        id: PropTypes.string
    }),
    sprites: PropTypes.object,
    rubyCodes: PropTypes.shape({
        generator: PropTypes.object,
        rubyCode: PropTypes.object
    })
};

const mapStateToProps = state => ({
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    stage: state.scratchGui.targets.stage,
    sprites: state.scratchGui.targets.sprites,
    rubyCodes: state.scratchGui.rubyCodes
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(RubyDownloader);
