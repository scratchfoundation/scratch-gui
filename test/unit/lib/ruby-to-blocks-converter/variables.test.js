import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    expectToEqualRubyStatement,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Variables', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null; // TODO: 正しいtargetを用意して、定義済みの各種変数はそれを参照しているかチェックする。無駄に新しい変数を作らせないこと。
    });

    test('data_variable', () => {
        const code = '@a';
        const expected = [
            {
                opcode: 'data_variable',
                fields: [
                    {
                        name: 'VARIABLE',
                        variable: '@a'
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('data_setvariableto', () => {
        const code = '@a = 0';
        const expected = [
            {
                opcode: 'data_setvariableto',
                fields: [
                    {
                        name: 'VARIABLE',
                        variable: '@a'
                    }
                ],
                inputs: [
                    {
                        name: 'VALUE',
                        block: expectedInfo.makeText('0')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('data_changevariableby', () => {
        const code = '@a += 1';
        const expected = [
            {
                opcode: 'data_changevariableby',
                fields: [
                    {
                        name: 'VARIABLE',
                        variable: '@a'
                    }
                ],
                inputs: [
                    {
                        name: 'VALUE',
                        block: expectedInfo.makeText('1')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            '@a -= 1',
            '@a *= 1',
            '@a /= 1',
            '@a %= 1'
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter, s);
        });
    });

    test('data_showvariable', () => {
        const code = 'show_variable("@a")';
        const expected = [
            {
                opcode: 'data_showvariable',
                fields: [
                    {
                        name: 'VARIABLE',
                        variable: '@a'
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'show_variable("a")',
            'show_variable(1)',
            'show_variable("&a")'
        ].forEach(s => {
            converter.targetCodeToBlocks(target, s);
            expectToEqualRubyStatement(converter, s);
        });
    });

    test('data_hidevariable', () => {
        const code = 'hide_variable("@a")';
        const expected = [
            {
                opcode: 'data_hidevariable',
                fields: [
                    {
                        name: 'VARIABLE',
                        variable: '@a'
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'hide_variable("a")',
            'hide_variable(1)',
            'hide_variable("&a")'
        ].forEach(s => {
            converter.targetCodeToBlocks(target, s);
            expectToEqualRubyStatement(converter, s);
        });
    });

    test.skip('data_listcontents', () => {
    });

    test.skip('data_addtolist', () => {
    });

    test.skip('data_deleteoflist', () => {
    });

    test.skip('data_deletealloflist', () => {
    });

    test.skip('data_insertatlist', () => {
    });

    test.skip('data_replaceitemoflist', () => {
    });

    test.skip('data_itemoflist', () => {
    });

    test.skip('data_itemnumoflist', () => {
    });

    test.skip('data_lengthoflist', () => {
    });

    test.skip('data_listcontainsitem', () => {
    });

    test.skip('data_showlist', () => {
    });

    test.skip('data_hidelist', () => {
    });
});
