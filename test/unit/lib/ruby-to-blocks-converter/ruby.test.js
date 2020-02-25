import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectRubyBlockError
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Ruby', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    test('ruby_range', () => {
        const code = '1..10';
        convertAndExpectRubyBlockError(converter, target, code);
    });

    test('ruby_exclude_range', () => {
        const code = '1...10';
        convertAndExpectRubyBlockError(converter, target, code);
    });

    test('ruby_statement(wait)', () => {
        [
            'wait',
            'wait()',
            'wait(  )',
            'wait(\n)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('ruby_statement_with_block', () => {
        const code = `
            method_call(1) do |arg1, arg2|
              move(arg1)
              move(arg2)
              move(10)
            end
        `;
        convertAndExpectRubyBlockError(converter, target, code);
    });
});
