module.exports = {
    extends: 'scratch-semantic-release-config',
    branches: [
        {
            name: 'develop'
            // default channel
        },
        {
            name: 'alpha',
            prerelease: true
        },
        {
            name: 'beta',
            prerelease: true
        },
        {
            name: 'spork',
            prerelease: true
        },
        {
            name: 'hotfix/REPLACE', // replace with actual hotfix branch name
            channel: 'hotfix',
            prerelease: 'hotfix'
        }
    ]
};
