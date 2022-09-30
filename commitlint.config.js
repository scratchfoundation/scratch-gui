module.exports = {
    extends: ['@commitlint/config-conventional'],
    ignores: [message => message.startsWith('chore(release):')]
};
