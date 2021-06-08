/* eslint-disable max-len */
/* eslint-disable no-undefined */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable semi */
/* eslint-disable brace-style */
/* eslint-disable no-let */
/* eslint-disable no-unused-lets */
/* eslint-disable arrow-parens */
import xhr from 'xhr';

const _inputElementsValues = ['text', 'math_number', 'math_positive_number', 'math_whole_number'];
const _pedagogicalInterventionWebServiceUrl = 'http://prod.artie.rocks:8000';
const _pedagogialWebUrl = 'http://prod.artie.rocks:8000';
const _apiKey = '0dkNqC39mclJrshzwe5ui11q6lQZpl04';


const _createArtieBlockFromTempBlock = (tempBlock) => ({id: tempBlock.id, elementName: tempBlock.elementName, elementFamily: tempBlock.elementFamily, next: tempBlock.next, inputs: tempBlock.inputs, nested: tempBlock.nested, previous: tempBlock.previous, parent: tempBlock.parent});

const _generateArtieBlock = (blocks) => {

    let artieBlocks = [];

    // 1- Gets the top level elements
    let arrayBlocks =[];
    Object.values(blocks).forEach((block) => {arrayBlocks.push(block)});

    //Getting all the roots that are not included in the input elements values (because these elements are not elements but just inputs)
    let roots = arrayBlocks.filter(block => block.topLevel === true && !_inputElementsValues.includes(block.opcode));

    // 2- Gets the nested elements, the next elements and the inputs
    Object.values(roots).forEach((root) => {
        const element = _blockHandler(root, arrayBlocks);
        artieBlocks.push(element);
    });

    return artieBlocks;
}

const _blockHandler = (block, blocks) => {

    // 2.1- creates the temporal element for the root
    let transformed = false;
    const elementFamily = (block !== undefined && block.opcode !== undefined ? (block.opcode.split('_'))[0] : null);
    let element = {id: (block.id !== undefined ? block.id : null), elementName: (block.opcode!==undefined ? block.opcode : null), elementFamily: elementFamily, next: null, inputs: [], nested: [], previous: null, parent: null};

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

    // Creates the return letiable
    let artieParent = _createArtieBlockFromTempBlock(parent);

    // 1- Searches for the next element in the block array
    let nextElement = blocks.find(block => block.id === nextId);
    nextElement = _blockHandler(nextElement, blocks)

    //2- Adds the previous element (the parent in this case), without its inputs, next, nested, previous and parent to avoid large objects
    nextElement.previous = {id: parent.id, elementName: parent.elementName, elementFamily: parent.elementFamily, next: null, inputs: null, nested: [], previous: null, parent: null}

    // 3- Inserts the next element in the parent
    artieParent.next = nextElement;

    return artieParent;
}

const _nestedInputsHandler = (parent, inputId, inputName, blocks) => {

    // Creates the return letiable
    let artieParent = _createArtieBlockFromTempBlock(parent);

    // 1- Searches for the input element in the block array
    const tmpElement = blocks.find(block => block.id === inputId);
    let inputElement = _blockHandler(tmpElement, blocks);

    // 2.1- If the input element is a nested element
    if (inputName.includes("SUBSTACK") && !_inputElementsValues.includes(tmpElement.opcode)){

        //2.1.1- Adds the parent element, without its next, nested, previous and parent to avoid large objects
        inputElement.parent = {id: parent.id, elementName: parent.elementName, elementFamily: parent.elementFamily, next: null, inputs: null, nested: [], previous: null, parent: null}

        //2.1.2- Pushes the input element into the artie parent nested array
        artieParent.nested.push(inputElement);
    }
    // 2.2- If the input element is an input
    else{
        //Gets all the fields from the different subInputs of the element
        let tempFields = [];
        if(inputElement.inputs !== undefined && inputElement.inputs !== null && inputElement.inputs.length > 0){
            Object.values(inputElement.inputs).forEach((input) => {
                tempFields = tempFields.concat(input.fields);
            });
        }

        let tempInput = {opcode: inputElement.elementName, name: inputName, fields: tempFields};
        Object.values(tmpElement.fields).forEach((field) =>{
            tempInput.fields.push({opcode: field.elementName, name: field.name, value: field.value});
        });

        artieParent.inputs.push(tempInput);
    }

    return artieParent;
}

const sendBlockArtie = (student, sprites, exercise, requestHelp, secondsHelpOpen, finishedExercise, lastLogin, screenShot, binary,
                        callbackLoading, callbackHelp, callbackPopup) => new Promise((resolve, reject) => {

    let spriteElements = [];

    Object.values(sprites).forEach((sprite) => {
        const artieBlocks = _generateArtieBlock(sprite.blocks);
        const spriteElement = {id: sprite.id, name: sprite.name, blocks: artieBlocks};
        spriteElements.push(spriteElement);
    });

    const artiePedagogicalSoftwareData = {id: null, student: student, exercise: exercise, requestHelp: requestHelp, secondsHelpOpen: secondsHelpOpen,
                                          finishedExercise: finishedExercise, lastLogin: lastLogin, screenShot: screenShot, binary: binary,
                                          elements: spriteElements};

    let xhr = new XMLHttpRequest();
    let params = JSON.stringify(artiePedagogicalSoftwareData);
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

                if(xhr.response !== "") {
                    let json = JSON.parse(xhr.response);

                    //We check if there are no errors
                    if (json.body.object !== null && callbackHelp !== null) {
                        callbackHelp(json.body.object);
                    }
                }
            }
        }
    });

    xhr.open("POST", `${_pedagogicalInterventionWebServiceUrl}/api/v1/pedagogicalsoftware/sendPedagogicalSoftwareData`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('apiKey', _apiKey);
    xhr.send(params);
});

const sendSolutionArtie = (userId, sprites, exercise, screenShot, binary, callback, callbackPopup) => new Promise((resolve, reject) => {

    let spriteElements = []

    Object.values(sprites).forEach((sprite) => {
        const artieBlocks = _generateArtieBlock(sprite.blocks);
        const spriteElement = {id: sprite.id, name: sprite.name, blocks: artieBlocks};
        spriteElements.push(spriteElement);
    });

    const artiePedagogicalSoftwareSolution = {id: null, userId: userId, exercise: exercise, elements: spriteElements, screenShot: screenShot, binary: binary};
    let xhr = new XMLHttpRequest();
    let params = JSON.stringify(artiePedagogicalSoftwareSolution);
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

    xhr.open("POST", `${_pedagogicalInterventionWebServiceUrl}/api/v1/pedagogicalsoftware/sendPedagogicalSoftwareSolution`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('apiKey', _apiKey);
    xhr.send(params);
});

const loginArtie = (userName, password, callback, errorCallback) => new Promise(() => {

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                let json = JSON.parse(xhr.response);

                //We check if there are no errors
                if(json.body.object !== null){
                    callback(json.body.object);
                }else{
                    errorCallback(json.body.message);
                }
            }
        }
    });

    xhr.open("GET", `${_pedagogialWebUrl}/api/v1/users/loginWithRole?userName=${userName}&password=${password}`, true);
    xhr.setRequestHeader('apiKey', _apiKey);
    xhr.send();

});

const getArtieStudents = (userName, password, callback) => new Promise(() => {

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                let json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `${_pedagogialWebUrl}/api/v1/students/getAllActiveString?userName=${userName}&password=${password}`, true);
    xhr.setRequestHeader('apiKey', _apiKey);
    xhr.send();

});


const getArtieExercises = (userName, password, isEvaluation, callback) => new Promise(() => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                let json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `${_pedagogialWebUrl}/api/v1/exercises/getAllIsEvaluation?userName=${userName}&password=${password}&isEvaluation=${isEvaluation}`, true);
    xhr.setRequestHeader('apiKey', _apiKey);
    xhr.send();

});


const getAllArtieExercises = (userName, password, callback) => new Promise(() => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                let json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `${_pedagogialWebUrl}/api/v1/exercises/getAll?userName=${userName}&password=${password}`, true);
    xhr.setRequestHeader('apiKey', _apiKey);
    xhr.send();

});

const updateStudentCompetence = (studentId, competence, callback) => new Promise(() => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                let json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `${_pedagogialWebUrl}/api/v1/students/updateStudentCompetence?studentId=${studentId}&competence=${competence}`, true);
    xhr.setRequestHeader('apiKey', _apiKey);
    xhr.send();

});

const updateStudentData = (studentId, gender, motherTongue, age, callback) => new Promise(() => {

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 302 && xhr.response != null) {
                let json = JSON.parse(xhr.response);
                callback(json.body.object);
            }
        }
    });

    xhr.open("GET", `${_pedagogialWebUrl}/api/v1/students/updateStudentData?studentId=${studentId}&gender=${gender}&motherTongue=${motherTongue}&age=${age}`, true);
    xhr.setRequestHeader('apiKey', _apiKey);
    xhr.send();
});

export {sendBlockArtie, sendSolutionArtie, loginArtie, getArtieStudents,
        getArtieExercises, getAllArtieExercises, updateStudentCompetence,
        updateStudentData};
