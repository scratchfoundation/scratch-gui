/**
 * @fileoverview
 * Utility function to look up whether a translated video exists for a locale.
 */

// TODO: ja-Hira are copies of ja, replace with real ja-Hira when available.
const videos = {
    'intro-move-sayhello': {
        'en': 'rpjvs3v9gj',
        'it': '2im6c1f9kn',
        'pt': 'ngdfp8xg4x',
        'pt-BR': 'ngdfp8xg4x',
        'ja': 'v2c2f3y2sc',
        'ja-Hira': 'v2c2f3y2sc'
    },
    'animate-a-name': {
        'en': 'pyur30ho05',
        'it': 'c8zcrk6w09',
        'pt': 't49tfrukyf',
        'pt-BR': 't49tfrukyf',
        'ja': 'xrmgno02th',
        'ja-Hira': 'xrmgno02th'
    },
    'Make-Music': {
        'en': 'ir0j8ljsgm',
        'it': '8nm1v1m9zx',
        'pt': '9v4zl8504z',
        'pt-BR': '9v4zl8504z',
        'ja': 'iybhyobckr',
        'ja-Hira': 'iybhyobckr'
    },
    'Make-A-Game': {
        'en': '5rp47ys13g',
        'it': 'vrs1e38944',
        'pt': 'rjst5ng61s',
        'pt-BR': 'rjst5ng61s',
        'ja': 'h4q2ea3ojw',
        'ja-Hira': 'h4q2ea3ojw'
    },
    'Chase-Game': {
        'en': 'kusyx9thl5',
        'it': '899b2jmjlu',
        'pt': 'rw6kr9e37n',
        'pt-BR': 'rw6kr9e37n',
        'ja': 'wr6ysk8s6d',
        'ja-Hira': 'wr6ysk8s6d'
    },
    'add-a-backdrop': {
        'en': 'nict6zdzlx',
        'it': 'vrrfpm5grh',
        'pt': 'wq7sm038pq',
        'pt-BR': 'wq7sm038pq',
        'ja': 'j382ohngg7',
        'ja-Hira': 'j382ohngg7'
    },
    'change-size': {
        'en': 'p8va85hh61',
        'it': '1xb1jztsvr',
        'pt': '1ad1ip3ly7',
        'pt-BR': '1ad1ip3ly7',
        'ja': 'uzkfi9uai0',
        'ja-Hira': 'uzkfi9uai0'
    },
    'glide-around': {
        'en': 'sh9j978rg8',
        'it': 'nvdhpgiebe',
        'ja': 'jsat4vhu48',
        'ja-Hira': 'jsat4vhu48'
    },
    'record-a-sound': {
        'en': 'ulzl1fbzny',
        'it': 'ncr9lqk7bt',
        'pt': 'aavagpvh5w',
        'pt-BR': 'aavagpvh5w',
        'ja': '5zmy6u614k',
        'ja-Hira': '5zmy6u614k'
    },
    'spin-video': {
        'en': '07fed5hhpv',
        'it': 'obmrphhobt',
        'pt': 'jxqksu6zcw',
        'pt-BR': 'jxqksu6zcw',
        'ja': 'hjhc0a8r7j',
        'ja-Hira': 'hjhc0a8r7j'
    },
    'hide-and-show': {
        'en': 'g479ahobo9',
        'it': 'v0vbx3l5uk',
        'pt': 'ibtmwb58y8',
        'pt-BR': 'ibtmwb58y8',
        'ja': 'ruynguvag5',
        'ja-Hira': 'ruynguvag5'
    },
    'switch-costume': {
        'en': '1ocp6a1ejn',
        'it': 'nty4xjtqcj',
        'pt': 'pnlmmv2hs7',
        'pt-BR': 'pnlmmv2hs7',
        'ja': 'g3vluv0ms8',
        'ja-Hira': 'g3vluv0ms8'
    },
    'move-around-with-arrow-keys': {
        'en': 'yetrmk4iuu',
        'it': 'jse0g0uddw',
        'pt': 'erv6eff78p',
        'pt-BR': 'erv6eff78p',
        'ja': 'fk34dcg5oz',
        'ja-Hira': 'fk34dcg5oz'
    },
    'add-effects': {
        'en': '3jvl8zgjo2',
        'it': 'q3cjjyfju9',
        'pt': 'dz6jzpf7hm',
        'pt-BR': 'dz6jzpf7hm',
        'ja': 'q7zq9vu0wb',
        'ja-Hira': 'q7zq9vu0wb'
    },
    'make-it-fly': {
        en: 'zbtdx2dem9'
    },
    'pong-game': {
        en: '8m48dv0ens'
    },
    'imagine-if': {
        en: '1ndh08yiso'
    }
};

/**
 * Return a video identifier (on our video hosting service)
 * @param {string} videoId key in the videos object, or id string.
 * @param {string} locale locale to look up. If locale is not defined return the id for 'en' by default
 * @return {string} identifier for the video on our video hosting service.
 */
const translateVideo = (videoId, locale) => {
    // if the videoId is not recognized in the videos object, assume it's already a video id on wistia
    if (!videos.hasOwnProperty(videoId)) return videoId;
    if (videos[videoId].hasOwnProperty(locale)) {
        return videos[videoId][locale];
    }
    return videos[videoId].en;
};

export {
    translateVideo
};
