import {TextEncoder} from 'text-encoding';
import projectJson from './project.json';

/* eslint-disable import/no-unresolved */
import popWav from '!arraybuffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav';
import meowWav from '!arraybuffer-loader!./83c36d806dc92327b9e7049a565c6bff.wav';
import backdrop from '!arraybuffer-loader!./739b5e2a2435f6e1ec2993791b423146.png';
import costume1 from '!raw-loader!./09dc888b0b7df19f70d81588ae73420e.svg';
import costume2 from '!raw-loader!./3696356a03a8d938318876a593572843.svg';
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
    id: '739b5e2a2435f6e1ec2993791b423146',
    assetType: 'ImageBitmap',
    dataFormat: 'PNG',
    data: new Uint8Array(backdrop)
}, {
    id: '09dc888b0b7df19f70d81588ae73420e',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(costume1)
}, {
    id: '3696356a03a8d938318876a593572843',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(costume2)
}];
