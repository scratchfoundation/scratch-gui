import extensionLibraryContent from '../lib/libraries/extensions/index.jsx';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const EXTENSION_LIBRARY_KEY = 'extensionLibrary';
const REMOTE_URL = IS_PRODUCTION ? 'https://kankungyip.github.io/scratch-x/' : 'http://localhost:8018';
const REMOTE_EXPIRED = IS_PRODUCTION ? 1000 * 60 * 60 * 24 * 5 : 1000;

const builtinExtensions = {};
extensionLibraryContent.forEach(value => builtinExtensions[value.extensionId] = value);

export const initialState = {
    extensions: extensionLibraryContent
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    return action.type === EXTENSION_LIBRARY_KEY ? Object.assign({}, state, {
        extensions: action.extensions
    }) : state;
}

const extensionConnectionConfig = (extension, remoteUrl) => (
    extension.launchPeripheralConnectionFlow ? {
        useAutoScan: extension.useAutoScan ? true : false,
        connectionIconURL: `${remoteUrl}/${extension.connectionIconURL}`,
        connectionSmallIconURL: `${remoteUrl}/${extension.connectionSmallIconURL ?? extension.insetIconURL}`,
        connectionTipIconURL: extension.connectionTipIconURL && `${remoteUrl}/${extension.connectionTipIconURL}`
    } : {}
);

const extensionDependencyConfig = (dependencies, remoteExtensions) => (
    dependencies ? {
        dependencies: dependencies.map(extensionId => (
            builtinExtensions[extensionId] ? [
                extensionId, builtinExtensions[extensionId].name
            ] : [
                extensionId, remoteExtensions[extensionId].name, `${REMOTE_URL}/extensions/${extensionId}/index.js`
            ]
        ))
    } : {}
);

const remoteExtensionLibrary = (remoteExtensions, lang, resolve) => {
    if (remoteExtensions) {
        Object.entries(remoteExtensions).forEach(([key, value]) => {
            const remoteUrl = `${REMOTE_URL}/extensions/${value.extensionId}`;
            remoteExtensions[key] = Object.assign(
                value,
                {
                    extensionURL: `${remoteUrl}/index.js`,
                    iconURL: `${remoteUrl}/${value.iconURL}`,
                    insetIconURL: `${remoteUrl}/${value.insetIconURL}`,
                    featured: true
                },
                extensionConnectionConfig(value, remoteUrl),
                extensionDependencyConfig(value.dependencies, remoteExtensions)
            );
        });
    }

    const storage = remoteExtensions ? {
        extensions: Object.values(remoteExtensions),
        expired: Date.now() + REMOTE_EXPIRED
    } : {};
    try {
        localStorage.setItem(EXTENSION_LIBRARY_KEY, JSON.stringify(storage));
    } catch (e) { /* ignore */ }

    const remoteExtensionLibraryContent = storage ? (storage.extensions || []) : [];
    resolve({
        type: EXTENSION_LIBRARY_KEY,
        extensions: [].concat(extensionLibraryContent, remoteExtensionLibraryContent)
    });
}

const loadExtensionLibraryContent = lang => {
    return new Promise((resolve, reject) => {
        let storage;
        try {
            storage = JSON.parse(localStorage.getItem(EXTENSION_LIBRARY_KEY));
        } catch (e) { /* ignore */ }

        if (storage && Date.now() < storage.expired) {
            const storageExtensionLibraryContent = storage.extensions || [];
            resolve({
                type: EXTENSION_LIBRARY_KEY,
                extensions: [].concat(extensionLibraryContent, storageExtensionLibraryContent)
            });
        }

        fetch(`${REMOTE_URL}/locales/${lang}.json`)
            .then(res => res.json())
            .then(res => remoteExtensionLibrary(res, lang, resolve))
            .catch(() => {
                fetch(`${REMOTE_URL}/locales/en.json`)
                    .then(res => res.json())
                    .then(res => remoteExtensionLibrary(res, lang, resolve))
                    .catch(reject);
            });
    });
}

export {
    reducer as default,
    initialState as extensionLibraryInitialState,
    loadExtensionLibraryContent
};
