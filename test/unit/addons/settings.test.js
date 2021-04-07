import SettingStore from '../../../src/addons/settings-store';

test('enabled, event', () => {
    const store = new SettingStore();
    const fn = jest.fn();
    store.addEventListener('setting-changed', fn);
    expect(store.getAddonEnabled('editor-devtools')).toBe(true);
    store.setAddonEnabled('editor-devtools', false);
    expect(store.getAddonEnabled('editor-devtools')).toBe(false);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0].detail.addonId).toBe('editor-devtools');
    expect(fn.mock.calls[0][0].detail.settingId).toBe('enabled');
    expect(fn.mock.calls[0][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[0][0].detail.value).toBe(false);
    store.setAddonEnabled('editor-devtools', true);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn.mock.calls[1][0].detail.addonId).toBe('editor-devtools');
    expect(fn.mock.calls[1][0].detail.settingId).toBe('enabled');
    expect(fn.mock.calls[1][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[1][0].detail.value).toBe(true);
});

test('settings, event, default values', () => {
    const store = new SettingStore();
    const fn = jest.fn();
    expect(store.getAddonSetting('onion-skinning', 'default')).toBe(false);
    store.addEventListener('setting-changed', fn);
    store.setAddonSetting('onion-skinning', 'default', true);
    expect(store.getAddonSetting('onion-skinning', 'default')).toBe(true);
    store.setAddonSetting('onion-skinning', 'default', null);
    expect(store.getAddonSetting('onion-skinning', 'default')).toBe(false);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn.mock.calls[0][0].detail.addonId).toBe('onion-skinning');
    expect(fn.mock.calls[0][0].detail.settingId).toBe('default');
    expect(fn.mock.calls[0][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[0][0].detail.value).toBe(true);
    expect(fn.mock.calls[1][0].detail.addonId).toBe('onion-skinning');
    expect(fn.mock.calls[1][0].detail.settingId).toBe('default');
    expect(fn.mock.calls[1][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[1][0].detail.value).toBe(false);
});

test('no actual change emits no event', () => {
    const store = new SettingStore();
    const fn = jest.fn();
    store.addEventListener('setting-changed', fn);
    for (let i = 0; i < 5; i++) store.setAddonEnabled('cat-blocks', true);
    expect(fn).toHaveBeenCalledTimes(1);
    for (let i = 0; i < 5; i++) store.setAddonEnabled('cat-blocks', false);
    expect(fn).toHaveBeenCalledTimes(2);
    for (let i = 0; i < 5; i++) store.setAddonSetting('onion-skinning', 'default', true);
    expect(fn).toHaveBeenCalledTimes(3);
    for (let i = 0; i < 5; i++) store.setAddonSetting('onion-skinning', 'default', false);
    expect(fn).toHaveBeenCalledTimes(4);
});

test('changing enabled throws on unknown addons', () => {
    const store = new SettingStore();
    const fn = jest.fn();
    store.addEventListener('setting-changed', fn);
    expect(() => store.setAddonEnabled('egriohergoijergijregojiergdfoijre', true)).toThrow();
    expect(fn).toHaveBeenCalledTimes(0);
});

test('changing settings throws on unknown settings', () => {
    const store = new SettingStore();
    const fn = jest.fn();
    store.addEventListener('setting-changed', fn);
    expect(() => store.setAddonSetting('onion-skinning', 'sdlkjfslkdjfljksd', true)).toThrow();
    expect(() => store.setAddonSetting('ergfoijgi', 'sdflkjsfdlkj', true)).toThrow();
    expect(fn).toHaveBeenCalledTimes(0);
});

test('changing settings throws on invalid values', () => {
    const store = new SettingStore();
    // boolean
    expect(() => store.setAddonSetting('onion-skinning', 'default', '#abcdef')).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'default', [])).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'default', {})).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'default', '')).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'default', 1)).toThrow();
    // integer
    expect(() => store.setAddonSetting('onion-skinning', 'next', '#abcdef')).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'next', [])).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'next', {})).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'next', '')).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'next', '3')).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'next', false)).toThrow();
    // select
    expect(() => store.setAddonSetting('onion-skinning', 'mode', '#abcdef')).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'mode', [])).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'mode', {})).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'mode', '')).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'mode', false)).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'mode', 1)).toThrow();
    expect(() => store.setAddonEnabled('onion-skinning', 'mode', 'tint')).not.toThrow();
    expect(() => store.setAddonEnabled('onion-skinning', 'mode', 'merge')).not.toThrow();
    // color
    expect(() => store.setAddonSetting('onion-skinning', 'beforeTint', '#abcdef')).not.toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'beforeTint', '#abcDE1')).not.toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'beforeTint', [])).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'beforeTint', {})).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'beforeTint', '')).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'beforeTint', false)).toThrow();
    expect(() => store.setAddonSetting('onion-skinning', 'beforeTint', 1)).toThrow();
});

test('reset does not change enabled', () => {
    const store = new SettingStore();
    store.setAddonEnabled('cat-blocks', true);
    store.resetAddon('cat-blocks');
    expect(store.getAddonEnabled('cat-blocks')).toBe(true);
});

test('reset settings, event', () => {
    const store = new SettingStore();
    store.setAddonSetting('onion-skinning', 'default', true);
    store.setAddonSetting('onion-skinning', 'next', 3);
    const fn = jest.fn();
    store.addEventListener('setting-changed', fn);
    store.resetAddon('onion-skinning');
    expect(store.getAddonSetting('onion-skinning', 'default')).toBe(false);
    expect(store.getAddonSetting('onion-skinning', 'next')).toBe(0);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn.mock.calls[0][0].detail.addonId).toBe('onion-skinning');
    expect(fn.mock.calls[0][0].detail.settingId).toBe('default');
    expect(fn.mock.calls[0][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[0][0].detail.value).toBe(false);
    expect(fn.mock.calls[1][0].detail.addonId).toBe('onion-skinning');
    expect(fn.mock.calls[1][0].detail.settingId).toBe('next');
    expect(fn.mock.calls[1][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[1][0].detail.value).toBe(0);
});

test('reset all addons', () => {
    const store = new SettingStore();
    store.setAddonEnabled('cat-blocks', true);
    store.setAddonSetting('onion-skinning', 'default', true);
    const fn = jest.fn();
    store.addEventListener('setting-changed', fn);
    store.resetAllAddons();
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn.mock.calls[0][0].detail.addonId).toBe('onion-skinning');
    expect(fn.mock.calls[0][0].detail.settingId).toBe('default');
    expect(fn.mock.calls[0][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[0][0].detail.value).toBe(false);
    expect(fn.mock.calls[1][0].detail.addonId).toBe('cat-blocks');
    expect(fn.mock.calls[1][0].detail.settingId).toBe('enabled');
    expect(fn.mock.calls[1][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[1][0].detail.value).toBe(false);
});

test('apply preset', () => {
    const store = new SettingStore();
    const fn = jest.fn();
    store.addEventListener('setting-changed', fn);
    store.applyAddonPreset('editor-theme3', 'original');
    expect(fn.mock.calls.length).toBeGreaterThan(5);
    expect(store.getAddonSetting('editor-theme3', 'motion-color')).toBe('#4a6cd4');
});

test('unknown preset throws', () => {
    const store = new SettingStore();
    const fn = jest.fn();
    store.addEventListener('setting-changed', fn);
    expect(() => store.applyAddonPreset('alksdfjlksdf', 'jksdflkjsdf')).toThrow();
    expect(() => store.applyAddonPreset('editor-theme3', 'jksdflkjsdf')).toThrow();
    expect(fn).toHaveBeenCalledTimes(0);
});

test('export core', () => {
    const store = new SettingStore();
    const exported = store.export({theme: 'light'});
    expect(exported.core.version).toMatch(/tw/);
});

test('export settings', () => {
    const store = new SettingStore();
    let exported = store.export({theme: 'light'});
    expect(exported.addons['cat-blocks'].enabled).toBe(false);
    expect(exported.addons['cat-blocks'].settings).toEqual({});
    expect(exported.addons['onion-skinning'].enabled).toBe(true);
    expect(exported.addons['onion-skinning'].settings.default).toEqual(false);
    store.setAddonEnabled('cat-blocks', true);
    store.setAddonSetting('onion-skinning', 'default', true);
    exported = store.export({theme: 'light'});
    expect(exported.addons['cat-blocks'].enabled).toBe(true);
    expect(exported.addons['cat-blocks'].settings).toEqual({});
    expect(exported.addons['onion-skinning'].enabled).toBe(true);
    expect(exported.addons['onion-skinning'].settings.default).toEqual(true);
});

test('export theme', () => {
    const store = new SettingStore();
    const exported = store.export({theme: 'light'});
    expect(exported.core.lightTheme).toBe(true);
    const exported2 = store.export({theme: 'dark'});
    expect(exported2.core.lightTheme).toBe(false);
});

test('import, event', () => {
    const store = new SettingStore();
    store.setAddonEnabled('onion-skinning', false);
    store.setAddonSetting('onion-skinning', 'next', 5);
    const newStore = new SettingStore();
    newStore.setAddonSetting('onion-skinning', 'next', 10);
    const fn = jest.fn();
    newStore.addEventListener('setting-changed', fn);
    newStore.import(store.export({theme: 'light'}));
    expect(newStore.getAddonEnabled('onion-skinning')).toBe(false);
    expect(newStore.getAddonSetting('onion-skinning', 'next')).toBe(5);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn.mock.calls[0][0].detail.addonId).toBe('onion-skinning');
    expect(fn.mock.calls[0][0].detail.settingId).toBe('enabled');
    expect(fn.mock.calls[0][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[0][0].detail.value).toBe(false);
    expect(fn.mock.calls[1][0].detail.addonId).toBe('onion-skinning');
    expect(fn.mock.calls[1][0].detail.settingId).toBe('next');
    expect(fn.mock.calls[1][0].detail.reloadRequired).toBe(true);
    expect(fn.mock.calls[1][0].detail.value).toBe(5);
});

test('export is identical after import', () => {
    const store = new SettingStore();
    const fn = jest.fn();
    const exported = store.export({theme: 'light'});
    store.import(exported);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(store.export({theme: 'light'})).toEqual(exported);
});

test('import format', () => {
    const store = new SettingStore();
    store.setAddonEnabled('cat-blocks', true);
    store.import({
        core: {
            version: 'lksd',
            lightTheme: false
        },
        addons: {
            'onion-skinning': {
                enabled: false,
                settings: {
                    next: 7
                }
            }
        }
    });
    expect(store.getAddonEnabled('onion-skinning')).toBe(false);
    expect(store.getAddonSetting('onion-skinning', 'next')).toBe(7);
    expect(store.getAddonEnabled('cat-blocks')).toBe(true);
});

test('invalid imports', () => {
    const store = new SettingStore();
    expect(() => store.import({
        addons: {}
    })).not.toThrow();
    expect(() => store.import({
        addons: {
            'onion-skinning': {
                enabled: true,
                settings: {
                    dsjfokosdfj: 5
                }
            }
        }
    })).not.toThrow();
    expect(() => store.import({
        addons: {
            grfdjiklk: {
                enabled: true,
                settings: {}
            }
        }
    })).not.toThrow();
});
