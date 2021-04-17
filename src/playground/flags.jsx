import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import bindAll from 'lodash.bindall';
import {FormattedMessage} from 'react-intl';

import MenuBar from '../components/menu-bar/menu-bar.jsx';
import Box from '../components/box/box.jsx';
import Input from '../components/forms/input.jsx';
import Modal from '../components/webgl-modal/webgl-modal.jsx';
import ListMonitorComponent from '../components/monitor/list-monitor.jsx';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import {setProjectTitle} from '../reducers/project-title';

import parseOptionsFromUrl from './parse-url-options.js';

import scratchLogo from '../components/menu-bar/scratch-logo.svg';
import styles from './flags.css';

const Field = ({children, default: defaultDescription, ...props}) => (
    <p>
        <label>
            <span className={styles.label}>{children}</span>
            <Input {...props} />
            {defaultDescription && <span className={styles.default}>
                {`(default: ${defaultDescription})`}
            </span>}
        </label>
    </p>
);
const Toggle = ({children, ...props}) => (
    <p>
        <label>
            <input
                type="checkbox"
                {...props}
            />
            <span className={styles.label}>{children}</span>
        </label>
    </p>
);
class List extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleActivate',
            'handleDeactivate',
            'handleInput',
            'handleRemove',
            'handleKeyPress',
            'handleFocus',
            'handleAdd'
        ]);

        this.state = {
            activeIndex: null,
            activeValue: null
        };
    }

    handleActivate (index) {
        // Do nothing if activating the currently active item
        if (this.state.activeIndex === index) {
            return;
        }

        this.setState({
            activeIndex: index,
            activeValue: this.props.value[index]
        });
    }

    handleDeactivate () {
        // Submit any in-progress value edits on blur
        if (this.state.activeIndex !== null) {
            const newListValue = this.props.value.slice();
            newListValue[this.state.activeIndex] = this.state.activeValue;
            this.props.onChange(newListValue);
            this.setState({activeIndex: null, activeValue: null});
        }
    }

    handleFocus (e) {
        // Select all the text in the input when it is focused.
        e.target.select();
    }

    handleKeyPress (e) {
        // Special case for tab, arrow keys and enter.
        // Tab / shift+tab navigate down / up the list.
        // Arrow down / arrow up navigate down / up the list.
        // Enter / shift+enter insert new blank item below / above.
        const previouslyActiveIndex = this.state.activeIndex;
        const {vm, targetId, id: variableId} = this.props;

        let navigateDirection = 0;
        if (e.key === 'Tab') navigateDirection = e.shiftKey ? -1 : 1;
        else if (e.key === 'ArrowUp') navigateDirection = -1;
        else if (e.key === 'ArrowDown') navigateDirection = 1;
        if (navigateDirection) {
            this.handleDeactivate(); // Submit in-progress edits
            const newIndex = this.wrapListIndex(previouslyActiveIndex + navigateDirection, this.props.value.length);
            this.setState({
                activeIndex: newIndex,
                activeValue: this.props.value[newIndex]
            });
            e.preventDefault(); // Stop default tab behavior, handled by this state change
        } else if (e.key === 'Enter') {
            // Submit in-progress edits
            const listValue = this.props.value.slice();
            listValue[this.state.activeIndex] = this.state.activeValue;
            const newListItemValue = ''; // Enter adds a blank item
            const newValueOffset = e.shiftKey ? 0 : 1; // Shift-enter inserts above
            const newListValue = listValue.slice(0, previouslyActiveIndex + newValueOffset)
                .concat([newListItemValue])
                .concat(listValue.slice(previouslyActiveIndex + newValueOffset));
            this.props.onChange(newListValue);
            const newIndex = this.wrapListIndex(previouslyActiveIndex + newValueOffset, newListValue.length);
            this.setState({
                activeIndex: newIndex,
                activeValue: newListItemValue
            });
            e.preventDefault();
        }
    }

    handleInput (e) {
        this.setState({activeValue: e.target.value});
    }

    handleRemove (e) {
        e.preventDefault(); // Default would blur input, prevent that.
        e.stopPropagation(); // Bubbling would activate, which will be handled here
        const newListValue = this.props.value.slice(0, this.state.activeIndex)
            .concat(this.props.value.slice(this.state.activeIndex + 1));
        this.props.onChange(newListValue);
        const newActiveIndex = Math.min(newListValue.length - 1, this.state.activeIndex);
        this.setState({
            activeIndex: newActiveIndex,
            activeValue: newListValue[newActiveIndex]
        });
    }

    handleAdd () {
        // Add button appends a blank value and switches to it
        const newListValue = this.props.value.concat(['']);
        this.props.onChange([...this.props.value, '']);
        this.setState({activeIndex: newListValue.length - 1, activeValue: ''});
    }

    wrapListIndex (index, length) {
        return (index + length) % length;
    }

    render () {
        return (
            <Box
                className={styles.monitorContainer}
            >
                <ListMonitorComponent
                    activeIndex={this.state.activeIndex}
                    activeValue={this.state.activeValue}
                    onActivate={this.handleActivate}
                    onAdd={this.handleAdd}
                    onDeactivate={this.handleDeactivate}
                    onFocus={this.handleFocus}
                    onInput={this.handleInput}
                    onKeyPress={this.handleKeyPress}
                    onRemove={this.handleRemove}
                    categoryColor="#9966ff"
                    width={428}
                    draggable={true}
                    {...this.props}
                />
            </Box>
        );
    }
}

class Flags extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSubmit',
            'handleClickLogo',
            'handleClickAbout',
            'handleChangeLoadGriffpatch',
            'handleChangeLoadPlugins',
            'handleChangeCloudHost',
            'handleChangeUsername',
            'handleChangeCompatibilityMode',
            'handleChangeExtensionURLs',
            'handleChangeImposeLimits',
            'handleChangeWidth',
            'handleChangeHeight'
        ]);
        this.props.setTitle('E羊icques URL settings');

        const {
            loadGriffpatch = false,
            loadPlugins = [],
            cloudHost = '',
            username = 'username',
            compatibilityMode = true,
            extensionURLs = [],
            imposeLimits = true,
            width = 480,
            height = 360
        } = parseOptionsFromUrl();
        this.state = {
            loadGriffpatch,
            loadPlugins,
            cloudHost,
            username,
            compatibilityMode,
            extensionURLs,
            imposeLimits,
            width,
            height
        };
    }
    handleSubmit (e) {
        e.preventDefault();

        const {
            loadGriffpatch,
            loadPlugins,
            cloudHost,
            username,
            compatibilityMode,
            extensionURLs,
            imposeLimits,
            width,
            height
        } = this.state;
        const params = `?width=${width}&height=${height}`
            + `&username=${encodeURIComponent(username)}`
            + `&cloud_host=${encodeURIComponent(cloudHost.replace(/^ws?s:\/\//, ''))}`
            + `&compatibility_mode=${compatibilityMode}&limits=${imposeLimits}`
            + `&load_griffpatch=${loadGriffpatch}`
            + extensionURLs.map(url => `&extension=${encodeURIComponent(url)}`).join('')
            + loadPlugins.map(url => `&load_plugin=${encodeURIComponent(url)}`).join('');
        window.location.href = './index.html' + params + window.location.hash;
    }
    handleClickLogo () {
        window.location.href = window.location.href.replace(/flags(\.html)?/, '');
    }
    handleClickAbout () {
        window.location.href = 'https://github.com/SheepTester/scratch-gui#readme';
    }
    handleChangeLoadGriffpatch (e) {
        this.setState({loadGriffpatch: e.target.value});
    }
    handleChangeLoadPlugins (list) {
        this.setState({loadPlugins: list});
    }
    handleChangeCloudHost (e) {
        this.setState({cloudHost: e.target.value});
    }
    handleChangeUsername (e) {
        this.setState({username: e.target.value});
    }
    handleChangeCompatibilityMode (e) {
        this.setState({compatibilityMode: e.target.checked});
    }
    handleChangeExtensionURLs (list) {
        this.setState({extensionURLs: list});
    }
    handleChangeImposeLimits (e) {
        this.setState({imposeLimits: e.target.checked});
    }
    handleChangeWidth (e) {
        this.setState({width: +e.target.value});
    }
    handleChangeHeight (e) {
        this.setState({height: +e.target.value});
    }
    render () {
        const {
            isRtl,
            projectTitle,
            setTitle,
            ...componentProps
        } = this.props;
        const {
            loadGriffpatch,
            loadPlugins,
            cloudHost,
            username,
            compatibilityMode,
            extensionURLs,
            imposeLimits,
            width,
            height
        } = this.state;
        return (
            <Box
                className={styles.pageWrapper}
                dir={isRtl ? 'rtl' : 'ltr'}
                {...componentProps}
            >
                <MenuBar
                    accountNavOpen={false}
                    authorId="what do I put here lol"
                    authorThumbnailUrl="static/favicon.svg"
                    authorUsername="SheepTester"
                    canChangeLanguage={false}
                    canCreateCopy={false}
                    canCreateNew={false}
                    canEdit={false}
                    canEditTitle={false}
                    canManageFiles={false}
                    canRemix={false}
                    canSave={false}
                    canShare={false}
                    className={styles.menuBarPosition}
                    enableCommunity={false}
                    isShared={false}
                    logo={scratchLogo}
                    renderLogin={console.log}
                    showComingSoon={false}
                    onClickAbout={this.handleClickAbout}
                    onClickLogo={this.handleClickLogo}
                />
                <form className={styles.content} onSubmit={this.handleSubmit}>
                    <h2>URL settings</h2>
                    <Field value={width} onChange={this.handleChangeWidth} default="480" type="number" name="width">
                        Stage width
                    </Field>
                    <Field value={height} onChange={this.handleChangeHeight} default="360" type="number" name="height">
                        Stage height
                    </Field>
                    <Toggle checked={imposeLimits} onChange={this.handleChangeImposeLimits} name="limits">
                        Enforce reasonable limits?
                        <sup>[1]</sup>
                    </Toggle>
                    <Toggle checked={compatibilityMode} onChange={this.handleChangeCompatibilityMode} name="compatibility_mode">
                        Compatibility mode?
                        <sup>[2]</sup>
                    </Toggle>
                    <List
                        label="Extensions"
                        value={extensionURLs}
                        onChange={this.handleChangeExtensionURLs}
                    />
                    <Toggle checked={loadGriffpatch} onChange={this.handleChangeLoadGriffpatch} name="load_griffpatch">
                        <FormattedMessage
                            defaultMessage="Load Griffpatch's {previewFaqLink}?"
                            description="Scratch 3.0 FAQ description"
                            id="gui.aaab.zz"
                            values={{
                                previewFaqLink: (
                                    <a
                                        className={styles.faqLink}
                                        href="https://github.com/griffpatch/Scratch3-Dev-Tools"
                                    >
                                        <FormattedMessage
                                            defaultMessage="Scratch 3 Dev Tools"
                                            description="link to Scratch 3.0 FAQ page"
                                            id="gui.aaab.z1"
                                        />
                                    </a>
                                )
                            }}
                        />
                    </Toggle>
                    <Field value={username} onChange={this.handleChangeUsername} default={'"username"'} type="text" name="username">
                        Username
                    </Field>
                    <List
                        label="Custom editor scripts"
                        value={loadPlugins}
                        onChange={this.handleChangeLoadPlugins}
                    />
                    <Field value={cloudHost} onChange={this.handleChangeCloudHost} default="saves cloud variables to localStorage" type="text" name="cloud_host">
                        Custom cloud host
                        <sup>[3]</sup>
                    </Field>
                    <Box className={styles.buttonRow}>
                        <button
                            type="submit"
                            className={styles.backButton}
                        >
                            Done
                        </button>
                    </Box>

                    <h2>More information</h2>
                    <p>
                        <sup>[1]</sup>
                        The following limits are removed if the limits option is disabled:
                    </p>
                    <ul>
                        <li>Fencing of a sprite's position and size</li>
                        <li>Maximum clone count</li>
                        <li>List length</li>
                        <li>Pen size</li>
                        <li>Sound effects</li>
                        <li>Mouse X/Y</li>
                        <li>Say/think bubble length</li>
                        <li>Simultaneous sounds</li>
                        <li>Notes</li>
                        <li>Tempo</li>
                    </ul>
                    <p>
                        <sup>[2]</sup>
                        Compatibility mode makes projects run at 30 fps. When
                        disabled, projects will run at 60 fps.
                    </p>
                    <p>
                        <sup>[3]</sup>
                        Use a custom cloud host instead of the default
                        behaviour, which is to save cloud variables to
                        localStorage. Note that for some reason, Scratch doesn't
                        want you to include the protocol (ie, omit
                        <code>ws://</code> or <code>wss://</code>).
                        <FormattedMessage
                            defaultMessage=" Also, unless you use the {previewFaqLink}, the cloud server cannot be {code} unless it's on localhost because this site is on HTTPS."
                            description="Scratch 3.0 FAQ description"
                            id="gui.aaab.zzweee"
                            values={{
                                previewFaqLink: (
                                    <a
                                        className={styles.faqLink}
                                        href="https://github.com/SheepTester/scratch-gui/archive/gh-pages.zip"
                                    >
                                        <FormattedMessage
                                            defaultMessage="offline mod"
                                            description="link to Scratch 3.0 FAQ page"
                                            id="gui.aaab.z21"
                                        />
                                    </a>
                                ),
                                code: (
                                    <code>ws://</code>
                                )
                            }}
                        />
                    </p>
                    <div className={styles.faqLinkText}>
                        <FormattedMessage
                            defaultMessage="See {previewFaqLink} for a list of additional features in E羊icques."
                            description="Scratch 3.0 FAQ description"
                            id="gui.aaaa.previewfaq"
                            values={{
                                previewFaqLink: (
                                    <a
                                        className={styles.faqLink}
                                        href="https://github.com/SheepTester/scratch-gui#other-features"
                                    >
                                        <FormattedMessage
                                            defaultMessage="Github"
                                            description="link to Scratch 3.0 FAQ page"
                                            id="gui.aaaa.previewfaqlinktext"
                                        />
                                    </a>
                                )
                            }}
                        />
                    </div>
                </form>
            </Box>
        );
    }
}

const mapStateToProps = state => ({
    projectTitle: state.scratchGui.projectTitle
});

const mapDispatchToProps = dispatch => ({
    setTitle: title => dispatch(setProjectTitle(title))
});

const WrappedFlags = AppStateHOC(connect(
    mapStateToProps,
    mapDispatchToProps
)(Flags));

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<WrappedFlags />, appTarget);
