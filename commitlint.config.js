/* eslint-disable import/no-commonjs */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    ignores: [message => message.startsWith('chore(release):')]
};
