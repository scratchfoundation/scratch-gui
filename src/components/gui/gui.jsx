const React = require('react');
const VM = require('scratch-vm');

const Blocks = require('../../containers/blocks.jsx');
const GreenFlag = require('../../containers/green-flag.jsx');
const TargetPane = require('../../containers/target-pane.jsx');
const Stage = require('../../containers/stage.jsx');
const StopAll = require('../../containers/stop-all.jsx');

const Box = require('../box/box.jsx');

const Tab = require('../tab/tab.jsx');
const TabText = require('../tab/tabText.jsx');

var tabOne = true;
var tabTwo = false;
var tabThree = false;

function toggleTabOne () {
    tabOne = true;
    tabTwo = false;
    tabThree = false;
    props.forceUpdate();
}
function toggleTabTwo () {
    tabOne = false;
    tabTwo = true;
    tabThree = false;
    props.forceUpdate();
}
function toggleTabThree () {
    tabOne = false;
    tabTwo = false;
    tabThree = true;
    props.forceUpdate();
}

const GUIComponent = props => {
    const {
        basePath,
        children,
        vm,
        ...componentProps
    } = props;
    if (children) {
        return (
            <Box {...componentProps}>
                {children}
            </Box>
        );
    }
    return (
        <Box
            grow={1}
            height="100%"
            style={{overflow: 'hidden'}}
            {...componentProps}
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
                >
                    <Box
                        width={250}
                    >
                        <Tab
                            selected={tabOne}
                            onClick={toggleTabOne}
                        >
                            <TabText>Scripts</TabText>
                        </Tab>
                        <Tab
                            selected={tabTwo}
                            onClick={toggleTabTwo}
                        >
                            <TabText>Costumes</TabText>
                        </Tab>
                        <Tab
                            selected={tabThree}
                            onClick={toggleTabThree}
                        >
                            <TabText>Sounds</TabText>
                        </Tab>
                    </Box>
                </Box>
                <Blocks
                    grow={1}
                    options={{
                        media: `${basePath}static/blocks-media/`
                    }}
                    vm={vm}
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
                    <GreenFlag vm={vm} />
                    <StopAll vm={vm} />
                </Box>
                <Stage
                    shrink={0}
                    vm={vm}
                />
                <TargetPane
                    grow={1}
                    vm={vm}
                />
            </Box>
        </Box>
    );
};
GUIComponent.propTypes = {
    basePath: React.PropTypes.string,
    children: React.PropTypes.node,
    vm: React.PropTypes.instanceOf(VM)
};
GUIComponent.defaultProps = {
    basePath: '/',
    vm: new VM()
};
module.exports = GUIComponent;
