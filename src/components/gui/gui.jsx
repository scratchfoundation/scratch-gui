const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const VM = require('scratch-vm');

const shapeFromPropTypes = require('../../lib/shape-from-prop-types');

const Blocks = require('../../containers/blocks.jsx');
const GreenFlag = require('../../containers/green-flag.jsx');
const TargetPane = require('../../containers/target-pane.jsx');
const Stage = require('../../containers/stage.jsx');
const StopAll = require('../../containers/stop-all.jsx');

const Box = require('../box/box.jsx');

const GUIComponent = props => {
    let {
        basePath,
        blocksProps,
        children,
        greenFlagProps,
        targetPaneProps,
        stageProps,
        stopAllProps,
        vm
    } = props;
    blocksProps = defaultsDeep({}, blocksProps, {
        options: {
            media: `${basePath}static/blocks-media/`
        }
    });
    if (children) {
        return (
            <Box>
                {children}
            </Box>
        );
    }
    return (
        <Box
            grow={1}
            height="100%"
            style={{overflow: 'hidden'}}
        >
            <Box
                direction="column"
                grow={1}
                shrink={0}
                width={600}
            >
                <Box
                    height={32}
                    style={{
                        marginTop: 8
                    }}
                />
                <Blocks
                    grow={1}
                    vm={vm}
                    {...blocksProps}
                />
            </Box>
            <Box
                direction="column"
                shrink={0}
                width={480}
            >
                <Box
                    alignItems="center"
                    height={32}
                    shrink={0}
                    style={{
                        marginTop: 8
                    }}
                >
                    <GreenFlag
                        vm={vm}
                        {...greenFlagProps}
                    />
                    <StopAll
                        vm={vm}
                        {...stopAllProps}
                    />
                </Box>
                <Stage
                    shrink={0}
                    vm={vm}
                    {...stageProps}
                />
                <TargetPane
                    grow={1}
                    vm={vm}
                    {...targetPaneProps}
                />
            </Box>
        </Box>
    );
};
GUIComponent.propTypes = {
    basePath: React.PropTypes.string,
    blocksProps: shapeFromPropTypes(Blocks.propTypes, {omit: ['vm']}),
    children: React.PropTypes.node,
    greenFlagProps: shapeFromPropTypes(GreenFlag.propTypes, {omit: ['vm']}),
    stageProps: shapeFromPropTypes(Stage.propTypes, {omit: ['vm']}),
    stopAllProps: shapeFromPropTypes(StopAll.propTypes, {omit: ['vm']}),
    targetPaneProps: shapeFromPropTypes(TargetPane.propTypes, {omit: ['vm']}),
    vm: React.PropTypes.instanceOf(VM)
};
GUIComponent.defaultProps = {
    basePath: '/',
    blocksProps: {},
    greenFlagProps: {},
    targetPaneProps: {},
    stageProps: {},
    stopAllProps: {},
    vm: new VM()
};
module.exports = GUIComponent;
