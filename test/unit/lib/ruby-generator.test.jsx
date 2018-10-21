import VM from 'scratch-vm';
import VMScratchBlocks from '../../../src/lib/blocks';
import RubyGenerator from '../../../src/lib/ruby-generator';

describe('RubyGenerator', () => {
    let vm;
    let Blockly;
    let Ruby;

    beforeEach(() => {
        vm = new VM();
        Blockly = VMScratchBlocks(vm);
        Blockly = RubyGenerator(Blockly);
        Ruby = Blockly.Ruby;
        Ruby.init();
    });

    afterEach(() => {
        Ruby.editingTarget = null;
    });

    test('defined Ruby', () => {
        expect(Ruby).toBeInstanceOf(Blockly.Generator);
    });

    describe('quote_', () => {
        test('escape only " to \\"', () => {
            const arg = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'; // eslint-disable-line
            const expected = '"!\\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"'; // eslint-disable-line
            expect(Ruby.quote_(arg)).toEqual(expected);
        });
    });

    describe('spriteName', () => {
        test('return sprite("name of sprite")', () => {
            Ruby.editingTarget = {
                sprite: {
                    name: 'Sprite1'
                }
            };
            expect(Ruby.spriteName()).toEqual('sprite("Sprite1")');
        });

        test('"name of sprite" is escaped', () => {
            Ruby.editingTarget = {
                sprite: {
                    name: '"Sprite1"'
                }
            };
            expect(Ruby.spriteName()).toEqual('sprite("\\"Sprite1\\"")');
        });
    });

    describe('defineSprite', () => {
        const spriteName = 'Sprite1';
        let renderedTarget;

        beforeEach(() => {
            renderedTarget = {
                constructor: {
                    ROTATION_STYLE_LEFT_RIGHT: 'left-right',
                    ROTATION_STYLE_NONE: 'don\'t rotate'
                },
                sprite: {
                    name: spriteName,
                    costumes: [
                        {
                            assetId: '01ae57fd339529445cb890978ef8a054',
                            name: 'Costume1',
                            bitmapResolution: 1,
                            md5: '01ae57fd339529445cb890978ef8a054.svg',
                            dataFormat: 'svg',
                            rotationCenterX: 47,
                            rotationCenterY: 55
                        },
                        {
                            assetId: '3b6274510488d5b26447c1c266475801',
                            name: 'Costume2',
                            bitmapResolution: 1,
                            md5: '3b6274510488d5b26447c1c266475801.svg',
                            dataFormat: 'svg',
                            rotationCenterX: 65,
                            rotationCenterY: 61
                        }
                    ]
                },
                x: 11,
                y: 12,
                direction: 33,
                visible: false,
                size: 44,
                currentCostume: 2,
                rotationStyle: 'left-right'
            };
        });

        test('return the Sprite.new code', () => {
            const expected = `Sprite.new(${Ruby.quote_(spriteName)},
           x: ${renderedTarget.x},
           y: ${renderedTarget.y},
           direction: ${renderedTarget.direction},
           visible: ${!!renderedTarget.visible},
           size: ${renderedTarget.size},
           current_costume: ${renderedTarget.currentCostume - 1},
           costumes: [
             {
               asset_id: "01ae57fd339529445cb890978ef8a054",
               name: "Costume1",
               bitmap_resolution: 1,
               md5: "01ae57fd339529445cb890978ef8a054.svg",
               data_format: "svg",
               rotation_center_x: 47,
               rotation_center_y: 55
             },
             {
               asset_id: "3b6274510488d5b26447c1c266475801",
               name: "Costume2",
               bitmap_resolution: 1,
               md5: "3b6274510488d5b26447c1c266475801.svg",
               data_format: "svg",
               rotation_center_x: 65,
               rotation_center_y: 61
             }
           ],
           rotation_style: :left_right)`;
            expect(Ruby.defineSprite(renderedTarget)).toEqual(expected);
        });

        test('add definitions_ the Sprite.new code', () => {
            const code = Ruby.defineSprite(renderedTarget);
            expect(Ruby.definitions_[`sprite_${spriteName}`]).toEqual(code);
        });

        test('suppress default attributes', () => {
            Object.assign(renderedTarget, {
                x: 0,
                y: 0,
                direction: 90,
                visible: true,
                size: 100,
                currentCostume: 1,
                rotationStyle: 'all around'
            });
            renderedTarget.sprite.costumes = [];
            const expected = `Sprite.new(${Ruby.quote_(spriteName)})`;
            expect(Ruby.defineSprite(renderedTarget)).toEqual(expected);
        });
    });

    describe('defineVariables', () => {
        let renderedTarget;

        beforeEach(() => {
            const SCALAR_TYPE = '';
            const LIST_TYPE = 'list';

            renderedTarget = {
                sprite: {
                    name: 'Sprite1'
                },
                variables: {
                    id1: {
                        name: 'Variable1',
                        type: SCALAR_TYPE
                    },
                    id2: {
                        name: 'List1',
                        type: LIST_TYPE
                    },
                    id3: {
                        name: 'Variable2',
                        type: SCALAR_TYPE
                    },
                    id4: {
                        name: 'List2',
                        type: LIST_TYPE
                    }
                }
            };
        });

        test('add definitions_ the make_variable and make_list codes', () => {
            Ruby.defineVariables(renderedTarget);
            const spriteName = Ruby.spriteName(renderedTarget);
            const expecteds = {
                variable_Variable1: `${spriteName}.make_variable(${Ruby.quote_('Variable1')})`,
                variable_Variable2: `${spriteName}.make_variable(${Ruby.quote_('Variable2')})`,
                list_List1: `${spriteName}.make_list(${Ruby.quote_('List1')})`,
                list_List2: `${spriteName}.make_list(${Ruby.quote_('List2')})`
            };
            for (const name in expecteds) {
                expect(Ruby.definitions_[name]).toEqual(expecteds[name]);
            }
        });
    });
});
