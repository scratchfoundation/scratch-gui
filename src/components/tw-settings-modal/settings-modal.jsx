import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import FancyCheckbox from '../tw-fancy-checkbox/checkbox.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import styles from './settings-modal.css';

/* eslint-disable react/no-multi-comp */

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    title: {
        defaultMessage: 'Advanced Settings',
        description: 'Title of settings modal',
        id: 'tw.settingsModal.title'
    },
    help: {
        defaultMessage: 'Click for help',
        description: 'Hover text of help icon in settings',
        id: 'tw.stetingsModal.help'
    }
});

const Setting = ({active, children}) => (
    <Box
        className={classNames(styles.setting, {
            [styles.active]: active
        })}
    >
        {children}
    </Box>
);
Setting.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node
};

class BooleanSetting extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickHelp'
        ]);
        this.state = {
            helpVisible: this.props.value
        };
    }
    componentDidUpdate (prevProps) {
        if (this.props.value && !prevProps.value) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                helpVisible: true
            });
        }
    }
    handleClickHelp () {
        this.setState(prevState => ({
            helpVisible: !prevState.helpVisible
        }));
    }
    render () {
        const {
            value,
            onChange,
            children
        } = this.props;
        const {helpVisible} = this.state;
        const childrenList = React.Children.toArray(children);
        const hasHelp = childrenList.length > 1;
        return (
            <Setting active={!!value}>
                <div className={styles.label}>
                    <label className={styles.label}>
                        <FancyCheckbox
                            type="checkbox"
                            className={styles.checkbox}
                            checked={value}
                            onChange={onChange}
                        />
                        {childrenList[0]}
                    </label>
                    {hasHelp && <button
                        className={styles.helpIcon}
                        onClick={this.handleClickHelp}
                        title={this.props.intl.formatMessage(messages.help)}
                    />}
                </div>
                {hasHelp && helpVisible && <div className={styles.detail}>
                    {childrenList[1]}
                </div>}
            </Setting>
        );
    }
}
BooleanSetting.propTypes = {
    intl: intlShape,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};
const WrappedBooleanSetting = injectIntl(BooleanSetting);

const HighQualityPen = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="High Quality Pen"
            description="High quality pen setting"
            id="tw.settingsModal.highQualityPen"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="High Quality Pen makes the pen layer dynamically increase in resolution to match the size it's displayed instead of always being 480×360, which can make pen projects render higher quality images. Not all projects benefit from this setting, and it may impact performance."
                    description="High quality pen setting help"
                    id="tw.settingsModal.highQualityPenHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const Interpolation = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Interpolation"
            description="Interpolation setting"
            id="tw.settingsModal.interpolation"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Interpolation is an experimental feature that makes project appear to run at higher framerates without changing their behavior by interpolation motion. If you've ever run a project at 60 FPS and noticed that it's running too fast, that's what interpolation solves."
                    description="Interpolation setting help"
                    id="tw.settingsModal.interpolationHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const InfiniteClones = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Infinite Clones"
            description="Infinite Clones setting"
            id="tw.settingsModal.infiniteClones"
        />
        <div>
            <p>
                <FormattedMessage
                    defaultMessage="Disables Scratch's 300 clone limit."
                    description="Infinite Clones setting help"
                    id="tw.settingsModal.infiniteClonesHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const RemoveFencing = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Remove Fencing"
            description="Remove Fencing setting"
            id="tw.settingsModal.removeFencing"
        />
        <div>
            <p>
                <FormattedMessage
                    defaultMessage="Allows sprites to move offscreen."
                    description="Remove Fencing setting help"
                    id="tw.settingsModal.removeFencingHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const RemoveMiscLimits = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Remove Miscellaneous Limits"
            description="Remove Limits setting"
            id="tw.settingsModal.removeMiscLimits"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Remove various limits that are unlikely to break projects: sound effect limits, etc."
                    description="Remove Limits setting help"
                    id="tw.settingsModal.removeMiscLimitsHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const WarpTimer = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Warp Timer"
            description="Warp Timer setting"
            id="tw.settingsModal.warpTimer"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Warp Timer makes scripts check if they are stuck in a long or infinite loop and run at a low framerate (2 fps) instead of getting completely stuck until the loop finishes. This fixes many crashes."
                    description="Warp Timer help"
                    id="tw.settingsModal.warpTimerHelp"
                />
            </p>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="This has a significant performance impact, so it's not enabled by default outside of the editor."
                    description="Warp Timer help"
                    id="tw.settingsModal.warpTimerHelp2"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const DisableCompiler = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Disable Compiler"
            description="Disable Compiler setting"
            id="tw.settingsModal.disableCompiler"
        />
        <div>
            <p>
                <FormattedMessage
                    defaultMessage="Disables the TurboWarp compiler. You probably do not want to enable this."
                    description="Disable Compiler help"
                    id="tw.settingsModal.disableCompilerHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const CustomStageSize = ({
    customStageSizeEnabled,
    stageWidth,
    onStageWidthChange,
    stageHeight,
    onStageHeightChange
}) => (
    <Setting active={customStageSizeEnabled}>
        <div className={classNames(styles.label, styles.customStageSize)}>
            <span>
                <FormattedMessage
                    defaultMessage="Custom Stage Size:"
                    description="Custom Stage Size option"
                    id="tw.settingsModal.customStageSize"
                />
            </span>
            <BufferedInput
                value={stageWidth}
                onSubmit={onStageWidthChange}
                type="number"
                min="0"
                max="4096"
                step="1"
            />
            <span>{'×'}</span>
            <BufferedInput
                value={stageHeight}
                onSubmit={onStageHeightChange}
                type="number"
                min="0"
                max="4096"
                step="1"
            />
        </div>
    </Setting>
);
CustomStageSize.propTypes = {
    customStageSizeEnabled: PropTypes.bool,
    stageWidth: PropTypes.number,
    onStageWidthChange: PropTypes.func,
    stageHeight: PropTypes.number,
    onStageHeightChange: PropTypes.func
};

const Header = props => (
    <div className={styles.header}>
        {props.children}
        <div className={styles.divider} />
    </div>
);
Header.propTypes = {
    children: PropTypes.node
};

const SettingsModalComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="settingsModal"
    >
        <Box className={styles.body}>
            <p className={styles.info}>
                <FormattedMessage
                    defaultMessage="Settings will automatically be stored in the page URL. {additionalHelp}"
                    description="Part of the settings modal"
                    id="tw.settingsModal.url"
                    values={{
                        additionalHelp: (
                            <a
                                href="https://github.com/TurboWarp/scratch-gui/wiki/Advanced-Settings"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FormattedMessage
                                    defaultMessage="Additional help"
                                    description="Link to advanced settings on the wiki"
                                    id="tw.settingsModal.moreHelp"
                                />
                            </a>
                        )
                    }}
                />
            </p>
            <Header>
                <FormattedMessage
                    defaultMessage="Recommended"
                    description="Settings modal section"
                    id="tw.settingsModal.recommended"
                />
            </Header>
            <Interpolation
                value={props.interpolation}
                onChange={props.onInterpolationChange}
            />
            <HighQualityPen
                value={props.highQualityPen}
                onChange={props.onHighQualityPenChange}
            />
            <WarpTimer
                value={props.warpTimer}
                onChange={props.onWarpTimerChange}
            />
            <Header>
                <FormattedMessage
                    defaultMessage="Remove Limits"
                    description="Settings modal section"
                    id="tw.settingsModal.removeLimits"
                />
            </Header>
            <InfiniteClones
                value={props.infiniteClones}
                onChange={props.onInfiniteClonesChange}
            />
            <RemoveFencing
                value={props.removeFencing}
                onChange={props.onRemoveFencingChange}
            />
            <RemoveMiscLimits
                value={props.removeLimits}
                onChange={props.onRemoveLimitsChange}
            />
            <Header>
                <FormattedMessage
                    defaultMessage="Danger Zone"
                    description="Settings modal section"
                    id="tw.settingsModal.dangerZone"
                />
            </Header>
            <DisableCompiler
                value={props.disableCompiler}
                onChange={props.onDisableCompilerChange}
            />
            <CustomStageSize
                {...props}
            />
        </Box>
    </Modal>
);

SettingsModalComponent.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func,
    reloadRequired: PropTypes.bool,
    highQualityPen: PropTypes.bool,
    onHighQualityPenChange: PropTypes.func,
    interpolation: PropTypes.bool,
    onInterpolationChange: PropTypes.func,
    infiniteClones: PropTypes.bool,
    onInfiniteClonesChange: PropTypes.func,
    removeFencing: PropTypes.bool,
    onRemoveFencingChange: PropTypes.func,
    removeLimits: PropTypes.bool,
    onRemoveLimitsChange: PropTypes.func,
    warpTimer: PropTypes.bool,
    onWarpTimerChange: PropTypes.func,
    disableCompiler: PropTypes.bool,
    onDisableCompilerChange: PropTypes.func
};

export default injectIntl(SettingsModalComponent);
