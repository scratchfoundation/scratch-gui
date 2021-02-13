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

const _inputElementsValues = ['text', 'math_number', 'math_positive_number'];
const _createArtieBlockFromTempBlock = (tempBlock) => ({id: tempBlock.id, elementName: tempBlock.elementName, elementFamily: tempBlock.elementFamily, next: tempBlock.next, inputs: tempBlock.inputs, nested: tempBlock.nested, previous: tempBlock.previous, parent: tempBlock.parent});

const _generateArtieBlock = (blocks) => {

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
    var element = {id: block.id, elementName: block.opcode, elementFamily: elementFamily, next: null, inputs: [], nested: [], previous: null, parent: null};

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

    //2- Adds the previous element (the parent in this case), without its inputs, next, nested, previous and parent to avoid large objects
    nextElement.previous = {id: parent.id, elementName: parent.elementName, elementFamily: parent.elementFamily, next: null, inputs: null, nested: [], previous: null, parent: null}

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
    if ((tmpElement.x !== undefined && tmpElement.y !== undefined) || !_inputElementsValues.includes(tmpElement.opcode)){

        //2.1.1- Adds the parent element, without its next, nested, previous and parent to avoid large objects
        inputElement.parent = {id: parent.id, elementName: parent.elementName, elementFamily: parent.elementFamily, next: null, inputs: null, nested: [], previous: null, parent: null}

        //2.1.2- Pushes the input element into the artie parent nested array
        artieParent.nested.push(inputElement);
    }
    // 2.2- If the input element is an input
    else{
        var tempInput = {opcode: inputElement.elementName, name: inputName, fields:[]};
        Object.values(tmpElement.fields).forEach((field) =>{
            tempInput.fields.push({opcode: field.elementName, name: field.name, value: field.value});
        });

        artieParent.inputs.push(tempInput);
    }

    return artieParent;
}

const sendBlockArtie = (student, sprites, exercise, requestHelp, finishedExercise, screenShot, callbackLoading, callbackHelp, callbackPopup) => new Promise((resolve, reject) => {

    var spriteElements = [];

    Object.values(sprites).forEach((sprite) => {
        const artieBlocks = _generateArtieBlock(sprite.blocks);
        const spriteElement = {id: sprite.id, name: sprite.name, blocks: artieBlocks};
        spriteElements.push(spriteElement);
    });

    const artiePedagogicalSoftwareData = {id: null, student: student, exercise: exercise, requestHelp: requestHelp, finishedExercise: finishedExercise,
                                          screenShot: screenShot, elements: spriteElements};

    var xhr = new XMLHttpRequest();
    var params = JSON.stringify(artiePedagogicalSoftwareData);
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 201 && xhr.response != null) {

                //If the callback loading is not null, we indicate that the loading has finished
                if(callbackLoading !==null){
                    callbackLoading(false, true);
                }

                //If the callback of the popup is not undefined and is not null, we show the popup
                if(callbackPopup !== undefined && callbackPopup !== null){
                    callbackPopup(true);
                }

                var json = JSON.parse(xhr.response);

                //We check if there are no errors
                if(json.body.object !== null && callbackHelp !== null){
                    callbackHelp(json.body.object);
                }
            }
        }
    });

    xhr.open("POST", 'http://localhost:8082/api/v1/pedagogicalsoftware/sendPedagogicalSoftwareData', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
});

const sendSolutionArtie = (userId, sprites, exercise, screenShot, callback, callbackPopup) => new Promise((resolve, reject) => {

    var spriteElements = []

    Object.values(sprites).forEach((sprite) => {
        const artieBlocks = _generateArtieBlock(sprite.blocks);
        const spriteElement = {id: sprite.id, name: sprite.name, blocks: artieBlocks};
        spriteElements.push(spriteElement);
    });

    const artiePedagogicalSoftwareSolution = {id: null, userId: userId, exercise: exercise, elements: spriteElements, screenShot: screenShot};
    var xhr = new XMLHttpRequest();
    var params = JSON.stringify(artiePedagogicalSoftwareSolution);
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 201 && xhr.response != null) {

                //If the callback of the popup is not undefined and is not null, we show the popup
                if(callbackPopup !== undefined && callbackPopup !== null){
                    callbackPopup(true);
                }

                callback(false, true);
            }
        }
    });

    xhr.open("POST", 'http://localhost:8082/api/v1/pedagogicalsoftware/sendPedagogicalSoftwareSolution', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
});

const loginArtie = (userName, password, callback, errorCallback) => new Promise(() => {

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                var json = JSON.parse(xhr.response);

                //We check if there are no errors
                if(json.body.object !== null){
                    callback(json.body.object);
                }else{
                    errorCallback(json.body.message);
                }
            }
        }
    });

    xhr.open("GET", `http://localhost:8080/api/v1/users/loginWithRole?userName=${userName}&password=${password}`, true);
    xhr.send();

});

const getArtieStudents = (userName, password, callback) => new Promise(() => {

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                var json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `http://localhost:8080/api/v1/students/getAllActiveString?userName=${userName}&password=${password}`, true);
    xhr.send();

});


const getArtieExercises = (userName, password, isEvaluation, callback) => new Promise(() => {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                var json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `http://localhost:8080/api/v1/exercises/getAllIsEvaluation?userName=${userName}&password=${password}&isEvaluation=${isEvaluation}`, true);
    xhr.send();

});


const getAllArtieExercises = (userName, password, callback) => new Promise(() => {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                var json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `http://localhost:8080/api/v1/exercises/getAll?userName=${userName}&password=${password}`, true);
    xhr.send();

});

const updateStudentCompetence = (studentId, competence, callback) => new Promise(() => {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                var json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `http://localhost:8080/api/v1/students/updateStudentCompetence?studentId=${studentId}&competence=${competence}`, true);
    xhr.send();

});

export {sendBlockArtie, sendSolutionArtie, loginArtie, getArtieStudents,
        getArtieExercises, getAllArtieExercises, updateStudentCompetence};
