/* eslint-disable import/no-unresolved */
import backdrop from '!raw-loader!./c17163c6954e9422ac2405de4c9d68c8.svg';
/* eslint-enable import/no-unresolved */

import projectData from './project-data';
import {TextEncoder} from '../tw-text-encoder';

export const MISSING_PROJECT_ID = '__missing__';

const missingProject = () => {
    const encoder = new TextEncoder();

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
