/* eslint-disable max-len */
/* eslint-disable no-undefined */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable semi */
/* eslint-disable brace-style */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import xhr from 'xhr';

const _createArtieBlockFromTempBlock = (tempBlock) => ({elementName: tempBlock.elementName, elementFamily: tempBlock.elementFamily, next: tempBlock.next, inputs: tempBlock.inputs, nested: tempBlock.nested});

const generateArtieBlock = (blocks) => {

    var artieBlocks = [];

    // 1- Gets the top level elements
    var arrayBlocks =[];
    Object.values(blocks).forEach((block) => {arrayBlocks.push(block)});

    var roots = arrayBlocks.filter(block => block.topLevel === true);

    // 2- Gets the nested elements, the next elements and the inputs
    Object.values(roots).forEach((root) => {
        const element = _blockHandler(root, arrayBlocks);
        artieBlocks.push(element);
    });

    return artieBlocks;
}

const _blockHandler = (block, blocks) => {

    // 2.1- creates the temporal element for the root
    var transformed = false;
    const elementFamily = (block.opcode.split('_'))[0];
    var element = {id: block.id, elementName: block.opcode, elementFamily: elementFamily, next: null, inputs: [], nested: []};

    // 2.2- Checks if this block has a next element
    if(block.next !== null && block.next !== undefined){
        element = _nextElementHandler(element, block.next, blocks);
        transformed = true;
    }

    // 2.3- Checks if this block has inputs or nested elements
    Object.values(block.inputs).forEach((input) => {
        element = _nestedInputsHandler(element, input.block, input.name, blocks);
        transformed = true;
    });

    if(transformed===false){
        element = _createArtieBlockFromTempBlock(element);
    }

    return element;
}

const _nextElementHandler = (parent, nextId, blocks) => {

    // Creates the return variable
    var artieParent = _createArtieBlockFromTempBlock(parent);

    // 1- Searches for the next element in the block array
    var nextElement = blocks.find(block => block.id === nextId);
    nextElement = _blockHandler(nextElement, blocks)

    // 3- Inserts the next element in the parent
    artieParent.next = nextElement;

    return artieParent;
}

const _nestedInputsHandler = (parent, inputId, inputName, blocks) => {

    // Creates the return variable
    var artieParent = _createArtieBlockFromTempBlock(parent);

    // 1- Searches for the input element in the block array
    const tmpElement = blocks.find(block => block.id === inputId);
    var inputElement = _blockHandler(tmpElement, blocks);

    // 2.1- If the input element is a nested element
    if (tmpElement.x !== undefined && tmpElement.y !== undefined){
        artieParent.nested.push(inputElement);
    }
    // 2.2- If the input element is an input
    else{
        var tempInput = {name: inputName, fields:[]};
        Object.values(tmpElement.fields).forEach((field) =>{
            tempInput.fields.push({name: field.name, value: field.value});
        });

        artieParent.inputs.push(tempInput);
    }

    return artieParent;
}

const sendBlockArtie = (blocks, projectTitle, requestHelp) => new Promise((resolve, reject) => {

    const artieBlocks = generateArtieBlock(blocks);
    const artiePedagogicalSoftwareData = {id: null, exercise: projectTitle, requestHelp: requestHelp, elements: artieBlocks};

    xhr({
        method: 'POST',
        uri: 'http://localhost:8080/api/v1/pedagogicalsoftware/sendPedagogicalSoftwareData',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(artiePedagogicalSoftwareData)
    }, (error, response) => {
        if (response != null && response.statusCode !== 201) {
            return reject();
        }
        else if(response != null){
            return resolve(response.body);
        }
    });
});

const sendSolutionArtie = (blocks, projectTitle) => new Promise((resolve, reject) => {

    const artieBlocks = generateArtieBlock(blocks);
    const artiePedagogicalSoftwareSolution = {id: null, exercise: projectTitle, elements: artieBlocks};

    xhr({
        method: 'POST',
        uri: 'http://localhost:8080/api/v1/pedagogicalsoftware/sendPedagogicalSoftwareSolution',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(artiePedagogicalSoftwareSolution)
    }, (response) => {
        if (response != null && response.statusCode !== 201) {
            return reject();
        }
        else if(response != null){
            return resolve(response.body);
        }
    });
});

export {sendBlockArtie, sendSolutionArtie};
