/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const normalize = i => i.toLowerCase()
    .replace(/['"()\-+,./]/g, '')
    .trim();

const textsToWords = texts => {
    const words = new Set();
    for (const text of texts) {
        for (const word of normalize(text).split(' ')) {
            words.add(word);
        }
    }
    return Array.from(words);
};

class Search {
    constructor (items) {
        this.items = items.map(textsToWords);
    }

    search (query) {
        const terms = normalize(query).split(' ');
        const result = [];
        const processItem = (item, index) => {
            for (const term of terms) {
                let found = false;
                for (const itemWord of item) {
                    if (itemWord.includes(term)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    return;
                }
            }
            result.push({
                index
            });
        };
        for (let i = 0; i < this.items.length; i++) {
            processItem(this.items[i], i);
        }
        return result;
    }
}

export default Search;
