#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');

const MESSAGES_PATTERN = './build/messages/**/*.json';
const LANG_DIR = './translations/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a chromei18n format collection of `id: {message: defaultMessage,
// description: description}` pairs for the app's default locale.
let defaultMessages = glob.sync(MESSAGES_PATTERN)
    .map((filename) => fs.readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((collection, descriptors) => {
        descriptors.forEach(({id, defaultMessage, description}) => {
            if (collection.hasOwnProperty(id)) {
                throw new Error(`Duplicate message id: ${id}`);
            }

            collection[id] = {message: defaultMessage, description: description};
        });

        return collection;
    }, {});

mkdirp.sync(LANG_DIR);
fs.writeFileSync(LANG_DIR + 'en.json', JSON.stringify(defaultMessages, null, 2));
