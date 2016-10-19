const React = require('react');
const VM = require('scratch-vm');

const VMManager = require('../lib/vm-manager');
const MediaLibrary = require('../lib/media-library');

const Blocks = require('./blocks');
const GUIComponent = require('../components/gui');
const GreenFlag = require('./green-flag');
const SpriteSelector = require('./sprite-selector');
const Stage = require('./stage');
const StopAll = require('./stop-all');

const SpriteLibrary = require('./sprite-library');
const CostumeLibrary = require('./costume-library');
const BackdropLibrary = require('./backdrop-library');

class GUI extends React.Component {
    constructor (props) {
        super(props);
        this.vmManager = new VMManager(this.props.vm);
        this.mediaLibrary = new MediaLibrary();
        this.state = {currentModal: null};
    }
    componentDidMount () {
        this.vmManager.attachKeyboardEvents();
        this.props.vm.loadProject(this.props.projectData);
        this.props.vm.start();
    }
    componentWillUnmount () {
        this.vmManager.detachKeyboardEvents();
        this.props.vm.stopAll();
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.props.vm.loadProject(nextProps.projectData);
        }
    }
    openModal (modalName) {
        this.setState({currentModal: modalName});
    }
    closeModal () {
        this.setState({currentModal: null});
    }
    render () {
        return (
            <GUIComponent>
                <GreenFlag vm={this.props.vm} />
                <StopAll vm={this.props.vm} />
                <Stage vm={this.props.vm} />
                <SpriteSelector vm={this.props.vm}
                    openNewSprite={() => this.openModal('sprite-library')}
                    openNewCostume={() => this.openModal('costume-library')}
                    openNewBackdrop={() => this.openModal('backdrop-library')} />
                <Blocks
                    options={{
                        media: this.props.basePath + 'static/blocks-media/'
                    }}
                    vm={this.props.vm}
                />
                <SpriteLibrary
                    vm={this.props.vm}
                    mediaLibrary={this.mediaLibrary}
                    onRequestClose={this.closeModal.bind(this)}
                    visible={this.state.currentModal == 'sprite-library'}
                    key='sprite-library' />
                <CostumeLibrary
                    vm={this.props.vm}
                    mediaLibrary={this.mediaLibrary}
                    onRequestClose={this.closeModal.bind(this)}
                    visible={this.state.currentModal == 'costume-library'}
                    key='costume-library' />
                <BackdropLibrary
                    vm={this.props.vm}
                    mediaLibrary={this.mediaLibrary}
                    onRequestClose={this.closeModal.bind(this)}
                    visible={this.state.currentModal == 'backdrop-library'}
                    key='backdrop-library' />
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    basePath: React.PropTypes.string,
    projectData: React.PropTypes.string,
    vm: React.PropTypes.object,
};

GUI.defaultProps = {
    basePath: '/',
    vm: new VM()
};

module.exports = GUI;
