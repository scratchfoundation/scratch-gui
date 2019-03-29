import Papa from 'papaparse';

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
 * Split an array of lines into rows (each line into an array of cells) by a given delimiter.
 * @param {Array.<string>} lines - The lines of data to use.
 * @param {string} delimiter - The character to split lines by.
 * @returns {Array.<string>} Two-dimensional array of the rows and then columns representing the given data.
 */
const splitLinesIntoRows = function (lines, delimiter) {
    return lines.map(line => line.split(delimiter));
};

/**
 * Extract a single column of data from a list of rows. If the column number is zero, the original lines read directly
 * from the file are returned.
 * @param {number} column - Column index, 1-indexed.
 * @param {Array.<string>} rows - The rows of data to use.
 * @param {Array.<string>} lines - The original lines read from a file.
 * @returns {Array.<string>} Array of items extracted.
 */
const extractColumnFromRows = function (column, rows, lines) {
    if (column === 0) {
        return lines;
    }
    return rows.map(cells => (column <= cells.length ? cells[column - 1] : ''));
};

/**
 * Show a prompt for choosing the column number to retrieve when parsing multi-column data, then validate the value
 * entered.
 * @param {number} numberOfColumns - Number of columns, defining the valid range of column numbers (1 -> N inclusive).
 * @param {function} onChooseColumn - Function to actually show the prompt for getting the single column index
 *     (1-indexed), for multicolumn data.
 * @returns {Promise} Promise that resolves with the number chosen, validated. This is zero if the number is invalid.
 */
const promptColumnNumber = function (numberOfColumns, onChooseColumn) {
    if (numberOfColumns > 1) {
        return Promise.resolve(onChooseColumn(numberOfColumns)).then(columnInput => {
            const column = parseInt(columnInput, 10);
            if (isNaN(column) || (column < 1) || (column > numberOfColumns)) {
                return 0;
            }
            return column;
        });
    }
    return Promise.resolve(numberOfColumns);
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
 * Parse "CSV" data from an array of lines in a manner compatible with files exported from Scratch 2.0.
 * If passed data is multicolumn, a single column is returned.
 * @param {Array.<string>} lines - Array of lines to parse.
 * @param {function} onChooseColumn - Function to get the single column index (1-indexed), for multicolumn data.
 * @returns {Promise} Array of items returned from parsing.
 */
export const parseTxt = function (lines, onChooseColumn) {
    const delimiter = guessDelimiter(lines);

    if (delimiter === null) {
        return Promise.resolve(lines);
    }

    const rows = splitLinesIntoRows(lines, delimiter);
    const numberOfColumns = rows[0].length;

    return promptColumnNumber(numberOfColumns, onChooseColumn)
        .then(column => extractColumnFromRows(column, rows, lines));
};

/**
 * Use Papaparse to parse CSV data from a string. If passed data is multicolumn, a single column is returned.
 * @param {string} lines - Array of CSV-formatted lines from which to read data.
 * @param {function} onChooseColumn - Function to get the single column index (1-indexed), for multicolumn data.
 * @returns {Promise} Array of items returned from parsing.
 */
export const parseCsv = function (lines, onChooseColumn) {
    const text = lines.join('\n');
    const {data} = Papa.parse(text, {header: false});
    const numberOfColumns = data[0].length;
    return promptColumnNumber(numberOfColumns, onChooseColumn)
        .then(column => extractColumnFromRows(column, data, lines));
};

/**
 * Use FileReader to read the text contents of a file.
 * @param {File} file - The file to read.
 * @returns {Promise} Resolves to a string - the contents of the file.
 */
const readFile = function (file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            resolve(fileReader.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(file);
    });
};

/**
 * Parse CSV (or similar) data from a file selected by the user.
 * @param {function} onChooseColumn - Function to get the single column index (1-indexed), for multicolumn data.
 * @returns {Promise} Array of items returned from parsing.
 */
export default function parseFromFile (onChooseColumn) {
    const fileInput = document.createElement('input');

    const removeInput = data => {
        document.body.removeChild(fileInput);
        return data;
    };

    return new Promise(resolve => {
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', '.csv, .tsv, .txt'); // parser auto-detects delimiter
        fileInput.onchange = e => {
            const file = e.target.files[0];
            readFile(file).then(text => {
                const lines = removeTrailingEmptyLines(text.split(/\r\n|[\r\n]/));
                if (file.name.split('.').pop() === 'txt') {
                    resolve(parseTxt(lines, onChooseColumn));
                } else {
                    resolve(parseCsv(lines, onChooseColumn));
                }
            });
        };

        document.body.appendChild(fileInput);
        fileInput.click();
    }).then(removeInput, removeInput); // Always remove the file input before resolving or rejecting.
}
