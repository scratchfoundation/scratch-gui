/* eslint-disable import/no-unresolved */
import backdrop from '!raw-loader!./c17163c6954e9422ac2405de4c9d68c8.svg';
/* eslint-enable import/no-unresolved */

const missingProject = translator => {
    let _TextEncoder;
    if (typeof TextEncoder === 'undefined') {
        _TextEncoder = require('text-encoding').TextEncoder;
    } else {
        /* global TextEncoder */
        _TextEncoder = TextEncoder;
    }
    const encoder = new _TextEncoder();

    return [{
        id: 'c17163c6954e9422ac2405de4c9d68c8',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }];
};

export default missingProject;
