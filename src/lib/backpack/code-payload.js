import codeThumbnail from './code-thumbnail';

const codePayload = code => {
    const payload = {
        type: 'script', // Needs to match backpack-server type name
        name: 'code', // All code currently gets the same name
        mime: 'application/json',
        body: btoa(JSON.stringify(code)), // Base64 encode the json
        thumbnail: codeThumbnail // TODO make code thumbnail dynamic
    };

    // Return a promise to make it consistent with other payload constructors like costume-payload
    return new Promise(resolve => resolve(payload));
};

export default codePayload;
