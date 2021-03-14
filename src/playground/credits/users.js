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
    // {
    //     userId: '4648559',
    //     scratchUsername: 'World_Languages',
    //     name: 'World_Languages'
    // },
    {
        userId: '6103312',
        scratchUsername: 'Fupicat',
        name: 'Fupicat'
    },
    {
        userId: '62181963',
        scratchUsername: 'DieForrobux',
        name: 'DieForrobux'
    },
    // {
    //     userId: '61087321',
    //     scratchUsername: 'superscratch444tre',
    //     name: 'superscratch444tre'
    // },
    {
        userId: '67422866',
        scratchUsername: 'AArt1256',
        name: 'AnnoyedArt1256'
    },
    {
        userId: '61067753',
        scratchUsername: 'diaowinner',
        name: 'diaowinner'
    },
    // {
    //     userId: '62626',
    //     scratchUsername: 's_federici',
    //     name: 's_federici'
    // },
    // {
    //     userId: '34316478',
    //     scratchUsername: 'philipp2007',
    //     name: 'iqnite'
    // }
    {
        userId: '3318598',
        scratchUsername: 'plant2014',
        name: 'plant2014'
    }
].map(({userId, scratchUsername, name}) => ({
    image: `https://cdn2.scratch.mit.edu/get_image/user/${userId}_60x60.png`,
    href: `https://scratch.mit.edu/users/${scratchUsername}/`,
    text: name
}));

const addonContributorToIcon = ({login, avatar_url: avatarUrl}) => ({
    image: `${avatarUrl}&s=60`,
    href: `https://github.com/${login}/`,
    text: login
});

const addonDevelopers = addonsContributors.filter(({contributions, login}) => (
    contributions.includes('business') ||
    addonCreditsNames.some(i => i.includes(normalize(login)) || normalize(login).includes(i))
)).map(addonContributorToIcon);

const addonTranslators = addonsContributors.filter(({contributions}) => (
    contributions.includes('translation')
)).map(addonContributorToIcon);

export default {
    translators: shuffle([...translators, ...addonTranslators]),
    addonDevelopers: shuffle(addonDevelopers)
};
