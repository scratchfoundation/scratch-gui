const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const SpriteInfoComponent = require('../components/sprite-info/sprite-info.jsx');

class SpriteInfo extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeRotationStyle',
            'handleClickVisible',
            'handleClickNotVisible'
        ]);
    }
    handleChangeRotationStyle (e) {
        this.props.onChangeRotationStyle(e.target.value);
    }
    handleClickVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(true);
    }
    handleClickNotVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(false);
    }
    render () {
        return (
            <SpriteInfoComponent
                {...this.props}
                onChangeRotationStyle={this.handleChangeRotationStyle}
                onClickNotVisible={this.handleClickNotVisible}
                onClickVisible={this.handleClickVisible}
            />
        );
    }
}

SpriteInfo.propTypes = {
    ...SpriteInfoComponent.propTypes,
    onChangeDirection: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeRotationStyle: PropTypes.func,
    onChangeVisibility: PropTypes.func,
    onChangeX: PropTypes.func,
    onChangeY: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

module.exports = SpriteInfo;
