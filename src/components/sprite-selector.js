const bindAll = require('lodash.bindall');
const React = require('react');

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
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 10,
                }}
            >
                <select
                    multiple
                    value={[this.state.targets.editingTarget]}
                    onChange={this.onChange}

                >
                    {this.state.targets.targetList.map(
                        target => <option value={target[0]} key={target[0]}>{target[1]}</option>
                    )}
                </select>
            </div>

        );
    }
}

SpriteSelector.propTypes = {
    vm: React.PropTypes.object.isRequired
};

module.exports = SpriteSelector;
