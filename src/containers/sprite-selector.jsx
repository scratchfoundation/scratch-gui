const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const SpriteSelectorComponent = require('../components/sprite-selector.jsx');

class SpriteSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['handleChange', 'targetsUpdate']);
        this.state = {
            targets: {
                targetList: []
            }
        };
    }
    componentDidMount () {
        this.props.vm.on('targetsUpdate', this.targetsUpdate);
    }
    handleChange (event) {
        this.props.vm.setEditingTarget(event.target.value);
    }
    targetsUpdate (data) {
        this.setState({targets: data});
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            openNewSprite,
            openNewCostume,
            openNewBackdrop,
            ...props
        } = this.props;
        return (
            <SpriteSelectorComponent
                openNewBackdrop={openNewBackdrop}
                openNewCostume={openNewCostume}
                openNewSprite={openNewSprite}
                sprites={this.state.targets.targetList.map(target => (
                    {
                        id: target[0],
                        name: target[1]
                    }
                ))}
                value={this.state.targets.editingTarget && [this.state.targets.editingTarget]}
                onChange={this.handleChange}
                {...props}
            />
        );
    }
}

SpriteSelector.propTypes = {
    openNewBackdrop: React.PropTypes.func,
    openNewCostume: React.PropTypes.func,
    openNewSprite: React.PropTypes.func,
    vm: React.PropTypes.instanceOf(VM)
};

module.exports = SpriteSelector;
