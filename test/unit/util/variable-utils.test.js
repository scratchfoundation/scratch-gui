import {canSetVariableValue} from '../../../src/lib/variable-utils.js';

describe('variableUtils', () => {
    const vm = {
        runtime: {
            getTargetForStage: () => ({
                variables: {
                    nonList: {
                        type: '',
                        value: ''
                    },
                    list: {
                        type: 'list',
                        value: ['a', 'b', 'c']
                    }
                }
            })
        }
    };
    test('canSetVariableValue returns true for non-lists', () => {
        expect(canSetVariableValue(vm, '', 'nonList', '')).toBeTruthy();
    });

    test('canSetVariableValue returns true when the given value is less than 200000 items', () => {
        expect(canSetVariableValue(vm, '', 'list', ['a'])).toBeTruthy();
    });

    test('canSetVariableValue returns false when the given value is more than 200000 items', () => {
        expect(canSetVariableValue(vm, '', 'list', {length: 200001})).toBeFalsy();
    });
});
