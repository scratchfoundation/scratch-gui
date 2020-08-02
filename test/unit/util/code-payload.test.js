jest.mock('../../../src/lib/backpack/block-to-image', () => () => Promise.resolve('block-image'));
jest.mock('../../../src/lib/backpack/jpeg-thumbnail', () => () => Promise.resolve('thumbnail'));

import codePayload from '../../../src/lib/backpack/code-payload';
import {Base64} from 'js-base64';

describe('codePayload', () => {
    test('base64 encodes the blocks as json', () => {
        const blocks = '☁︎❤️🐻';
        const payload = codePayload({
            blockObjects: blocks
        });
        return payload.then(p => {
            expect(
                JSON.parse(Base64.decode(p.body))
            ).toEqual(blocks);
        });
    });
});
