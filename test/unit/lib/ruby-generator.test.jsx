import RubyGenerator from '../../../src/lib/ruby-generator';

describe('RubyGenerator', () => {
    const SCALAR_TYPE = '';
    const LIST_TYPE = 'list';

    beforeEach(() => {
        RubyGenerator.cache_ = {};
        RubyGenerator.definitions_ = {};
        RubyGenerator.functionNames_ = {};

        RubyGenerator.currentTarget = null;
    });

    describe('quote_', () => {
        test('escape only " to \\"', () => {
            const arg = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'; // eslint-disable-line
            const expected = '"!\\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"'; // eslint-disable-line
            expect(RubyGenerator.quote_(arg)).toEqual(expected);
        });
    });

    describe('spriteName', () => {
        test('return self', () => {
            RubyGenerator.currentTarget = {
                sprite: {
                    name: 'Sprite1'
                },
                comments: {}
            };
            expect(RubyGenerator.spriteName()).toEqual('self');
        });
    });

    describe('variableName, listName', () => {
        let renderedTarget;

        beforeEach(() => {
            renderedTarget = {
                sprite: {
                    name: 'Sprite1'
                },
                comments: {},
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
                    },
                    id2_1: {
                        name: 'Avg(Total / Count)',
                        type: SCALAR_TYPE
                    },
                    id2_2: {
                        name: 'List of Symbols.',
                        type: LIST_TYPE
                    },
                    id2_3: {
                        name: ' !"#$%&\'()*+,-./:;<=>?@[\\]^`{|}~]',
                        type: SCALAR_TYPE
                    },
                    id2_4: {
                        name: '平均(合計 / 件数)',
                        type: SCALAR_TYPE
                    },
                    id2_5: {
                        name: 'シンボル　配列。',
                        type: LIST_TYPE
                    }
                },
                runtime: {
                    getTargetForStage: function () {
                        return {
                            variables: {
                                id5: {
                                    name: 'Variable3',
                                    type: SCALAR_TYPE
                                },
                                id6: {
                                    name: 'List3',
                                    type: LIST_TYPE
                                }
                            }
                        };
                    }
                }
            };
            RubyGenerator.currentTarget = renderedTarget;
        });

        test('return @name if local variable', () => {
            expect(RubyGenerator.variableName('id1')).toEqual('@Variable1');
            expect(RubyGenerator.listName('id2')).toEqual('@List1');
            expect(RubyGenerator.variableName('id3')).toEqual('@Variable2');
            expect(RubyGenerator.listName('id4')).toEqual('@List2');
        });

        test('return $name if global variable', () => {
            expect(RubyGenerator.variableName('id5')).toEqual('$Variable3');
            expect(RubyGenerator.listName('id6')).toEqual('$List3');
        });

        test('return null if missmatch type', () => {
            expect(RubyGenerator.listName('id1')).toEqual(null);
            expect(RubyGenerator.variableName('id2')).toEqual(null);
        });

        test('return null if not found', () => {
            expect(RubyGenerator.variableName('unknown_id1')).toEqual(null);
            expect(RubyGenerator.listName('unknown_id2')).toEqual(null);
        });

        test('return $name if stage\'s local variable', () => {
            renderedTarget.isStage = true;
            expect(RubyGenerator.variableName('id1')).toEqual('$Variable1');
            expect(RubyGenerator.listName('id2')).toEqual('$List1');
            expect(RubyGenerator.variableName('id3')).toEqual('$Variable2');
            expect(RubyGenerator.listName('id4')).toEqual('$List2');
        });

        test('return null if stage and not exist local variable', () => {
            renderedTarget.isStage = true;
            expect(RubyGenerator.variableName('id5')).toEqual(null);
            expect(RubyGenerator.listName('id6')).toEqual(null);
        });

        test('escape except alphabet, number and _ to _', () => {
            expect(RubyGenerator.variableName('id2_1')).toEqual('@Avg_Total___Count_');
            expect(RubyGenerator.listName('id2_2')).toEqual('@List_of_Symbols_');
            expect(RubyGenerator.variableName('id2_3')).toEqual('@_________________________________');

            renderedTarget.isStage = true;
            expect(RubyGenerator.variableName('id2_1')).toEqual('$Avg_Total___Count_');
            expect(RubyGenerator.listName('id2_2')).toEqual('$List_of_Symbols_');
            expect(RubyGenerator.variableName('id2_3')).toEqual('$_________________________________');
        });

        test('do not escape multibyte character like Japanese', () => {
            expect(RubyGenerator.variableName('id2_4')).toEqual('@平均_合計___件数_');
            expect(RubyGenerator.listName('id2_5')).toEqual('@シンボル　配列。');

            renderedTarget.isStage = true;
            expect(RubyGenerator.variableName('id2_4')).toEqual('$平均_合計___件数_');
            expect(RubyGenerator.listName('id2_5')).toEqual('$シンボル　配列。');
        });
    });

    describe('spriteNew', () => {
        const spriteName = 'Sprite1';
        let renderedTarget;

        beforeEach(() => {
            renderedTarget = {
                sprite: {
                    name: spriteName,
                    costumes: [
                        {
                            assetId: '01ae57fd339529445cb890978ef8a054',
                            name: 'Costume1',
                            bitmapResolution: 2,
                            md5: '01ae57fd339529445cb890978ef8a054.svg',
                            dataFormat: 'svg',
                            rotationCenterX: 47,
                            rotationCenterY: 55
                        },
                        {
                            assetId: '3b6274510488d5b26447c1c266475801',
                            name: 'Costume2',
                            dataFormat: 'png',
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
                rotationStyle: 'left-right',
                variables: {
                    id1: {
                        name: 'Variable1',
                        type: SCALAR_TYPE,
                        value: 10
                    },
                    id2: {
                        name: 'List1',
                        type: LIST_TYPE,
                        value: [1, 2, 3]
                    },
                    id3: {
                        name: 'Variable2',
                        type: SCALAR_TYPE,
                        value: 0
                    },
                    id4: {
                        name: 'List2',
                        type: LIST_TYPE,
                        value: []
                    },
                    id5: {
                        name: 'Variable3',
                        type: SCALAR_TYPE,
                        value: 'abc'
                    },
                    id6: {
                        name: 'List3',
                        type: LIST_TYPE,
                        value: ['a', 'b', 'c']
                    }
                }
            };
        });

        test('return the Sprite.new code', () => {
            const expected = `Sprite.new(${RubyGenerator.quote_(spriteName)},
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
               bitmap_resolution: 2,
               data_format: "svg",
               rotation_center_x: 47,
               rotation_center_y: 55
             },
             {
               asset_id: "3b6274510488d5b26447c1c266475801",
               name: "Costume2",
               bitmap_resolution: 1,
               data_format: "png",
               rotation_center_x: 65,
               rotation_center_y: 61
             }
           ],
           rotation_style: "left-right",
           variables: [
             {
               name: "Variable1",
               value: 10
             },
             {
               name: "Variable2"
             },
             {
               name: "Variable3",
               value: "abc"
             }
           ],
           lists: [
             {
               name: "List1",
               value: [1, 2, 3]
             },
             {
               name: "List2"
             },
             {
               name: "List3",
               value: ["a", "b", "c"]
             }
           ])`;
            expect(RubyGenerator.spriteNew(renderedTarget)).toEqual(expected);
        });

        test('suppress default attributes', () => {
            Object.assign(renderedTarget, {
                x: 0,
                y: 0,
                direction: 90,
                visible: true,
                size: 100,
                currentCostume: 1,
                rotationStyle: 'all around',
                variables: {}
            });
            renderedTarget.sprite.costumes = [];
            const expected = `Sprite.new(${RubyGenerator.quote_(spriteName)})`;
            expect(RubyGenerator.spriteNew(renderedTarget)).toEqual(expected);
        });

        test('the Stage.new instead of the Sprite.new if stage', () => {
            Object.assign(renderedTarget, {
                isStage: true
            });
            const expected = `Stage.new(${RubyGenerator.quote_(spriteName)},
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
              bitmap_resolution: 2,
              data_format: "svg",
              rotation_center_x: 47,
              rotation_center_y: 55
            },
            {
              asset_id: "3b6274510488d5b26447c1c266475801",
              name: "Costume2",
              bitmap_resolution: 1,
              data_format: "png",
              rotation_center_x: 65,
              rotation_center_y: 61
            }
          ],
          rotation_style: "left-right",
          variables: [
            {
              name: "Variable1",
              value: 10
            },
            {
              name: "Variable2"
            },
            {
              name: "Variable3",
              value: "abc"
            }
          ],
          lists: [
            {
              name: "List1",
              value: [1, 2, 3]
            },
            {
              name: "List2"
            },
            {
              name: "List3",
              value: ["a", "b", "c"]
            }
          ])`;
            expect(RubyGenerator.spriteNew(renderedTarget)).toEqual(expected);
        });
    });
});
