const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const ScratchBlocks = require('scratch-blocks/blocks_compressed_vertical');

class Blocks extends React.Component {
    constructor (props) {
        super(props);
        this.mountBlocks = this.mountBlocks.bind(this);
    }
    mountBlocks (component) {
        this.workspace = ScratchBlocks.inject(
            component,
            defaultsDeep({}, this.props.options, Blocks.defaultOptions)
        );
        if (this.props.vm) {
            this.workspace.addChangeListener(this.props.vm.blockListener);
        }
    }
    render () {
        return (
            <div
                className="scratch-blocks"
                ref={this.mountBlocks} />
        );
    }
}

Blocks.propTypes = {
    options: React.PropTypes.shape({
        toolbox: React.PropTypes.element,
        media: React.PropTypes.string,
        zoom: React.PropTypes.shape({
            controls: React.PropTypes.boolean,
            wheel: React.PropTypes.boolean,
            startScale: React.PropTypes.number
        }),
        colours: React.PropTypes.shape({
            workspace: React.PropTypes.string,
            flyout: React.PropTypes.string,
            scrollbar: React.PropTypes.string,
            scrollbarHover: React.PropTypes.string,
            insertionMarker: React.PropTypes.string,
            insertionMarkerOpacity: React.PropTypes.number,
            fieldShadow: React.PropTypes.string,
            dragShadowOpacity: React.PropTypes.number
        })
    }),
    vm: React.PropTypes.object
};

Blocks.defaultOptions = {
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.75
    },
    colours: {
        workspace: '#334771',
        flyout: '#283856',
        scrollbar: '#24324D',
        scrollbarHover: '#0C111A',
        insertionMarker: '#FFFFFF',
        insertionMarkerOpacity: 0.3,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    }
};

Blocks.defaultProps = {
    options: Blocks.defaultOptions
};

module.exports = Blocks;
