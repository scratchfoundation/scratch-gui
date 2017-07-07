#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const languages = require('../languages.json');

const LANG_DIR = './translations/';
const MSGS_DIR = './locale/';

const locales = Object.keys(languages);
let messages = locales.reduce((collection, lang) => {
    let langMessages = {};
    try {
        let langData = JSON.parse(
            fs.readFileSync(path.resolve(LANG_DIR, lang + '.json'), 'utf8')
        );
        Object.keys(langData).forEach((id) => {
            langMessages[id] = langData[id].message;
        });
        collection[lang] = langMessages;
    } catch (e) {
        process.stdout.write(lang + ' translation file missing, will use defaults.\n');
    }
    return collection;
}, {});

mkdirp.sync(MSGS_DIR);
fs.writeFileSync(MSGS_DIR + 'messages.json', JSON.stringify(messages, null, 2));
