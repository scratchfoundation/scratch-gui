/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import addons, {unsupportedAddons} from '../addon-manifests';
import getAddonTranslations from '../get-addon-translations';
import settingsTranslationsEnglish from './l10n/en.json';
import settingsTranslationsOther from './l10n/translations.json';
import upstreamMeta from '../upstream-meta.json';
import {detectLocale} from '../../lib/detect-locale';
import {getInitialDarkMode} from '../../lib/tw-theme-hoc.jsx';
import SettingsStore from '../settings-store-singleton';
import extensionImageWhite from './extension-white.svg';
import extensionImageBlack from './extension-black.svg';
import brushImageWhite from './brush-white.svg';
import brushImageBlack from './brush-black.svg';
import eggImageWhite from './egg-white.svg';
import eggImageBlack from './egg-black.svg';
import undoImageWhite from './undo-white.svg';
import undoImageBlack from './undo-black.svg';
import infoImage from './info.svg';
import styles from './settings.css';
import '../polyfill';
import '../../lib/normalize.css';

/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-bind */

const locale = detectLocale(upstreamMeta.languages);
const addonTranslations = getAddonTranslations(locale);
const settingsTranslations = settingsTranslationsEnglish;
document.documentElement.lang = locale;
if (locale !== 'en') {
    const messages = settingsTranslationsOther[locale] || settingsTranslationsOther[locale.split('-')[0]];
    if (messages) {
        Object.assign(settingsTranslations, messages);
    }
}

document.title = `${settingsTranslations['tw.addons.settings.title']} - TurboWarp`;

const theme = getInitialDarkMode() ? 'dark' : 'light';
document.body.setAttribute('theme', theme);

const sortAddons = () => {
    const sortedOrder = Object.keys(addons).sort((aId, bId) => {
        const aNew = addons[aId].tags && addons[aId].tags.includes('new');
        const bNew = addons[bId].tags && addons[bId].tags.includes('new');
        if (aNew && !bNew) return -1;
        if (bNew && !aNew) return 1;
        return 0;
    });
    const result = {};
    for (const key of sortedOrder) {
        result[key] = addons[key];
    }
    return result;
};

const AddonCredits = ({credits}) => (
    credits.map((author, index) => {
        const isLast = index === credits.length - 1;
        return (
            <span
                className={styles.credit}
                key={index}
            >
                {author.link ? (
                    <a
                        href={author.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {author.name}
                    </a>
                ) : (
                    <span>
                        {author.name}
                    </span>
                )}
                {isLast ? null : ', '}
            </span>
        );
    })
);
AddonCredits.propTypes = {
    credits: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string
    }))
};

const Switch = ({onChange, value, ...props}) => (
    <button
        className={styles.switch}
        state={value ? 'on' : 'off'}
        role="checkbox"
        aria-checked={value ? 'true' : 'false'}
        tabIndex="0"
        onClick={() => onChange(!value)}
        {...props}
    />
);
Switch.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool
};

const Select = ({
    onChange,
    value,
    values
}) => (
    <div className={styles.select}>
        {values.map(potentialValue => {
            const id = potentialValue.id;
            const selected = id === value;
            return (
                <button
                    key={id}
                    onClick={() => onChange(id)}
                    className={classNames(styles.selectOption, {[styles.selected]: selected})}
                >
                    {potentialValue.name}
                </button>
            );
        })}
    </div>
);
Select.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }))
};

const Tags = ({tags}) => tags.length > 0 && (
    <span className={styles.tagContainer}>
        {tags.includes('recommended') && (
            <span className={classNames(styles.tag, styles.tagRecommended)}>
                {settingsTranslations['tw.addons.settings.tags.recommended']}
            </span>
        )}
        {tags.includes('theme') && (
            <span className={classNames(styles.tag, styles.tagTheme)}>
                {settingsTranslations['tw.addons.settings.tags.theme']}
            </span>
        )}
        {tags.includes('beta') && (
            <span className={classNames(styles.tag, styles.tagBeta)}>
                {settingsTranslations['tw.addons.settings.tags.beta']}
            </span>
        )}
        {tags.includes('easterEgg') && (
            <span className={classNames(styles.tag, styles.tagEasterEgg)}>
                {settingsTranslations['tw.addons.settings.tags.easterEgg']}
            </span>
        )}
        {tags.includes('new') && (
            <span className={classNames(styles.tag, styles.tagNew)}>
                {settingsTranslations['tw.addons.settings.tags.new']}
            </span>
        )}
        {tags.includes('turbowarp') && (
            <span className={classNames(styles.tag, styles.tagTurbowarp)}>
                {'TurboWarp'}
            </span>
        )}
    </span>
);
Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
};

class BufferedInput extends React.Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleFlush = this.handleFlush.bind(this);
        this.state = {
            value: null
        };
    }
    handleKeyPress (e) {
        if (e.key === 'Enter') {
            this.handleFlush(e);
            e.target.blur();
        }
    }
    handleFlush (e) {
        if (this.state.value === null) {
            return;
        }
        if (this.props.type === 'number') {
            let value = +this.state.value;
            const min = e.target.min;
            const max = e.target.max;
            const step = e.target.step;
            if (min !== '') value = Math.max(min, value);
            if (max !== '') value = Math.min(max, value);
            if (step === '1') value = Math.round(value);
            this.props.onChange(value);
        } else {
            this.props.onChange(this.state.value);
        }
        this.setState({value: null});
    }
    handleChange (e) {
        this.setState({value: e.target.value});
    }
    render () {
        return (
            <input
                {...this.props}
                value={this.state.value === null ? this.props.value : this.state.value}
                onBlur={this.handleFlush}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}
BufferedInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const Setting = ({
    addonId,
    setting,
    value
}) => {
    const settingId = setting.id;
    const settingName = addonTranslations[`${addonId}/@settings-name-${settingId}`] || setting.name;
    const uniqueId = `setting/${addonId}/${settingId}`;
    const label = (
        <label
            htmlFor={uniqueId}
            className={styles.settingLabel}
        >
            {settingName}
        </label>
    );
    return (
        <div
            className={styles.setting}
        >
            {setting.type === 'boolean' && (
                <React.Fragment>
                    {label}
                    <input
                        id={uniqueId}
                        type="checkbox"
                        checked={value}
                        onChange={e => SettingsStore.setAddonSetting(addonId, settingId, e.target.checked)}
                    />
                </React.Fragment>
            )}
            {setting.type === 'integer' && (
                <React.Fragment>
                    {label}
                    <BufferedInput
                        id={uniqueId}
                        type="number"
                        min={setting.min}
                        max={setting.max}
                        step="1"
                        value={value}
                        onChange={newValue => SettingsStore.setAddonSetting(addonId, settingId, newValue)}
                    />
                </React.Fragment>
            )}
            {setting.type === 'color' && (
                <React.Fragment>
                    {label}
                    <input
                        id={uniqueId}
                        type="color"
                        value={value}
                        onChange={e => SettingsStore.setAddonSetting(addonId, settingId, e.target.value)}
                    />
                    <button
                        className={classNames(styles.button, styles.resetColorButton)}
                        onClick={() => SettingsStore.setAddonSetting(addonId, settingId, setting.default)}
                    >
                        {settingsTranslations['tw.addons.settings.reset']}
                    </button>
                </React.Fragment>
            )}
            {setting.type === 'select' && (
                <React.Fragment>
                    {label}
                    <Select
                        value={value}
                        values={setting.potentialValues.map(({id, name}) => ({
                            id,
                            name: addonTranslations[`${addonId}/@settings-select-${settingId}-${id}`] || name
                        }))}
                        onChange={v => SettingsStore.setAddonSetting(addonId, settingId, v)}
                        setting={setting}
                    />
                </React.Fragment>
            )}
        </div>
    );
};
Setting.propTypes = {
    addonId: PropTypes.string,
    setting: PropTypes.shape({
        type: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
        default: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        potentialValues: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        }))
    }),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])
};

const Notice = ({
    addonId,
    notice
}) => {
    const noticeId = notice.id;
    // All themes require reload, so ignore these alerts from upstream.
    // Users are already informed of this in other places of the UI.
    if (noticeId === 'refresheditor') {
        return null;
    }
    const text = addonTranslations[`${addonId}/@info-${noticeId}`] || notice.text;
    return (
        <div
            className={styles.notice}
            type={notice.type}
        >
            <img
                className={styles.noticeIcon}
                src={infoImage}
                alt=""
            />
            {text}
        </div>
    );
};
Notice.propTypes = {
    addonId: PropTypes.string,
    notice: PropTypes.shape({
        type: PropTypes.string,
        text: PropTypes.string,
        id: PropTypes.string
    })
};

const Presets = ({
    addonId,
    presets
}) => (
    <div className={classNames(styles.setting, styles.presets)}>
        <div className={styles.settingLabel}>
            {settingsTranslations['tw.addons.settings.presets']}
        </div>
        {presets.map(preset => {
            const presetId = preset.id;
            const name = addonTranslations[`${addonId}/@preset-name-${presetId}`] || preset.name;
            const description = addonTranslations[`${addonId}/@preset-description-${presetId}`] || preset.description;
            return (
                <button
                    key={presetId}
                    title={description}
                    className={classNames(styles.button, styles.presetButton)}
                    onClick={() => SettingsStore.applyAddonPreset(addonId, presetId)}
                >
                    {name}
                </button>
            );
        })}
    </div>
);
Presets.propTypes = {
    addonId: PropTypes.string,
    presets: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        description: PropTypes.string,
        values: PropTypes.object
    }))
};

const Addon = ({
    id,
    settings,
    manifest
}) => (
    <div className={classNames(styles.addon, {[styles.addonDirty]: settings.dirty})}>
        <div className={styles.addonHeader}>
            <label
                htmlFor={id}
                id={`${id}-label`}
                className={styles.addonTitle}
            >
                {manifest.tags.includes('theme') ? (
                    <img
                        className={styles.extensionImage}
                        src={theme === 'dark' ? brushImageWhite : brushImageBlack}
                        alt=""
                    />
                ) : manifest.tags.includes('easterEgg') ? (
                    <img
                        className={styles.extensionImage}
                        src={theme === 'dark' ? eggImageWhite : eggImageBlack}
                        alt=""
                    />
                ) : (
                    <img
                        className={styles.extensionImage}
                        src={theme === 'dark' ? extensionImageWhite : extensionImageBlack}
                        alt=""
                    />
                )}
                <div className={styles.addonTitleText}>
                    {addonTranslations[`${id}/@name`] || manifest.name}
                </div>
            </label>
            <Tags
                tags={manifest.tags}
            />
            {!settings.enabled && (
                <div className={styles.inlineDescription}>
                    {addonTranslations[`${id}/@description`] || manifest.description}
                </div>
            )}
            <div className={styles.addonOperations}>
                {settings.enabled && manifest.settings && (
                    <button
                        className={styles.resetButton}
                        onClick={() => SettingsStore.resetAddon(id)}
                        title={settingsTranslations['tw.addons.settings.reset']}
                    >
                        <img
                            src={theme === 'dark' ? undoImageWhite : undoImageBlack}
                            className={styles.resetButtonImage}
                            alt={settingsTranslations['tw.addons.settings.reset']}
                        />
                    </button>
                )}
                <Switch
                    id={id}
                    aria-labelledby={`${id}-label`}
                    value={settings.enabled}
                    onChange={value => SettingsStore.setAddonEnabled(id, value)}
                />
            </div>
        </div>
        {settings.enabled && (
            <div className={styles.addonDetails}>
                <div className={styles.description}>
                    {addonTranslations[`${id}/@description`] || manifest.description}
                </div>
                {manifest.info && (
                    <div className={styles.noticeContainer}>
                        {manifest.info.map(info => (
                            <Notice
                                key={info.id}
                                addonId={id}
                                notice={info}
                            />
                        ))}
                    </div>
                )}
                {manifest.credits && (
                    <div className={styles.creditContainer}>
                        <span className={styles.creditTitle}>
                            {settingsTranslations['tw.addons.settings.credits']}
                        </span>
                        <AddonCredits credits={manifest.credits} />
                    </div>
                )}
                {manifest.settings && (
                    <div className={styles.settingContainer}>
                        {manifest.settings.map(setting => (
                            <Setting
                                key={setting.id}
                                addonId={id}
                                setting={setting}
                                value={settings[setting.id]}
                            />
                        ))}
                        {manifest.presets && (
                            <Presets
                                addonId={id}
                                presets={manifest.presets}
                            />
                        )}
                    </div>
                )}
            </div>
        )}
    </div>
);
Addon.propTypes = {
    id: PropTypes.string,
    settings: PropTypes.shape({
        enabled: PropTypes.bool,
        dirty: PropTypes.bool
    }),
    manifest: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        credits: PropTypes.array,
        info: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string
        })),
        settings: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string
        })),
        presets: PropTypes.array,
        tags: PropTypes.arrayOf(PropTypes.string)
    })
};

const Dirty = props => (
    <div className={styles.dirtyOuter}>
        <div className={styles.dirtyInner}>
            {settingsTranslations['tw.addons.settings.dirty']}
            {props.onReloadNow && (
                <button
                    className={classNames(styles.button, styles.dirtyButton)}
                    onClick={props.onReloadNow}
                >
                    {settingsTranslations['tw.addons.settings.dirtyButton']}
                </button>
            )}
        </div>
    </div>
);
Dirty.propTypes = {
    onReloadNow: PropTypes.func
};

const UnsupportedAddons = ({addons: addonList}) => (
    <div className={styles.unsupportedContainer}>
        <span className={styles.unsupportedText}>
            {settingsTranslations['tw.addons.settings.unsupported']}
        </span>
        {addonList.map(({id, manifest}, index) => (
            <span
                key={id}
                className={styles.unsupportedAddon}
            >
                {addonTranslations[`${id}/@name`] || manifest.name}
                {index !== addonList.length - 1 && (
                    ', '
                )}
            </span>
        ))}
    </div>
);
UnsupportedAddons.propTypes = {
    addons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        manifest: PropTypes.shape({
            name: PropTypes.string
        })
    }))
};

const normalize = i => i.toLowerCase();

class AddonList extends React.Component {
    shouldShowAddon (state, addonId, manifest) {
        if (!state.visible) {
            return false;
        }
        const terms = normalize(this.props.search.trim()).split(' ');
        if (terms.length === 0) {
            return true;
        }
        const texts = [
            normalize(addonId),
            normalize(addonTranslations[`${addonId}/@name`] || manifest.name),
            normalize(addonTranslations[`${addonId}/@name`] || manifest.description)
        ];
        if (manifest.settings) {
            for (const setting of manifest.settings) {
                texts.push(normalize(addonTranslations[`${addonId}/@settings-name-${setting.id}`] || setting.name));
            }
        }
        if (manifest.presets) {
            for (const preset of manifest.presets) {
                texts.push(normalize(addonTranslations[`${addonId}/@preset-name-${preset.id}`] || preset.name));
                texts.push(normalize(
                    addonTranslations[`${addonId}/@preset-description-${preset.id}`] ||
                    preset.description
                ));
            }
        }
        for (const tag of manifest.tags) {
            const translatedTag = settingsTranslations[`tw.addons.settings.tags.${tag}`];
            if (translatedTag) {
                texts.push(normalize(settingsTranslations[`tw.addons.settings.tags.${tag}`]));
            }
        }
        // For an addon to be included, all search terms must match one of the texts.
        for (const term of terms) {
            if (!term) continue;
            let found = false;
            for (const text of texts) {
                if (text.includes(term)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }
    render () {
        const filteredAddons = this.props.addons
            .filter(({id, manifest, state}) => this.shouldShowAddon(state, id, manifest));
        if (filteredAddons.length === 0) {
            return (
                <div className={styles.noResults}>
                    {settingsTranslations['tw.addons.settings.noResults']}
                </div>
            );
        }
        return (
            <div>
                {filteredAddons.map(({id, manifest, state}) => (
                    <Addon
                        key={id}
                        id={id}
                        settings={state}
                        manifest={manifest}
                    />
                ))}
            </div>
        );
    }
}
AddonList.propTypes = {
    addons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        state: PropTypes.shape({

        }).isRequired,
        manifest: PropTypes.shape({

        }).isRequired
    })).isRequired,
    search: PropTypes.string.isRequired
};

class AddonSettingsComponent extends React.Component {
    constructor (props) {
        super(props);
        this.handleSettingStoreChanged = this.handleSettingStoreChanged.bind(this);
        this.handleReloadNow = this.handleReloadNow.bind(this);
        this.handleResetAll = this.handleResetAll.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClickSearchButton = this.handleClickSearchButton.bind(this);
        this.searchRef = this.searchRef.bind(this);
        this.searchBar = null;
        this.state = {
            dirty: false,
            search: ''
        };
        this.konamiProgress = 0;
        for (const [id, manifest] of Object.entries(this.props.addons)) {
            const enabled = SettingsStore.getAddonEnabled(id);
            const addonState = {
                enabled: enabled,
                visible: true,
                dirty: false
            };
            if (manifest.settings) {
                for (const setting of manifest.settings) {
                    addonState[setting.id] = SettingsStore.getAddonSetting(id, setting.id);
                }
            }
            this.state[id] = addonState;
        }
    }
    componentDidMount () {
        SettingsStore.addEventListener('setting-changed', this.handleSettingStoreChanged);
        document.body.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount () {
        SettingsStore.removeEventListener('setting-changed', this.handleSettingStoreChanged);
        document.body.removeEventListener('keydown', this.handleKeyDown);
    }
    handleSettingStoreChanged (e) {
        const {addonId, settingId, value, reloadRequired} = e.detail;
        this.setState(state => {
            const newState = {
                [addonId]: {
                    ...state[addonId],
                    [settingId]: value
                }
            };
            if (reloadRequired) {
                newState[addonId].dirty = true;
                newState.dirty = true;
            }
            return newState;
        });
        if (!reloadRequired && this.props.onSettingsChanged) {
            this.props.onSettingsChanged(reloadRequired);
        }
    }
    handleReloadNow () {
        this.props.onReloadNow();
        this.setState({
            dirty: false
        });
        for (const addonId of Object.keys(addons)) {
            if (this.state[addonId].dirty) {
                this.setState(state => ({
                    [addonId]: {
                        ...state[addonId],
                        dirty: false
                    }
                }));
            }
        }
    }
    handleResetAll () {
        if (confirm(settingsTranslations['tw.addons.settings.confirmResetAll'])) {
            SettingsStore.resetAllAddons();
            this.setState({
                search: ''
            });
        }
    }
    handleExport () {
        const exportedData = SettingsStore.export({
            theme
        });
        this.props.onExportSettings(exportedData);
    }
    handleImport () {
        const fileSelector = document.createElement('input');
        fileSelector.type = 'file';
        fileSelector.accept = '.json';
        document.body.appendChild(fileSelector);
        fileSelector.click();
        document.body.removeChild(fileSelector);
        fileSelector.addEventListener('change', async () => {
            const file = fileSelector.files[0];
            if (!file) {
                return;
            }
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                SettingsStore.import(data);
                this.setState({
                    search: ''
                });
            } catch (e) {
                console.error(e);
                alert(e);
            }
        });
    }
    handleSearch (e) {
        const value = e.target.value;
        this.setState({
            search: value
        });
    }
    handleClickSearchButton () {
        this.setState({
            search: ''
        });
        this.searchBar.focus();
    }
    searchRef (searchBar) {
        this.searchBar = searchBar;
    }
    handleKeyDown (e) {
        const key = e.key;
        if (key.length === 1 && key !== ' ' && e.target === document.body && !(e.ctrlKey || e.metaKey || e.altKey)) {
            this.searchBar.focus();
        }
        if (key === 'f' && (e.ctrlKey || e.metaKey)) {
            this.searchBar.focus();
            // TODO: disabling the builtin ctrl+f seems like a rude thing to do, consider only doing this in electron?
            e.preventDefault();
        }
    }
    render () {
        const addonState = Object.entries(this.props.addons).map(([id, manifest]) => ({
            id,
            manifest,
            state: this.state[id]
        }));
        const unsupported = Object.entries(this.props.unsupportedAddons).map(([id, manifest]) => ({
            id,
            manifest
        }));
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.searchContainer}>
                        <input
                            className={styles.searchInput}
                            value={this.state.search}
                            onChange={this.handleSearch}
                            placeholder={settingsTranslations['tw.addons.settings.search']}
                            aria-label={settingsTranslations['tw.addons.settings.search']}
                            ref={this.searchRef}
                            spellCheck="false"
                            autoFocus
                        />
                        <div
                            className={styles.searchButton}
                            onClick={this.handleClickSearchButton}
                        />
                    </div>
                    <a
                        href="https://scratch.mit.edu/users/World_Languages/#comments"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.feedbackButtonOuter}
                    >
                        <span className={styles.feedbackButtonInner}>
                            {settingsTranslations['tw.addons.settings.addonFeedback']}
                        </span>
                    </a>
                    {this.state.dirty && (
                        <Dirty
                            onReloadNow={this.props.onReloadNow && this.handleReloadNow}
                        />
                    )}
                </div>
                <div className={styles.addons}>
                    <AddonList
                        addons={addonState}
                        search={this.state.search}
                    />
                    <div className={styles.footerButtons}>
                        <button
                            className={classNames(styles.button, styles.resetAllButton)}
                            onClick={this.handleResetAll}
                        >
                            {settingsTranslations['tw.addons.settings.resetAll']}
                        </button>
                        <button
                            className={classNames(styles.button, styles.exportButton)}
                            onClick={this.handleExport}
                        >
                            {settingsTranslations['tw.addons.settings.export']}
                        </button>
                        <button
                            className={classNames(styles.button, styles.importButton)}
                            onClick={this.handleImport}
                        >
                            {settingsTranslations['tw.addons.settings.import']}
                        </button>
                    </div>
                    <footer className={styles.footer}>
                        {unsupported.length ? (
                            <UnsupportedAddons
                                addons={unsupported}
                            />
                        ) : null}
                        <div className={styles.version}>
                            {`v${upstreamMeta.version} (${upstreamMeta.commit})`}
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}
AddonSettingsComponent.propTypes = {
    addons: PropTypes.objectOf(PropTypes.object),
    unsupportedAddons: PropTypes.objectOf(PropTypes.object),
    onReloadNow: PropTypes.func,
    onSettingsChanged: PropTypes.func,
    onExportSettings: PropTypes.func
};
AddonSettingsComponent.defaultProps = {
    addons: sortAddons(),
    unsupportedAddons
};

export default AddonSettingsComponent;
