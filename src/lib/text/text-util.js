import { parseString } from "xml2js";

/**
 * Converts an XML obect of blocks into JSON.
 *
 * @param {Object} xml The xml object to be converted
 */
export const convertXMLBlocksToJSON = xml => {
    return new Promise(resolve => {
        parseString(xml, (err, result) => {
            getBlocksFromJson(result).then(blocks => {
                resolve(blocks);
            });
        });
    });
};

/**
 * Gets all the blocks and their information from passed in JSON.
 *
 * @param {Object} json The JSON view of all the blocks.
 */
const getBlocksFromJson = json => {
    return new Promise(resolve => {
        const blocks = [];
        if (json.xml.block) {
            json.xml.block.forEach(block => {
                blocks.push(getBlockInformation(block));
            });
        }
        resolve(blocks);
    });
};

/**
 * Gets all the information of the passed in block
 *
 * @param {Object} block The block to get information on.
 */
const getBlockInformation = block => {
    const blockReturn = {
        id: block.$.id,
        type: block.$.type
    };

    if (block.value) {
        blockReturn["values"] = getBlockValues(block);
    }

    if (block.next) {
        blockReturn["next"] = getNextBlocks(block);
    }

    return blockReturn;
};

/**
 * Gets all the values for the passed in block.
 *
 * @param {Object} block The block to get all values for
 */
const getBlockValues = block => {
    const values = [];

    block.value.forEach(blockValue => {
        const value = {
            name: blockValue.$.name
        };

        if (blockValue.shadow) {
            blockValue.shadow.forEach(blockShadow => {
                value["id"] = blockShadow.$.id;
                value["type"] = blockShadow.$.type;
                if (blockShadow.field) {
                    blockShadow.field.forEach(blockShadowField => {
                        value["value"] = blockShadowField._;
                    });
                }
                values.push(value);
            });
        }
    });

    return values;
};

/**
 * Gets all next blocks for the passed in block
 *
 * @param {Object} block The block to get the next blocks for
 */
const getNextBlocks = block => {
    const nextBlocks = [];

    block.next.forEach(next => {
        if (next.block) {
            next.block.forEach(nextBlock => {
                nextBlocks.push(getBlockInformation(nextBlock));
            });
        }
    });

    return nextBlocks;
};
