// Utility functions for updating variables in the VM
// TODO (VM#1145) these should be moved to top-level VM API

const LIST_ITEM_LIMIT = 200000;

const getVariable = (vm, targetId, variableId) => {
    const target = targetId ?
        vm.runtime.getTargetById(targetId) :
        vm.runtime.getTargetForStage();
    return target.variables[variableId];
};

const getVariableValue = (vm, targetId, variableId) => {
    const variable = getVariable(vm, targetId, variableId);
    // If array, return a new copy for mutating, ensuring that updates stay immutable.
    if (variable.value instanceof Array) return variable.value.slice();
    return variable.value;
};

const setVariableValue = (vm, targetId, variableId, value) => {
    getVariable(vm, targetId, variableId).value = value;
};

const canSetVariableValue = (vm, targetId, variableId, value) => {
    const variable = getVariable(vm, targetId, variableId);
    return !(variable.type === 'list' && value.length > LIST_ITEM_LIMIT);
};

export {
    LIST_ITEM_LIMIT,
    getVariable,
    getVariableValue,
    setVariableValue,
    canSetVariableValue
};
