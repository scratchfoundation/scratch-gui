import xhr from 'xhr';
import costumePayload from './backpack/costume-payload';
import soundPayload from './backpack/sound-payload';
import spritePayload from './backpack/sprite-payload';
import codePayload from './backpack/code-payload';

const LOCALSTORAGE_KEY = '[eyangicques] backpack'

// Makes a psuedo-MD5 hash to satisfy the sb3 validator. To make it clear that
// it's not a hash, these IDs will all start with "aaaa".
const randomId = () => {
    let str = 'aaaa';
    for (let i = 0; i < 32 - 4; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }
    return str;
};

// Add a new property for the full thumbnail url, which includes the host.
// Also include a full body url for loading sprite zips
// TODO retreiving the images through storage would allow us to remove this.
const includeFullUrls = (item, host) => Object.assign({}, item, {
    // Apparently scratch-storage uses `body` to determine the file type
    // from its file extension, so here's a hacky solution
    body: `${item.id}.${item.mime.match(/\/(\w+)/)[1]}`,
    thumbnailUrl: `data:image/jpeg;base64,${item.thumbnail}`,
    bodyUrl: `data:${item.mime};base64,${item.body}`
});

const getBackpackContents = ({
    host,
    username,
    token,
    limit,
    offset
}) => new Promise((resolve, reject) => {
    const backpack = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') || [];
    resolve(backpack.slice(offset, offset + limit).map(item => includeFullUrls(item, host)));
});

const saveBackpackObject = ({
    host,
    username,
    token,
    type, // Type of object being saved to the backpack
    mime, // Mime-type of the object being saved
    name, // User-facing name of the object being saved
    body, // Base64-encoded body of the object being saved
    thumbnail, // Base64-encoded JPEG thumbnail of the object being saved
    id = randomId() // Asset ID; use random ID if not given (sprites and code, which don't use md5 hashes I think)
}) => new Promise((resolve, reject) => {
    const backpack = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') || [];
    const newEntry = {
      type,
      mime,
      name,
      body,
      thumbnail,
      id
    };
    backpack.splice(0, 0, newEntry);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(backpack));
    resolve(includeFullUrls(newEntry, host));
});

const deleteBackpackObject = ({
    host,
    username,
    token,
    id
}) => new Promise((resolve, reject) => {
    const backpack = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') || [];
    const index = backpack.findIndex(entry => entry.id === id);
    if (index >= 0) {
      backpack.splice(index, 1);
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(backpack));
    }
    resolve({ok: true});
});

const getBackpackObjectById = id => {
    const backpack = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') || [];
    return backpack.find(entry => entry.id === id);
};

// Two types of backpack items are not retreivable through storage
// code, as json and sprite3 as arraybuffer zips.
const fetchAs = (responseType, uri) => new Promise((resolve, reject) => {
    xhr({uri, responseType}, (error, response) => {
        if (error || response.statusCode !== 200) {
            return reject(new Error(response.status));
        }
        return resolve(response.body);
    });
});

// These two helpers allow easy fetching of backpack code and sprite zips
// Use the curried fetchAs here so the consumer does not worry about XHR responseTypes
const fetchCode = fetchAs.bind(null, 'json');
const fetchSprite = fetchAs.bind(null, 'arraybuffer');

export {
    getBackpackContents,
    saveBackpackObject,
    deleteBackpackObject,
    getBackpackObjectById,
    costumePayload,
    soundPayload,
    spritePayload,
    codePayload,
    fetchCode,
    fetchSprite
};
