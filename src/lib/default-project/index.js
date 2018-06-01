import {TextEncoder} from 'text-encoding';
import projectJson from './project.json';

/* eslint-disable import/no-unresolved */
import popWav from '!arraybuffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav';
import meowWav from '!arraybuffer-loader!./83c36d806dc92327b9e7049a565c6bff.wav';
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import costume1 from '!raw-loader!./f127434672b872a902346ef3c1af45f2.svg';
import costume2 from '!raw-loader!./647d4bd53163f94a7dabf623ccab7fd3.svg';
/* eslint-enable import/no-unresolved */

const encoder = new TextEncoder();
export default [{
    id: 0,
    assetType: 'Project',
    dataFormat: 'JSON',
    data: JSON.stringify(projectJson)
}, {
    id: '83a9787d4cb6f3b7632b4ddfebf74367',
    assetType: 'Sound',
    dataFormat: 'WAV',
    data: new Uint8Array(popWav)
}, {
    id: '83c36d806dc92327b9e7049a565c6bff',
    assetType: 'Sound',
    dataFormat: 'WAV',
    data: new Uint8Array(meowWav)
}, {
    id: 'cd21514d0531fdffb22204e0ec5ed84a',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(backdrop)
}, {
    id: 'f127434672b872a902346ef3c1af45f2',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(costume1)
}, {
    id: '647d4bd53163f94a7dabf623ccab7fd3',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(costume2)
}];
