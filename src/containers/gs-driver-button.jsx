import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import lan from '../../mycode/language/Local'

import ButtonComponent from '../components/button/button.jsx';

class GsDriverButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick () {
        SEP.App.driver();
    }
    render () {
        const {
            ...props
        } = this.props;
        return (
            <ButtonComponent
                onClick={this.handleClick}
                {...props}
            >
                {lan.data.gui_menu_driver }
            </ButtonComponent>
        );
    }
}

GsDriverButton.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(GsDriverButton);
