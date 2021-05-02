import addonTranslatorsJSON from '../../addons/translators.json';

const shuffle = list => {
    for (let i = list.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        const tmp = list[i];
        list[i] = list[random];
        list[random] = tmp;
    }
    return list;
};

const fromHardcoded = ({userId, username, name}) => ({
    image: `https://cdn2.scratch.mit.edu/get_image/user/${userId}_60x60.png`,
    href: `https://scratch.mit.edu/users/${username}/`,
    text: name || username
});

const fromAddons = ({login, avatar_url: avatarUrl}) => ({
    image: `${avatarUrl}&s=60`,
    text: login
    // No links to GitHub profiles for now :(
});

const translators = [
    // {
    //     userId: '4648559',
    //     username: 'World_Languages',
    //     name: 'World_Languages'
    // },
    {
        userId: '6103312',
        username: 'Fupicat'
    },
    {
        userId: '62181963',
        username: 'DieForrobux'
    },
    // {
    //     userId: '61087321',
    //     username: 'superscratch444tre',
    //     name: 'superscratch444tre'
    // },
    {
        userId: '67422866',
        username: 'AArt1256',
        name: 'AnnoyedArt1256'
    },
    {
        userId: '61067753',
        username: 'diaowinner'
    },
    // {
    //     userId: '62626',
    //     username: 's_federici',
    //     name: 's_federici'
    // },
    // {
    //     userId: '34316478',
    //     username: 'philipp2007',
    //     name: 'iqnite'
    // }
    {
        userId: '3318598',
        username: 'plant2014'
    },
    {
        userId: '56013432',
        username: 'Developer_Diary'
    },
    {
        userId: '72794568',
        username: '52Tellur'
    },
    {
        userId: '33381624',
        username: 'Mikez333'
    },
    {
        userId: '60084940',
        username: 'ThisFeelsScratchy'
    },
    {
        userId: '71978380',
        username: 'TheBugCoder'
    },
    // {
    //     userId: '16426047',
    //     username: 'Maximouse'
    // },
    {
        userId: '55742784',
        username: 'RedGuy7'
    }
].map(fromHardcoded);

const addonDevelopers = [
    {
        userId: '34018398',
        username: 'Jeffalo'
    },
    {
        userId: '64184234',
        username: 'ErrorGamer2000'
    },
    {
        userId: '41616512',
        username: 'pufferfish101007'
    },
    {
        userId: '61409215',
        username: 'TheColaber'
    },
    {
        userId: '1882674',
        username: 'griffpatch'
    },
    {
        userId: '10817178',
        username: 'apple502j'
    },
    {
        userId: '16947341',
        username: '--Explosion--'
    },
    {
        userId: '14880401',
        username: 'Sheep_maker'
    },
    {
        userId: '9981676',
        username: 'NitroCipher'
    },
    {
        userId: '2561680',
        username: 'lisa_wolfgang'
    },
    {
        userId: '60000111',
        username: 'GDUcrash'
    },
    {
        userId: '4648559',
        username: 'World_Languages'
    },
    {
        userId: '17340565',
        username: 'GarboMuffin'
    }
    // TODO: summerscar if this is their Scratch account: https://scratch.mit.edu/users/summerscar/
].map(fromHardcoded);

const addonTranslators = addonTranslatorsJSON.map(fromAddons);

export default {
    translators: shuffle([...translators, ...addonTranslators]),
    addonDevelopers: shuffle(addonDevelopers)
};
