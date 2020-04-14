import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Mesh', () => {
    let converter;
    let target;
    let code;
    let expected;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
        code = null;
        expected = null;
    });

    test('mesh_getSensorValue', () => {
        code = 'mesh_sensor_value(" ")';
        expected = [
            {
                opcode: 'mesh_getSensorValue',
                inputs: [
                    {
                        name: 'NAME',
                        block: {
                            opcode: 'mesh_menu_variableNames',
                            fields: [
                                {
                                    name: 'variableNames',
                                    value: ' '
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'mesh_sensor_value()',
            'mesh_sensor_value(1)',
            'mesh_sensor_value("arg1", "arg2")'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });
});
