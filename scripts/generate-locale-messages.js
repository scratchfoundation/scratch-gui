#!/usr/bin/env node

/*
Generates locale/messages.json from current translastion files

Translations are expected to be in the ./translations directory.
Translation files are in Chrome i18n json format:
'''
{
    "message.id": {
        "message": "The translated text",
        "description": "Tips for translators"
    },
    ...
}
'''
They are named by locale, for example: 'fr.json' or 'zh-cn.json'

Current languages supported are listed in ../src/languages.json

Converts the collection of translation files to a single set of messages.
Example output:
'''
{
  "en": {
    "action.addBackdrop": "Add Backdrop",
    "action.addCostume": "Add Costume",
    "action.recordSound": "Record Sound",
    "action.addSound": "Add Sound"
  },
  "fr": {
    "action.addSound": "Ajouter Son",
    "action.addCostume": "Ajouter Costume",
    "action.addBackdrop": "Ajouter Arrière-plan",
    "action.recordSound": "Enregistrement du Son"
  }
}
'''

Missing locales are ignored, react-intl will use the default messages for them.
 */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const languages = require('../src/languages.json');

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
