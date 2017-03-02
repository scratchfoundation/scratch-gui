const bindAll = require('lodash.bindall');
const React = require('react');

const SpriteInfoComponent = require('../components/sprite-info/sprite-info.jsx');

class SpriteInfo extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeName',
            'handleChangeX',
            'handleChangeY',
            'handleClickVisible',
            'handleClickNotVisible',
            'handleClickDraggable',
            'handleClickNotDraggable'
        ]);
    }
    handleChangeName (e) {
        this.props.onChangeName(e.target.value);
    }
    handleChangeX (e) {
        let x = e.target.value;
        if (x === '-') x = -1;
        if (isNaN(x)) return;
        this.props.onChangeX(x);
    }
    handleChangeY (e) {
        let y = e.target.value;
        if (y === '-') y = -1;
        if (isNaN(y)) return;
        this.props.onChangeY(y);
    }
    handleClickVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(true);
    }
    handleClickNotVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(false);
    }
    handleClickDraggable (e) {
        e.preventDefault();
        this.props.onChangeDraggability(true);
    }
    handleClickNotDraggable (e) {
        e.preventDefault();
        this.props.onChangeDraggability(false);
    }
    render () {
        return (
            <SpriteInfoComponent
                onChangeName={this.handleChangeName}
                onChangeX={this.handleChangeX}
                onChangeY={this.handleChangeY}
                onClickDraggable={this.handleClickDraggable}
                onClickNotDraggable={this.handleClickNotDraggable}
                onClickVisible={this.handleClickVisible}
                onClickNotVisible={this.handleClickNotVisible}
                {...this.props}
            />
        );
    }
}

SpriteInfo.propTypes = {
    onChangeDraggability: React.PropTypes.func,
    onChangeName: React.PropTypes.func,
    onChangeVisibility: React.PropTypes.func,
    onChangeX: React.PropTypes.func,
    onChangeY: React.PropTypes.func,
};

module.exports = SpriteInfo;
