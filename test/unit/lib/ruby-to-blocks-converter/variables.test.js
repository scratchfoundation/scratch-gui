import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    expectToEqualRubyStatement,
    rubyToExpected
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Variables', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
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
    });

    test('data_changevariableby', () => {
    });

    test('data_showvariable', () => {
    });

    test('data_hidevariable', () => {
    });

    test('data_listcontents', () => {
    });

    test('data_addtolist', () => {
    });

    test('data_deleteoflist', () => {
    });

    test('data_deletealloflist', () => {
    });

    test('data_insertatlist', () => {
    });

    test('data_replaceitemoflist', () => {
    });

    test('data_itemoflist', () => {
    });

    test('data_itemnumoflist', () => {
    });

    test('data_lengthoflist', () => {
    });

    test('data_listcontainsitem', () => {
    });

    test('data_showlist', () => {
    });

    test('data_hidelist', () => {
    });
});
