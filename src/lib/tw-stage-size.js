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

    const width = +widthText;
    const height = +heightText;
    if (
        width <= 0 ||
        width > MAX_WIDTH ||
        height <= 0 ||
        height > MAX_HEIGHT
    ) {
        return {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        };
    }
    return {
        width,
        height
    };
};

export default getDimensions();
