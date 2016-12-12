const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const VM = require('scratch-vm');

const MediaLibrary = require('../../lib/media-library');
const shapeFromPropTypes = require('../../lib/shape-from-prop-types');

const Blocks = require('../../containers/blocks.jsx');
const GreenFlag = require('../../containers/green-flag.jsx');
const TargetPane = require('../../containers/target-pane.jsx');
const Stage = require('../../containers/stage.jsx');
const StopAll = require('../../containers/stop-all.jsx');

const styles = require('./gui.css');

const GUIComponent = props => {
    let {
        basePath,
        blocksProps,
        children,
        greenFlagProps,
        mediaLibrary,
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
            <div className={styles.gui}>
                {children}
            </div>
        );
    }
    return (
        <div className={styles.gui}>
            <GreenFlag
                vm={vm}
                {...greenFlagProps}
            />
            <StopAll
                vm={vm}
                {...stopAllProps}
            />
            <Stage
                vm={vm}
                {...stageProps}
            />
            <TargetPane
                mediaLibrary={mediaLibrary}
                vm={vm}
                {...targetPaneProps}
            />
            <Blocks
                vm={vm}
                {...blocksProps}
            />
        </div>
    );
};

GUIComponent.propTypes = {
    basePath: React.PropTypes.string,
    blocksProps: shapeFromPropTypes(Blocks.propTypes, {omit: ['vm']}),
    children: React.PropTypes.node,
    greenFlagProps: shapeFromPropTypes(GreenFlag.propTypes, {omit: ['vm']}),
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    stageProps: shapeFromPropTypes(Stage.propTypes, {omit: ['vm']}),
    stopAllProps: shapeFromPropTypes(StopAll.propTypes, {omit: ['vm']}),
    targetPaneProps: shapeFromPropTypes(TargetPane.propTypes, {omit: ['vm']}),
    vm: React.PropTypes.instanceOf(VM)
};

GUIComponent.defaultProps = {
    basePath: '/',
    blocksProps: {},
    greenFlagProps: {},
    mediaLibrary: new MediaLibrary(),
    targetPaneProps: {},
    stageProps: {},
    stopAllProps: {},
    vm: new VM()
};

module.exports = GUIComponent;
