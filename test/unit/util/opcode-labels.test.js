import opcodeLabels from '../../../src/lib/opcode-labels';

const extensionColor = '#0FBD8C';

describe('Opcode Labels', () => {
    test('day of week label', () => {
        const labelFun = opcodeLabels.getLabel('sensing_current').labelFn;
        expect(labelFun({CURRENTMENU: 'dayofweek'})).toBe('day of week');
        expect(labelFun({CURRENTMENU: 'DAYOFWEEK'})).toBe('day of week');
    });

    test('unspecified opcodes default to opcode as label and use default extension color as color', () => {
        const labelInfo = opcodeLabels.getLabel('music_getTempo');
        expect(labelInfo.label).toBe('music_getTempo');
        expect(typeof labelInfo.color).toBe('string');
        expect(labelInfo.color).toBe(extensionColor);
    });
});
