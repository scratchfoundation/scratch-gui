const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const VM = require('scratch-vm');

const spriteLibraryContent = require('../lib/libraries/sprites.json');

const LibaryComponent = require('../components/library/library.jsx');

class SpriteLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        this.props.vm.addSprite2(JSON.stringify(item.json));
    }
    render () {
        return (
            <LibaryComponent
                data={spriteLibraryContent}
                title="Sprite Library"
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SpriteLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};

module.exports = SpriteLibrary;
