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

const getInputNameFromInputId = (parent, inputId) => {

    var inputName;
    var tempInputs = parent.tempInputs;
    Object.values(tempInputs).forEach(tempInput => {
        if (tempInput.block === inputId){
            inputName = tempInput.name;
        }
    });

    return inputName;
}

const createArtieBlockFromTempBlock = (tempBlock) => ({elementName: tempBlock.elementName, elementFamily: tempBlock.elementFamily, next: tempBlock.next, inputs: tempBlock.inputs});

const generateArtieNextBlock = (parent, nextId, blocks) => {

    // 1- Searches for the next element in the block array
    var nextElement = blocks.find(block => block.id === nextId);

    // 2- If the next element has another next element
    if (nextElement.tempNext !== null && nextElement !== undefined){
        nextElement = generateArtieNextBlock(nextElement, nextElement.tempNext, blocks);
    }

    // 3- Transforms the next element in an artie next block
    const artieNextElement = createArtieBlockFromTempBlock(nextElement);

    // 4- Inserts the next element in the parent
    parent.next = artieNextElement;

    return parent;
}

const generateArtieBlock = (blocks) => {

    var tempBlocks = [];
    var tempInputs = [];

    var artieBlocks = [];

    // 1- Gets the temporal block elements and the temporal field elements
    Object.values(blocks).forEach((block) => {

        // Looking if it's an input or an object
        if (block.x !== undefined && block.y !== undefined){

            // In the case that the block is an object
            const elementFamily = (block.opcode.split('_'))[0];
            const tempElement = {id: block.id, elementName: block.opcode, elementFamily: elementFamily, tempParent: block.parent, tempNext: block.next, next: null, tempInputs: block.inputs, inputs: []};
            tempBlocks.push(tempElement);
        } else {

            var tempFields = [];

            // In the case that the block is an input
            Object.values(block.fields).forEach((field) => {
                const tempField = {name: field.name, value: field.value};
                tempFields.push(tempField);
            });

            const tempInput = {id: block.id, parent: block.parent, fields: tempFields};
            tempInputs.push(tempInput);
        }
    });

    // 2- For each temporal input element we set the parent
    Object.values(tempInputs).forEach((tempInput) => {

        // 2.1- If the input has a parent
        if (tempInput.parent !== null && tempInput.parent !== undefined){

            // 2.1.1- Gets the parent
            var parents = tempBlocks.filter(tempBlock => tempBlock.id === tempInput.parent);

            // 2.1.2- Gets the input name from the parent field
            var inputName = getInputNameFromInputId(parents[0], tempInput.id);

            // 2.1.3- Creates the new input object
            const input = {name: inputName, fields: tempInput.fields}

            // 2.1.4- Adds the input to the block object
            parents[0].inputs.push(input);
        }
    });

    // 3- Gets all the roots of the block tree (parent == null)
    const roots = tempBlocks.filter(tempBlock => tempBlock.tempParent === null);

    // 3.1- Looking for the children
    Object.values(roots).forEach((root) => {

        if (root.tempNext !== null){
            root = generateArtieNextBlock(root, root.tempNext, tempBlocks);
        }

        artieBlocks.push(createArtieBlockFromTempBlock(root));
    });

    return artieBlocks;
}

const sendBlockArtie = (blocks, projectTitle) => new Promise((resolve, reject) => {

    const artieBlocks = generateArtieBlock(blocks);
    const artiePedagogicalSoftwareData = {id: null, exercise: projectTitle, elements: artieBlocks};

    xhr({
        method: 'POST',
        uri: 'http://localhost:8080/api/v1/pedagogicalsoftware/sendPedagogicalSoftwareData',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(artiePedagogicalSoftwareData)
    }, (response) => {
        if (response != null && response.statusCode !== 200) {
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
        if (response != null && response.statusCode !== 200) {
            return reject();
        }
        else if(response != null){
            return resolve(response.body);
        }
    });
});

export {sendBlockArtie, sendSolutionArtie};
