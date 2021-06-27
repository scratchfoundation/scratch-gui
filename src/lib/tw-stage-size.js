import paintStageSize from 'scratch-paint/src/lib/tw-stage-size';

const PARAM = 'size';

const getDimensions = () => {
    // Running in node.js
    if (typeof URLSearchParams === 'undefined') {
        return null;
    }

    const urlParameters = new URLSearchParams(location.search);
    const dimensionsQuery = urlParameters.get(PARAM);
    if (dimensionsQuery === null) {
        return null;
    }
    const match = dimensionsQuery.match(/^(\d+)[^\d]+(\d+)$/);
    if (!match) {
        // eslint-disable-next-line no-alert
        alert('Could not parse custom stage size');
        return null;
    }
    const [_, widthText, heightText] = match;
    if (!widthText || !heightText) {
        return null;
    }

    const width = Math.max(0, Math.min(4096, +widthText));
    const height = Math.max(0, Math.min(4096, +heightText));
    paintStageSize.width = width;
    paintStageSize.height = height;
    return {
        width,
        height
    };
};

export default getDimensions() || {
    width: 480,
    height: 360
};
