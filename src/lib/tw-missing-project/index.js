/* eslint-disable import/no-unresolved */
import backdrop from '!raw-loader!./c17163c6954e9422ac2405de4c9d68c8.svg';
/* eslint-enable import/no-unresolved */

import projectData from './project-data';

export const MISSING_PROJECT_ID = '__missing__';

const missingProject = () => {
    let _TextEncoder;
    if (typeof TextEncoder === 'undefined') {
        _TextEncoder = require('text-encoding').TextEncoder;
    } else {
        /* global TextEncoder */
        _TextEncoder = TextEncoder;
    }
    const encoder = new _TextEncoder();

    const projectJson = projectData();
    return [{
        id: MISSING_PROJECT_ID,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, {
        id: 'c17163c6954e9422ac2405de4c9d68c8',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }];
};

export default missingProject;
