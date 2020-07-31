import xhr from 'xhr';

const sendBlockArtie = () => new Promise((resolve, reject) => {
    var test = {'id' : '', 'elements' : [{'elementType' : 'type Test', 'fields' : [{'name' : 'field name 1', 'value' : '100'}, {'name' : 'field name 2', 'value' : '200'}]}]};
    xhr({
        method: 'POST',
        uri: 'http://localhost:8080/api/v1/pedagogicalsoftware/sendPedagogicalSoftwareData',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(test),
    }, (error, response) => {
        if (error || response.statusCode !== 200) {
            return reject();
        }
        return resolve(response.body);
    });
});

export {sendBlockArtie};
