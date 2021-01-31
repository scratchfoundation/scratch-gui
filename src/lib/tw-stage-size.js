// Some limits to make sure the interface doesn't completely fall apart
const MIN_WIDTH = 480;
const MIN_HEIGHT = 25;

const MAX_WIDTH = 4096;
const MAX_HEIGHT = 4096;

const DEFAULT_WIDTH = 480;
const DEFAULT_HEIGHT = 360;

const PARAM = 'size';

const getDimensions = () => {
    // Running in node.js
    if (typeof URLSearchParams === 'undefined') {
        return {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        };
    }

    const urlParameters = new URLSearchParams(location.search);
    if (!urlParameters.has(PARAM)) {
        return {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        };
    }

    const dimensionsQuery = urlParameters.get(PARAM);
    const [_, widthText, heightText] = dimensionsQuery.match(/^(\d+)[^\d]+(\d+)$/);
    if (!widthText || !heightText) {
        return {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        };
    }

    const width = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, +widthText));
    const height = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, +heightText));
    return {
        width,
        height
    };
};

export default getDimensions();
