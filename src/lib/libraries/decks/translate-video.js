/**
 * @fileoverview
 * Utility function to look up whether a translated video exists for a locale.
 */

// TODO: ja-Hira are copies of ja, replace with real ja-Hira when available.
const videos = {
    'intro-move-sayhello': {
        'en': 'rpjvs3v9gj',
        'ja': 'v2c2f3y2sc',
        'ja-Hira': 'v2c2f3y2sc'
    },
    'animate-a-name': {
        'en': 'pyur30ho05',
        'ja': 'xrmgno02th',
        'ja-Hira': 'xrmgno02th'
    },
    'Make-Music': {
        'en': 'ir0j8ljsgm',
        'ja': 'iybhyobckr',
        'ja-Hira': 'iybhyobckr'
    },
    'Make-A-Game': {
        'en': '5rp47ys13g',
        'ja': 'h4q2ea3ojw',
        'ja-Hira': 'h4q2ea3ojw'
    },
    'Chase-Game': {
        'en': 'kusyx9thl5',
        'ja': 'wr6ysk8s6d',
        'ja-Hira': 'wr6ysk8s6d'
    },
    'add-a-backdrop': {
        'en': 'nict6zdzlx',
        'ja': 'j382ohngg7',
        'ja-Hira': 'j382ohngg7'
    },
    'change-size': {
        'en': 'p8va85hh61',
        'ja': 'uzkfi9uai0',
        'ja-Hira': 'uzkfi9uai0'
    },
    'glide-around': {
        'en': 'sh9j978rg8',
        'ja': 'jsat4vhu48',
        'ja-Hira': 'jsat4vhu48'
    },
    'record-a-sound': {
        'en': 'ulzl1fbzny',
        'ja': '5zmy6u614k',
        'ja-Hira': '5zmy6u614k'
    },
    'spin-video': {
        'en': '07fed5hhpv',
        'ja': 'hjhc0a8r7j',
        'ja-Hira': 'hjhc0a8r7j'
    },
    'hide-and-show': {
        'en': 'g479ahobo9',
        'ja': 'ruynguvag5',
        'ja-Hira': 'ruynguvag5'
    },
    'switch-costume': {
        'en': '1ocp6a1ejn',
        'ja': 'g3vluv0ms8',
        'ja-Hira': 'g3vluv0ms8'
    },
    'move-around-with-arrow-keys': {
        'en': 'yetrmk4iuu',
        'ja': 'fk34dcg5oz',
        'ja-Hira': 'fk34dcg5oz'
    },
    'add-effects': {
        'en': '3jvl8zgjo2',
        'ja': 'q7zq9vu0wb',
        'ja-Hira': 'q7zq9vu0wb'
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
