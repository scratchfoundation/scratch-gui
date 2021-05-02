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

/* eslint-disable import/no-commonjs */
/* eslint-disable import/no-nodejs-modules */
/* eslint-disable no-console */

const fs = require('fs');
const childProcess = require('child_process');
const rimraf = require('rimraf');
const request = require('request');
const pathUtil = require('path');
const addons = require('./addons.json');

const walk = dir => {
    const children = fs.readdirSync(dir);
    const files = [];
    for (const child of children) {
        const path = pathUtil.join(dir, child);
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            const childChildren = walk(path);
            for (const childChild of childChildren) {
                files.push(pathUtil.join(child, childChild));
            }
        } else {
            files.push(child);
        }
    }
    return files;
};

const repoPath = pathUtil.resolve(__dirname, 'ScratchAddons');
if (!process.argv.includes('-')) {
    rimraf.sync(repoPath);
    childProcess.execSync(`git clone --depth=1 -b tw https://github.com/GarboMuffin/ScratchAddons ${repoPath}`);
}
rimraf.sync(pathUtil.resolve(__dirname, 'addons'));
rimraf.sync(pathUtil.resolve(__dirname, 'addons-l10n'));
rimraf.sync(pathUtil.resolve(__dirname, 'libraries'));
fs.mkdirSync(pathUtil.resolve(__dirname, 'addons'), {recursive: true});
fs.mkdirSync(pathUtil.resolve(__dirname, 'addons-l10n'), {recursive: true});
fs.mkdirSync(pathUtil.resolve(__dirname, 'libraries'), {recursive: true});

process.chdir(repoPath);
const commitHash = childProcess.execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

const includeImportedLibraries = contents => {
    // Parse things like:
    // import { normalizeHex, getHexRegex } from "../../libraries/normalize-color.js";
    // import RateLimiter from "../../libraries/rate-limiter.js";
    const matches = [...contents.matchAll(/import +(?:{.*}|.*) +from +["']\.\.\/\.\.\/libraries\/([\w\d_-]+\.js)["'];/g)];
    for (const match of matches) {
        const libraryFile = match[1];
        const oldLibraryPath = pathUtil.resolve(__dirname, 'ScratchAddons', 'libraries', libraryFile);
        const newLibraryPath = pathUtil.resolve(__dirname, 'libraries', libraryFile);
        const libraryContents = fs.readFileSync(oldLibraryPath, 'utf-8');
        fs.writeFileSync(newLibraryPath, libraryContents);
    }
};

const includeImports = (folder, contents) => {
    const dynamicAssets = walk(folder)
        .filter(file => file.endsWith('.svg') || file.endsWith('.png'));

    const stringifyPath = path => JSON.stringify(path).replace(/\\\\/g, '/');

    // Then we'll generate some JS to import them.
    let header = '/* inserted by pull.js */\n';
    dynamicAssets.forEach((file, index) => {
        header += `import _twAsset${index} from ${stringifyPath(`./${file}`)};\n`;
    });
    header += `const _twGetAsset = (path) => {\n`;
    dynamicAssets.forEach((file, index) => {
        header += `  if (path === ${stringifyPath(`/${file}`)}) return _twAsset${index};\n`;
    });
    // eslint-disable-next-line no-template-curly-in-string
    header += '  throw new Error(`Unknown asset: ${path}`);\n';
    header += '};\n';
    header += '\n';

    // And now we reroute everything to use our imports.
    // Parse things like:
    // el.src = addon.self.dir + "/" + name + ".svg";
    //          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  match
    //                           ^^^^^^^^^^^^^^^^^^^  capture group 1
    contents = contents.replace(
        /\${addon\.self\.(?:dir|lib) *\+ *([^;\n]+)}/g,
        (_fullText, name) => `\${_twGetAsset(${name})}`
    );
    contents = contents.replace(
        /addon\.self\.(?:dir|lib) *\+ *([^;,]+)/g,
        (_fullText, name) => `_twGetAsset(${name})`
    );

    return header + contents;
};

request('https://raw.githubusercontent.com/ScratchAddons/contributors/master/.all-contributorsrc', (err, response, body) => {
    const parsed = JSON.parse(body);
    const contributors = parsed.contributors.filter(({contributions}) => contributions.includes('translation'));
    const contributorsPath = pathUtil.resolve(__dirname, 'translators.json');
    fs.writeFileSync(contributorsPath, JSON.stringify(contributors, null, 4));
});

(async () => {
    for (const addon of addons) {
        const oldDirectory = pathUtil.resolve(__dirname, 'ScratchAddons', 'addons', addon);
        const newDirectory = pathUtil.resolve(__dirname, 'addons', addon);
        for (const file of walk(oldDirectory)) {
            const oldPath = pathUtil.join(oldDirectory, file);
            const newPath = pathUtil.join(newDirectory, file);
            fs.mkdirSync(pathUtil.dirname(newPath), {recursive: true});
            let contents = fs.readFileSync(oldPath);

            if (file.endsWith('.js')) {
                contents = contents.toString('utf-8');
                includeImportedLibraries(contents);
                if (contents.includes('addon.self.dir') || contents.includes('addon.self.lib')) {
                    contents = includeImports(oldDirectory, contents);
                }
            }

            fs.writeFileSync(newPath, contents);
        }
    }

    const l10nFiles = fs.readdirSync(pathUtil.resolve(__dirname, 'ScratchAddons', 'addons-l10n'));
    const languages = [];
    for (const file of l10nFiles) {
        const oldDirectory = pathUtil.resolve(__dirname, 'ScratchAddons', 'addons-l10n', file);
        const newDirectory = pathUtil.resolve(__dirname, 'addons-l10n', file);
        if (!fs.statSync(oldDirectory).isDirectory()) {
            continue;
        }
        languages.push(file);
        fs.mkdirSync(newDirectory, {recursive: true});
        for (const addon of addons) {
            const oldFile = pathUtil.join(oldDirectory, `${addon}.json`);
            const newFile = pathUtil.join(newDirectory, `${addon}.json`);
            try {
                const contents = fs.readFileSync(oldFile, 'utf-8');
                // Parse and stringify to minimize
                const parsed = JSON.parse(contents);
                fs.writeFileSync(newFile, JSON.stringify(parsed));
            } catch (e) {
                // Ignore
            }
        }
    }

    const extensionManifestPath = pathUtil.resolve(__dirname, 'ScratchAddons', 'manifest.json');
    const upstreamMetaPath = pathUtil.resolve(__dirname, 'upstream-meta.json');
    const extensionManifest = JSON.parse(fs.readFileSync(extensionManifestPath, 'utf8'));
    const versionName = extensionManifest.version_name;
    fs.writeFileSync(upstreamMetaPath, JSON.stringify({
        version: versionName,
        commit: commitHash,
        languages
    }));
})().catch(err => {
    console.error(err);
    process.exit(1);
});
