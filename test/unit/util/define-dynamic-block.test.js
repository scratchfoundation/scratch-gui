import defineDynamicBlock from '../../../src/lib/define-dynamic-block';

import ArgumentType from 'scratch-vm/src/extension-support/argument-type';
import BlockType from 'scratch-vm/src/extension-support/block-type';

const MockScratchBlocks = {
    OUTPUT_SHAPE_HEXAGONAL: 1,
    OUTPUT_SHAPE_ROUND: 2,
    OUTPUT_SHAPE_SQUARE: 3
};

const categoryInfo = {
    name: 'test category',
    color1: '#111',
    color2: '#222',
    color3: '#333'
};

const penIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==';

const testBlockInfo = {
    commandWithIcon: {
        blockType: BlockType.COMMAND,
        blockIconURI: penIconURI,
        text: 'command with icon'
    },
    commandWithoutIcon: {
        blockType: BlockType.COMMAND,
        text: 'command without icon'
    },
    terminalCommand: {
        blockType: BlockType.COMMAND,
        isTerminal: true,
        text: 'terminal command'
    },
    reporter: {
        blockType: BlockType.REPORTER,
        text: 'reporter'
    },
    boolean: {
        blockType: BlockType.BOOLEAN,
        text: 'Boolean'
    },
    hat: {
        blockType: BlockType.HAT,
        text: 'hat'
    }
};

// similar to goog.mixin from the Closure library
const mixin = function (target, source) {
    for (const x in source) {
        target[x] = source[x];
    }
};

class MockBlock {
    // mocks the Blockly.Block constructor
    static create (blockInfo, extendedOpcode) {
        // mock the Blockly.Block constructor
        const block = new MockBlock();
        const prototype = defineDynamicBlock(MockScratchBlocks, categoryInfo, blockInfo, extendedOpcode);
        mixin(block, prototype);
        block.init();

        // bootstrap the mutation<->DOM cycle
        block.blockInfoText = JSON.stringify(blockInfo);
        const xmlElement = block.mutationToDom();

        // parse blockInfo from XML to fill dynamic properties
        block.domToMutation(xmlElement);

        return block;
    }

    jsonInit (json) {
        this.result = Object.assign({}, json);
    }
    interpolate_ () {
        // TODO: add tests for this?
    }
    setCheckboxInFlyout (isEnabled) {
        this.result.checkboxInFlyout_ = isEnabled;
    }
    setOutput (isEnabled) {
        this.result.outputConnection = isEnabled; // Blockly calls `makeConnection_` here
    }
    setOutputShape (outputShape) {
        this.result.outputShape_ = outputShape;
    }
    setNextStatement (isEnabled) {
        this.result.nextConnection = isEnabled; // Blockly calls `makeConnection_` here
    }
    setPreviousStatement (isEnabled) {
        this.result.previousConnection = isEnabled; // Blockly calls `makeConnection_` here
    }
}

describe('defineDynamicBlock', () => {
    test('is a function', () => {
        expect(typeof defineDynamicBlock).toBe('function');
    });
    test('can define a command block with an icon', () => {
        const extendedOpcode = 'test.commandWithIcon';
        const block = MockBlock.create(testBlockInfo.commandWithIcon, extendedOpcode);
        expect(block.result).toEqual({
            category: categoryInfo.name,
            colour: categoryInfo.color1,
            colourSecondary: categoryInfo.color2,
            colourTertiary: categoryInfo.color3,
            extensions: ['scratch_extension'],
            inputsInline: true,
            nextConnection: true,
            outputShape_: MockScratchBlocks.OUTPUT_SHAPE_SQUARE,
            previousConnection: true,
            type: extendedOpcode
        });
    });
    test('can define a command block without an icon', () => {
        const extendedOpcode = 'test.commandWithoutIcon';
        const block = MockBlock.create(testBlockInfo.commandWithoutIcon, extendedOpcode);
        expect(block.result).toEqual({
            category: categoryInfo.name,
            colour: categoryInfo.color1,
            colourSecondary: categoryInfo.color2,
            colourTertiary: categoryInfo.color3,
            // extensions: undefined, // no icon means no extension
            inputsInline: true,
            nextConnection: true,
            outputShape_: MockScratchBlocks.OUTPUT_SHAPE_SQUARE,
            previousConnection: true,
            type: extendedOpcode
        });
    });
    test('can define a terminal command', () => {
        const extendedOpcode = 'test.terminal';
        const block = MockBlock.create(testBlockInfo.terminalCommand, extendedOpcode);
        expect(block.result).toEqual({
            category: categoryInfo.name,
            colour: categoryInfo.color1,
            colourSecondary: categoryInfo.color2,
            colourTertiary: categoryInfo.color3,
            // extensions: undefined, // no icon means no extension
            inputsInline: true,
            nextConnection: false, // terminal
            outputShape_: MockScratchBlocks.OUTPUT_SHAPE_SQUARE,
            previousConnection: true,
            type: extendedOpcode
        });
    });
    test('can define a reporter', () => {
        const extendedOpcode = 'test.reporter';
        const block = MockBlock.create(testBlockInfo.reporter, extendedOpcode);
        expect(block.result).toEqual({
            category: categoryInfo.name,
            checkboxInFlyout_: true,
            colour: categoryInfo.color1,
            colourSecondary: categoryInfo.color2,
            colourTertiary: categoryInfo.color3,
            // extensions: undefined, // no icon means no extension
            inputsInline: true,
            // nextConnection: undefined, // reporter
            outputConnection: true, // reporter
            outputShape_: MockScratchBlocks.OUTPUT_SHAPE_ROUND, // reporter
            // previousConnection: undefined, // reporter
            type: extendedOpcode
        });
    });
    test('can define a Boolean', () => {
        const extendedOpcode = 'test.boolean';
        const block = MockBlock.create(testBlockInfo.boolean, extendedOpcode);
        expect(block.result).toEqual({
            category: categoryInfo.name,
            // checkboxInFlyout_: undefined,
            colour: categoryInfo.color1,
            colourSecondary: categoryInfo.color2,
            colourTertiary: categoryInfo.color3,
            // extensions: undefined, // no icon means no extension
            inputsInline: true,
            // nextConnection: undefined, // reporter
            outputConnection: true, // reporter
            outputShape_: MockScratchBlocks.OUTPUT_SHAPE_HEXAGONAL, // Boolean
            // previousConnection: undefined, // reporter
            type: extendedOpcode
        });
    });
    test('can define a hat', () => {
        const extendedOpcode = 'test.hat';
        const block = MockBlock.create(testBlockInfo.hat, extendedOpcode);
        expect(block.result).toEqual({
            category: categoryInfo.name,
            colour: categoryInfo.color1,
            colourSecondary: categoryInfo.color2,
            colourTertiary: categoryInfo.color3,
            // extensions: undefined, // no icon means no extension
            inputsInline: true,
            nextConnection: true,
            outputShape_: MockScratchBlocks.OUTPUT_SHAPE_SQUARE,
            // previousConnection: undefined, // hat
            type: extendedOpcode
        });
    });
});
