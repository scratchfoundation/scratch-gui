import addonsContributors from '../../addons/contributors.json';

const shuffle = list => {
    for (let i = list.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        const tmp = list[i];
        list[i] = list[random];
        list[random] = tmp;
    }
    return list;
};

const translators = [
    {
        userId: '4648559',
        username: 'World_Languages',
        language: 'Spanish'
    },
    {
        userId: '6103312',
        username: 'Fupicat',
        language: 'Portuguese'
    },
    {
        userId: '62181963',
        username: 'DieForrobux',
        language: 'French'
    },
    {
        userId: '61087321',
        username: 'superscratch444tre',
        language: 'Romanian'
    },
    {
        userId: '67422866',
        username: 'AArt1256',
        language: 'Turkish'
    },
    {
        userId: '61067753',
        username: 'diaowinner',
        language: 'Chinese'
    },
    {
        userId: '62626',
        username: 's_federici',
        language: 'Italian'
    },
    {
        userId: '34316478',
        username: 'philipp2007',
        language: 'German'
    }
].map(({userId, username}) => ({
    image: `https://cdn2.scratch.mit.edu/get_image/user/${userId}_60x60.png`,
    href: `https://scratch.mit.edu/users/${username}/`,
    text: username
}));

const addons = addonsContributors.map(({login, avatar_url: avatarUrl, profile}) => ({
    image: `${avatarUrl}&s=60`,
    href: `https://github.com/${login}/`,
    text: login
}));

export default {
    translators,
    addons
};
