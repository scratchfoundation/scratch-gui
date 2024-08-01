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
        'pt-br': 'ngdfp8xg4x',
        'ja': 'v2c2f3y2sc',
        'ja-Hira': 'v2c2f3y2sc',
        'es': 'htk2m9o65l',
        'es-419': 'htk2m9o65l',
        'sw': 'fd4bn2nli5',
        'fr': 'dt015ouls8',
        'am': 'e06wlsebqy',
        'zu': 'st2x0emdx7',
        'uk': '1ith4m4f8u',
        'ar': 's53zuo93o7',
        'ca': '4tb26s73x7',
        'zh-cn': '9i01bspmyx',
        'zh-tw': 'hr374tlx9t',
        'da': 'z9bns5dgiy',
        'nl': '9wleha9s1e',
        'de': '9lljmutx8m',
        'ht': '7pyjz25tvf',
        'he': '5rusa2qb6q',
        'id': 'zpzl7nqcyf',
        'km': 'zhq0596ewo',
        'ko': '9u7cr4pwsc',
        'ku': 'jzwwqih2im',
        'fa': 'c15wlv18tt',
        'pl': 'ijhn36nicy',
        'ru': '437odiewml',
        'th': 'zy7suscqn2',
        'tr': 'p3g8ek3cuh',
        'vi': 'fetjky76s4'
    },
    'intro-getting-started-ASL': {
        en: 'i2g46ikddf'
    },
    'animate-a-name': {
        'en': 'pyur30ho05',
        'ar': 'bz5vgtroxs',
        'fr': 'lwb0ro4oly',
        'it': 'c8zcrk6w09',
        'pt': 't49tfrukyf',
        'pt-br': 't49tfrukyf',
        'ja': 'xrmgno02th',
        'ja-Hira': 'xrmgno02th'
    },
    'Make-Music': {
        'en': 'ir0j8ljsgm',
        'ar': 'gqlmfqx1g4',
        'fr': 't4dw6fn2an',
        'it': '8nm1v1m9zx',
        'pt': '9v4zl8504z',
        'pt-br': '9v4zl8504z',
        'ja': 'iybhyobckr',
        'ja-Hira': 'iybhyobckr'
    },
    'Make-A-Game': {
        'en': '5rp47ys13g',
        'ar': 'dx5pqpaqsy',
        'fr': 'pntfdyyqqk',
        'it': 'vrs1e38944',
        'pt': 'rjst5ng61s',
        'pt-br': 'rjst5ng61s',
        'ja': 'h4q2ea3ojw',
        'ja-Hira': 'h4q2ea3ojw'
    },
    'Chase-Game': {
        'en': 'kusyx9thl5',
        'ar': 'qapon34gsw',
        'fr': '0nszrbo4dt',
        'it': '899b2jmjlu',
        'pt': 'rw6kr9e37n',
        'pt-br': 'rw6kr9e37n',
        'ja': 'wr6ysk8s6d',
        'ja-Hira': 'wr6ysk8s6d'
    },
    'add-a-backdrop': {
        'en': 'nict6zdzlx',
        'ar': 'ompj13t33k',
        'fr': 'nwyngs74xw',
        'it': 'vrrfpm5grh',
        'pt': 'wq7sm038pq',
        'pt-br': 'wq7sm038pq',
        'ja': 'j382ohngg7',
        'ja-Hira': 'j382ohngg7'
    },
    'change-size': {
        'en': 'p8va85hh61',
        'ar': 'acceih3x6k',
        'fr': 'rrowyylh2i',
        'it': '1xb1jztsvr',
        'pt': '1ad1ip3ly7',
        'pt-br': '1ad1ip3ly7',
        'ja': 'uzkfi9uai0',
        'ja-Hira': 'uzkfi9uai0'
    },
    'glide-around': {
        'en': 'sh9j978rg8',
        'ar': '8c4b4jb2se',
        'fr': 'f73cjf5zzf',
        'it': 'nvdhpgiebe',
        'ja': 'jsat4vhu48',
        'ja-Hira': 'jsat4vhu48'
    },
    'record-a-sound': {
        'en': 'ulzl1fbzny',
        'ar': 'vx60cuwzo9',
        'fr': 'ep92lqlp7p',
        'it': 'ncr9lqk7bt',
        'pt': 'aavagpvh5w',
        'pt-br': 'aavagpvh5w',
        'ja': '5zmy6u614k',
        'ja-Hira': '5zmy6u614k'
    },
    'spin-video': {
        'en': '07fed5hhpv',
        'ar': '5hl1dq3byk',
        'fr': 'cqzi6cr872',
        'it': 'obmrphhobt',
        'pt': 'jxqksu6zcw',
        'pt-br': 'jxqksu6zcw',
        'ja': 'hjhc0a8r7j',
        'ja-Hira': 'hjhc0a8r7j'
    },
    'hide-and-show': {
        'en': 'g479ahobo9',
        'ar': 'r25otzahzi',
        'fr': 'o1h6llwd0e',
        'it': 'v0vbx3l5uk',
        'pt': 'ibtmwb58y8',
        'pt-br': 'ibtmwb58y8',
        'ja': 'ruynguvag5',
        'ja-Hira': 'ruynguvag5'
    },
    'switch-costume': {
        'en': '1ocp6a1ejn',
        'ar': '2tz31cmeaq',
        'fr': '2s9sagktio',
        'it': 'nty4xjtqcj',
        'pt': 'pnlmmv2hs7',
        'pt-br': 'pnlmmv2hs7',
        'ja': 'g3vluv0ms8',
        'ja-Hira': 'g3vluv0ms8'
    },
    'move-around-with-arrow-keys': {
        'en': 'yetrmk4iuu',
        'ar': '270xh1zb1s',
        'fr': '69tc5nvykx',
        'it': 'jse0g0uddw',
        'pt': 'erv6eff78p',
        'pt-br': 'erv6eff78p',
        'ja': 'fk34dcg5oz',
        'ja-Hira': 'fk34dcg5oz'
    },
    'add-effects': {
        'en': '3jvl8zgjo2',
        'ar': 'fp4y3aumie',
        'fr': 'nyutlj812e',
        'it': 'q3cjjyfju9',
        'pt': 'dz6jzpf7hm',
        'pt-br': 'dz6jzpf7hm',
        'ja': 'q7zq9vu0wb',
        'ja-Hira': 'q7zq9vu0wb'
    },
    'make-it-fly': {
        en: 'zbtdx2dem9'
    },
    'pong-game': {
        en: '8m48dv0ens'
    },
    'imagine': {
        en: '1ndh08yiso'
    },
    'code-cartoon': {
        en: 'fpfuky3x6g'
    },
    'talking': {
        en: 'j0208mq4qi'
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
    if (!Object.prototype.hasOwnProperty.call(videos, videoId)) return videoId;
    if (Object.prototype.hasOwnProperty.call(videos[videoId], locale)) {
        return videos[videoId][locale];
    }
    return videos[videoId].en;
};

export {
    translateVideo
};
