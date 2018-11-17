import opcodeLabels from '../../../src/lib/opcode-labels';

describe('Opcode Labels', () => {
    test('day of week label', () => {
        const labelFun = opcodeLabels.getLabel('sensing_current').labelFn;
        expect(labelFun({CURRENTMENU: 'dayofweek'})).toBe('day of week');
        expect(labelFun({CURRENTMENU: 'DAYOFWEEK'})).toBe('day of week');
    });

    test('unspecified opcodes default to extension category and opcode as label', () => {
        const labelInfo = opcodeLabels.getLabel('music_getTempo');
        expect(labelInfo.label).toBe('music_getTempo');
        expect(labelInfo.category).toBe('extension');
    });
});
