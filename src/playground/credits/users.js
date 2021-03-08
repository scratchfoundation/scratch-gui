import addonsContributors from '../../addons/contributors.json';
import addonManifests from '../../addons/all-addon-manifests';

const shuffle = list => {
    for (let i = list.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        const tmp = list[i];
        list[i] = list[random];
        list[random] = tmp;
    }
    return list;
};

const normalize = str => str.toLowerCase().replace(/[^a-z]/gi, '');

const addonCreditsNames = [];
for (const {credits} of Object.values(addonManifests)) {
    for (const {name} of credits || []) {
        addonCreditsNames.push(normalize(name));
    }
}

const translators = [
    {
        userId: '4648559',
        username: 'World_Languages'
    },
    {
        userId: '6103312',
        username: 'Fupicat'
    },
    {
        userId: '62181963',
        username: 'DieForrobux'
    },
    {
        userId: '61087321',
        username: 'superscratch444tre'
    },
    {
        userId: '67422866',
        username: 'AArt1256'
    },
    {
        userId: '61067753',
        username: 'diaowinner'
    },
    {
        userId: '62626',
        username: 's_federici'
    },
    {
        userId: '34316478',
        username: 'philipp2007'
    }
].map(({userId, username}) => ({
    image: `https://cdn2.scratch.mit.edu/get_image/user/${userId}_60x60.png`,
    href: `https://scratch.mit.edu/users/${username}/`,
    text: username
}));

const addons = addonsContributors.filter(({contributions, login}) => (
    contributions.includes('translation') ||
    contributions.includes('design') ||
    contributions.includes('business') ||
    contributions.includes('tool') ||
    addonCreditsNames.some(i => normalize(i) === normalize(login))
)).map(({login, avatar_url: avatarUrl, contributions}) => ({
    image: `${avatarUrl}&s=60`,
    href: `https://github.com/${login}/`,
    text: login,
    contributions
}));

export default {
    translators: translators,
    addons: addons
};
