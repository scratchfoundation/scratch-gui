/**
 * Guess the delimiter used to separate the fields in multicolumn data.
 * Note: Assume we've found the right delimiter if it splits three lines into
 * the same number (greater than 1) of fields.
 * @param {Array.<string>} lines - The lines of data to use.
 * @returns {?string} - The delimiter, or null if the data is not multicolumn.
 */
const guessDelimiter = function (lines) {
    if (lines.length === 0) {
        return null;
    }

    for (const d of [',', '\t']) {
        const count1 = lines[0].split(d).length;
        const count2 = lines[Math.floor(lines.length / 2)].split(d).length;
        const count3 = lines[lines.length - 1].split(d).length;
        if ((count1 > 1) && (count1 === count2) && (count1 === count3)) {
            return d;
        }
    }

    return null;
};

/**
 * Extract a single column of data from a list of rows.
 * @param {number} column - Column index, 1-indexed.
 * @param {Array.<string>} lines - The lines of data to use.
 * @param {string} delimiter - Delimiter to divide columns by.
 * @returns {Array.<string>} Array of items extracted.
 */
const extractColumn = function (column, lines, delimiter) {
    return lines.map(line => {
        const columns = line.split(delimiter);
        return (column <= columns.length) ? columns[column - 1] : '';
    });
};

/**
 * Parse CSV (or similar) data. If passed data is multicolumn, a single column is returned.
 * @param {Array.<string>} lines - The lines of data to parse.
 * @param {function} onChooseColumn - Function to get the single column index (1-indexed), for multicolumn data.
 * @returns {Promise} Array of items returned from parsing.
 */
export const parse = function (lines, onChooseColumn) {
    const delimiter = guessDelimiter(lines);

    if (delimiter === null) {
        return Promise.resolve(lines);
    }

    const columnCount = lines[0].split(delimiter).length;

    return Promise.resolve(onChooseColumn(columnCount)).then(columnInput => {
        const column = parseInt(columnInput, 10);
        if (isNaN(column) || (column < 1) || (column > columnCount)) {
            return lines;
        }
        return extractColumn(column, lines, delimiter);
    });
};

/**
 * Remove empty (falsey) items from given array. Mutates the passed array.
 * @param {Array.<string>} lines - The lines of data to use.
 * @returns {Array.<string>} The same array, with trailing empty items removed.
 */
const removeTrailingEmptyLines = function (lines) {
    while (lines.length && !lines[lines.length - 1]) {
        lines.pop();
    }
    return lines;
};

/**
 * Parse CSV (or similar) data from a file selected by the user.
 * @param {function} onChooseColumn - Function to get the single column index (1-indexed), for multicolumn data.
 * @returns {Promise} Array of items returned from parsing.
 */
export default function parseFromFile (onChooseColumn) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            const text = fileReader.result;
            const lines = removeTrailingEmptyLines(text.split(/\r\n|[\r\n]/));
            resolve(parse(lines, onChooseColumn));
        };
        fileReader.onerror = reject;

        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', '.csv, .tsv, .txt'); // parser auto-detects delimiter
        fileInput.onchange = e => {
            const file = e.target.files[0];
            fileReader.readAsText(file);
        };

        document.body.appendChild(fileInput);
        fileInput.click();
    });
}
