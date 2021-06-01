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
        id: 'tw.settingsModal.help'
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
            helpVisible: false
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
                    defaultMessage="High Quality Pen allows pen projects to render at a higher resolution. See {comparison}. It also disables some rounding in the renderer. Not all projects benefit from this setting, and it may impact performance."
                    description="High quality pen setting help"
                    id="tw.settingsModal.highQualityPenHelp"
                    values={{
                        comparison: (
                            <a
                                href="https://github.com/TurboWarp/scratch-gui/wiki/Advanced-Settings#high-quality-pen"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FormattedMessage
                                    defaultMessage="comparison enabled and disabled"
                                    description="High quality pen setting help"
                                    id="tw.settingsModal.highQualityPenHelp.comparison"
                                />
                            </a>
                        )
                    }}
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const CustomFPS = props => (
    <WrappedBooleanSetting
        value={props.framerate !== 30}
        onChange={props.onChange}
    >
        <FormattedMessage
            defaultMessage="60 FPS (Custom FPS)"
            description="FPS setting"
            id="tw.settingsModal.fps"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Runs scripts 60 times per second instead of 30. Most projects will not work properly with this enabled. You should try Interpolation with 60 FPS mode disabled if that is the case. {customFramerate}."
                    description="FPS setting help"
                    id="tw.settingsModal.fpsHelp"
                    values={{
                        customFramerate: (
                            <a
                                onClick={props.onCustomizeFramerate}
                                tabIndex="0"
                            >
                                <FormattedMessage
                                    defaultMessage="Click to use a framerate other than 30 or 60"
                                    description="FPS settings help"
                                    id="tw.settingsModal.fpsHelp.customFramerate"
                                />
                            </a>
                        )
                    }}
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);
CustomFPS.propTypes = {
    framerate: PropTypes.number,
    onChange: PropTypes.func,
    onCustomizeFramerate: PropTypes.func
};

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
                    defaultMessage="Interpolation makes project appear to run at higher framerates by interpolating sprite motion. Unlike 60 FPS mode, this will not make projects run at double their speed. Interpolation should not be used on projects that primarily use pen."
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
                    // eslint-disable-next-line max-len
                    defaultMessage="Allows sprites to move offscreen and become as large or as small as they want."
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
            description="Remove Miscellaneous Limits setting"
            id="tw.settingsModal.removeMiscLimits"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Removes various limits that are unlikely to break projects, such as sound effect limits."
                    description="Remove Miscellaneous Limits setting help"
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
                    defaultMessage="Warp Timer makes scripts check if they are stuck in a long or infinite loop and run at a low framerate instead of getting stuck until the loop finishes, which fixes most crashes. This has a significant performance impact, so it's not enabled by default outside of the editor."
                    description="Warp Timer help"
                    id="tw.settingsModal.warpTimerHelp"
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
                    // eslint-disable-next-line max-len
                    defaultMessage="Disables the TurboWarp compiler. You may want to enable this while editing projects so that scripts update immediately, otherwise you should not enable this."
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
                max="1024"
                step="1"
            />
            <span>{'×'}</span>
            <BufferedInput
                value={stageHeight}
                onSubmit={onStageHeightChange}
                type="number"
                min="0"
                max="1024"
                step="1"
            />
        </div>
        <div>
            {(stageWidth > 1024 || stageHeight > 1024) && (
                <div className={styles.warning}>
                    <FormattedMessage
                        // eslint-disable-next-line max-len
                        defaultMessage="Using a custom stage size this large is not recommended! Instead, use a lower size with the same aspect ratio and let fullscreen mode upscale it to match the user's display."
                        description="Warning about using stages that are too large in settings modal"
                        id="tw.settingsModal.largeStageWarning"
                    />
                </div>
            )}
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

const StoreProjectOptions = ({onStoreProjectOptions}) => (
    <Setting>
        <div>
            <button
                onClick={onStoreProjectOptions}
                className={styles.button}
            >
                <FormattedMessage
                    defaultMessage="Store settings in project (Experimental)"
                    description="Button in settings modal"
                    id="tw.settingsModal.storeProjectOptions"
                />
            </button>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Stores the selected settings in the project so they will be automatically applied when TurboWarp loads this project. Custom stage size and warp timer will not be saved. This is an experimental feature that may be removed."
                    description="Help text for the store settings in project button"
                    id="tw.settingsModal.storeProjectOptionsHelp"
                />
            </p>
        </div>
    </Setting>
);
StoreProjectOptions.propTypes = {
    onStoreProjectOptions: PropTypes.func
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
            <Header>
                <FormattedMessage
                    defaultMessage="Featured"
                    description="Settings modal section"
                    id="tw.settingsModal.featured"
                />
            </Header>
            <CustomFPS
                framerate={props.framerate}
                onChange={props.onFramerateChange}
                onCustomizeFramerate={props.onCustomizeFramerate}
            />
            <Interpolation
                value={props.interpolation}
                onChange={props.onInterpolationChange}
            />
            {(props.framerate === 60 && props.interpolation) && (
                <div className={styles.warning}>
                    <FormattedMessage
                        // eslint-disable-next-line max-len
                        defaultMessage="Using 60 FPS and interpolation together can cause unexpected behavior. You most likely want to enable just 60 FPS or just interpolation, not both. If you're not sure which to use, try interpolation first."
                        description="Settings modal warning when both 60 FPS mode and interpolation are enabled"
                        id="tw.settingsModal.interp60Warning"
                    />
                </div>
            )}
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
            <CustomStageSize
                {...props}
            />
            <DisableCompiler
                value={props.disableCompiler}
                onChange={props.onDisableCompilerChange}
            />
            <StoreProjectOptions
                {...props}
            />
        </Box>
    </Modal>
);

SettingsModalComponent.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func,
    reloadRequired: PropTypes.bool,
    framerate: PropTypes.number,
    onFramerateChange: PropTypes.func,
    onCustomizeFramerate: PropTypes.func,
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
