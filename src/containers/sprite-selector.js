const bindAll = require('lodash.bindall');
const React = require('react');

const SpriteSelectorComponent = require('../components/sprite-selector');

class SpriteSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['onChange', 'targetsUpdate']);
        this.state = {
            targets: {
                targetList: []
            }
        };
    }
    componentDidMount () {
        this.props.vm.on('targetsUpdate', this.targetsUpdate);
    }
    onChange (event) {
        this.props.vm.setEditingTarget(event.target.value);
    }
    targetsUpdate (data) {
        this.setState({targets: data});
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <SpriteSelectorComponent
                value={this.state.targets.editingTarget && [this.state.targets.editingTarget]}
                onChange={this.onChange}
                openNewSprite={this.props.openNewSprite}
                openNewCostume={this.props.openNewCostume}
                openNewBackdrop={this.props.openNewBackdrop}
                sprites={this.state.targets.targetList.map(target => (
                    {
                        id: target[0],
                        name: target[1]
                    }
                ))}
                {...props}
            />
        );
    }
}

SpriteSelector.propTypes = {
    vm: React.PropTypes.object.isRequired,
    openNewSprite: React.PropTypes.func,
    openNewCostume: React.PropTypes.func,
    openNewBackdrop: React.PropTypes.func
};

module.exports = SpriteSelector;
