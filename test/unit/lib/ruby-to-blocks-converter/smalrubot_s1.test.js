import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/SmalrubotS1', () => {
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

    test('smalrubotS1_action', () => {
        const actions = [
            'forward',
            'backward',
            'left',
            'right',
            'stop'
        ];
        actions.forEach(action => {
            code = `smalrubot_s1.action("${action}")`;
            expected = [
                {
                    opcode: 'smalrubotS1_action',
                    fields: [
                        {
                            name: 'ACTION',
                            value: action
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        [
            'smalrubot_s1.action',
            'smalrubot_s1.action()',
            'smalrubot_s1.action(1)',
            'smalrubot_s1.action("invalid action")'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('smalrubotS1_actionAndStopAfter', () => {
        const actions = [
            'forward',
            'backward',
            'left',
            'right',
            'stop'
        ];
        actions.forEach(action => {
            code = `smalrubot_s1.action("${action}", 0.5)`;
            expected = [
                {
                    opcode: 'smalrubotS1_actionAndStopAfter',
                    inputs: [
                        {
                            name: 'SECS',
                            block: expectedInfo.makeNumber(0.5)
                        }
                    ],
                    fields: [
                        {
                            name: 'ACTION',
                            value: action
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        [
            'smalrubot_s1.action("left", "invalid sec")',
            'smalrubot_s1.action("left", 0.5, "invalid argument")'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('smalrubotS1_bendArm', () => {
        code = 'smalrubot_s1.bend_arm(90, 1)';
        expected = [
            {
                opcode: 'smalrubotS1_bendArm',
                inputs: [
                    {
                        name: 'DEGREE',
                        block: expectedInfo.makeNumber(90)
                    },
                    {
                        name: 'SECS',
                        block: expectedInfo.makeNumber(1)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'smalrubot_s1.bend_arm',
            'smalrubot_s1.bend_arm()',
            'smalrubot_s1.bend_arm(90)',
            'smalrubot_s1.bend_arm(90, 1, 2)',
            'smalrubot_s1.bend_arm("90", 1)',
            'smalrubot_s1.bend_arm(90, "1")',
            'smalrubot_s1.bend_arm("90", "1")'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('smalrubotS1_getSensorValue', () => {
        const positions = [
            'left',
            'right',
            'touch'
        ];
        positions.forEach(position => {
            code = `smalrubot_s1.sensor_value("${position}")`;
            expected = [
                {
                    opcode: 'smalrubotS1_getSensorValue',
                    fields: [
                        {
                            name: 'POSITION',
                            value: position
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        [
            'smalrubot_s1.sensor_value',
            'smalrubot_s1.sensor_value()',
            'smalrubot_s1.sensor_value("invalid position")',
            'smalrubot_s1.sensor_value("left", "invalid argument")',
            'smalrubot_s1.sensor_value(1)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('smalrubotS1_turnLedOn', () => {
        const positions = [
            'left',
            'right'
        ];
        positions.forEach(position => {
            code = `smalrubot_s1.led("${position}", true)`;
            expected = [
                {
                    opcode: 'smalrubotS1_turnLedOn',
                    fields: [
                        {
                            name: 'POSITION',
                            value: position
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        [
            'smalrubot_s1.led',
            'smalrubot_s1.led(1)',
            'smalrubot_s1.led("invalid position", true)',
            'smalrubot_s1.led("left", "invalid state")',
            'smalrubot_s1.led("left", true, "invalid argument")'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('smalrubotS1_turnLedOff', () => {
        const positions = [
            'left',
            'right'
        ];
        positions.forEach(position => {
            code = `smalrubot_s1.led("${position}", false)`;
            expected = [
                {
                    opcode: 'smalrubotS1_turnLedOff',
                    fields: [
                        {
                            name: 'POSITION',
                            value: position
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        [
            'smalrubot_s1.led("invalid position", false)',
            'smalrubot_s1.led("left", false, "invalid argument")'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('smalrubotS1_getMotorSpeed', () => {
        const positions = [
            'left',
            'right'
        ];
        positions.forEach(position => {
            code = `smalrubot_s1.get_motor_speed("${position}")`;
            expected = [
                {
                    opcode: 'smalrubotS1_getMotorSpeed',
                    fields: [
                        {
                            name: 'POSITION',
                            value: position
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        [
            'smalrubot_s1.get_motor_speed',
            'smalrubot_s1.get_motor_speed()',
            'smalrubot_s1.get_motor_speed("left", "invalid speed")',
            'smalrubot_s1.get_motor_speed(1)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('smalrubotS1_setMotorSpeed', () => {
        const positions = [
            'left',
            'right'
        ];
        positions.forEach(position => {
            code = `smalrubot_s1.set_motor_speed("${position}", 100)`;
            expected = [
                {
                    opcode: 'smalrubotS1_setMotorSpeed',
                    inputs: [
                        {
                            name: 'SPEED',
                            block: expectedInfo.makeNumber(100)
                        }
                    ],
                    fields: [
                        {
                            name: 'POSITION',
                            value: position
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        [
            'smalrubot_s1.set_motor_speed',
            'smalrubot_s1.set_motor_speed()',
            'smalrubot_s1.set_motor_speed("left")',
            'smalrubot_s1.set_motor_speed("left", "invalid speed")',
            'smalrubot_s1.set_motor_speed(1, 100)',
            'smalrubot_s1.set_motor_speed("left", 100, "invalid argument")'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });
});
