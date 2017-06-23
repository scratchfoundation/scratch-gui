const LineBreaker = require('linebreak');
const GraphemeBreaker = require('grapheme-breaker');

/**
 * Tell this text wrapper to use a specific measurement provider.
 * @typedef {object} MeasurementProvider - the new measurement provider.
 * @property {Function} beginMeasurementSession - this will be called before a batch of measurements are made.
 *      Optionally, this function may return an object to be provided to the endMeasurementSession function.
 * @property {Function} measureText - this will be called each time a piece of text must be measured.
 * @property {Function} endMeasurementSession - this will be called after a batch of measurements is finished.
 *      It will be passed whatever value beginMeasurementSession returned, if any.
 */

/**
 * Utility to wrap text across several lines, respecting Unicode grapheme clusters and, when possible, Unicode line
 * break opportunities.
 * Reference material:
 * - Unicode Standard Annex #14: http://unicode.org/reports/tr14/
 * - Unicode Standard Annex #39: http://unicode.org/reports/tr29/
 * - "JavaScript has a Unicode problem" by Mathias Bynens: https://mathiasbynens.be/notes/javascript-unicode
 */
class TextWrapper {

    /**
     * Construct a text wrapper which will measure text using the specified measurement provider.
     * @param {MeasurementProvider} measurementProvider - a helper object to provide text measurement services.
     */
    constructor (measurementProvider) {
        this._measurementProvider = measurementProvider;
    }

    /**
     * Wrap the provided text into lines restricted to a maximum width. See Unicode Standard Annex (UAX) #14.
     * @param {number} maxWidth - the maximum allowed width of a line.
     * @param {string} text - the text to be wrapped. Will be split on whitespace.
     * @returns {Array.<string>} an array containing the wrapped lines of text.
     */
    wrapText (maxWidth, text) {
        // Normalize to canonical composition (see Unicode Standard Annex (UAX) #15)
        text = text.normalize();

        const measurementSession = this._measurementProvider.beginMeasurementSession();

        const breaker = new LineBreaker(text);
        let lastPosition = 0;
        let nextBreak;
        let currentLine = null;
        const lines = [];

        while ((nextBreak = breaker.nextBreak())) {
            const word = text.slice(lastPosition, nextBreak.position).replace(/\n+$/, '');

            let proposedLine = (currentLine || '').concat(word);
            let proposedLineWidth = this._measurementProvider.measureText(proposedLine);

            if (proposedLineWidth > maxWidth) {
                // The next word won't fit on this line. Will it fit on a line by itself?
                const wordWidth = this._measurementProvider.measureText(word);
                if (wordWidth > maxWidth) {
                    // The next word can't even fit on a line by itself. Consume it one grapheme cluster at a time.
                    let lastCluster = 0;
                    let nextCluster;
                    while (lastCluster !== (nextCluster = GraphemeBreaker.nextBreak(word, lastCluster))) {
                        const cluster = word.substring(lastCluster, nextCluster);
                        proposedLine = (currentLine || '').concat(cluster);
                        proposedLineWidth = this._measurementProvider.measureText(proposedLine);
                        if ((currentLine === null) || (proposedLineWidth <= maxWidth)) {
                            // first cluster of a new line or the cluster fits
                            currentLine = proposedLine;
                        } else {
                            // no more can fit
                            lines.push(currentLine);
                            currentLine = cluster;
                        }
                        lastCluster = nextCluster;
                    }
                } else {
                    // The next word can fit on the next line. Finish the current line and move on.
                    if (currentLine !== null) lines.push(currentLine);
                    currentLine = word;
                }
            } else {
                // The next word fits on this line. Just keep going.
                currentLine = proposedLine;
            }

            // Did we find a \n or similar?
            if (nextBreak.required) {
                if (currentLine !== null) lines.push(currentLine);
                currentLine = null;
            }

            lastPosition = nextBreak.position;
        }

        currentLine = currentLine || '';
        if (currentLine.length > 0 || lines.length === 0) {
            lines.push(currentLine);
        }

        this._measurementProvider.endMeasurementSession(measurementSession);

        return lines;
    }
}

module.exports = TextWrapper;
