import {parseString} from 'xml2js';

const convertXMLBlocksToJSON = function (xml, callback) {
    parseString(xml, (err, result) => {
        return callback(err, result);
    });
};

export {convertXMLBlocksToJSON};
