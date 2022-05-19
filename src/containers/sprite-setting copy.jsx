import React from 'react'
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import { injectIntl } from 'react-intl';
import { STAGE_SIZE_MODES } from '../lib/layout-constants';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import { connect } from 'react-redux';
import VM from 'scratch-vm';
import TargetPane from './target-pane.jsx';
import Box from '../components/box/box.jsx';
import Stage from './stage.jsx';



// eslint-disable-next-line react/prefer-stateless-function


class SpriteSetting extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, [])
        this.state = {}

    }



    render() {
        return (
            <div style={{ height: '80%', width: '100%', background: 'yellow', display: 'flex' }}>
                <div style={{ height: '100%', width: '50%', background: 'red', margin: '0.5%' }}>
                    <Box >
                        <TargetPane
                            stageSize={this.props.stageSize}
                            vm={this.props.vm}
                        />
                    </Box>
                </div>
                <div style={{ height: '100%', width: '50%', background: 'green', margin: '0.5%' }}>
                
                <Stage
                                isFullScreen={true}
                                stageSize={STAGE_SIZE_MODES.large}
                                vm={this.props.vm}
                            />
                </div>
            </div>
        )
    }
}

SpriteSetting.propTypes = {
    stageSize: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired,
    isFullScreen: PropTypes.bool,
    isRtl: PropTypes.bool,

}

const mapStateToProps = state => ({
    stageSize: state.scratchGui.stageSize.stageSize
});

const mapDispatchToProps = dispatch => ({});

export default errorBoundaryHOC('Edit Sprite Tab')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(SpriteSetting))
)