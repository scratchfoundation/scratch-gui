const MEOWING_MEOW = ['meow', 'meow', 'meow', 'meow', 'meow', 'purr', 'purr', 'purr', 'purrow', 'lick', 'lick', 'pur'];

/**
 * Meows.
 * @param {number} meowNumber Number of the meow.
 * @return {string} the meow
 */
export default function (meowNumber) {
    let str = '';
    for (let n = 0; n < meowNumber; n++) {
        str += `${MEOWING_MEOW[Math.floor(Math.random() * MEOWING_MEOW.length)]} `;
    }
    return str.trim();
}
