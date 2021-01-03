import JSZip from 'jszip';

let _db;

const openDB = () => {
    if (_db) {
        return _db;
    }

    if (!window.indexedDB) {
        throw new Error('indexedDB is not supported');
    }

    return new Promise((resolve, reject) => {
        // Special constants: do not change without care.
        const request = indexedDB.open('TW_AutoSave', 1);

        request.onupgradeneeded = e => {
            const db = e.target.result;
            db.createObjectStore('project', {
                keyPath: 'file'
            });
        };

        request.onsuccess = e => {
            _db = e.target.result;
            resolve(_db);
        };

        request.onerror = () => {
            reject(new Error(`Cannot open DB: ${request.error}`));
        };
    });
};

/**
 * Save a project to IDB.
 * @param {VirtualMachine} vm Scratch VM
 */
const save = async vm => {
    // To save a project, we will get all the assets inside it and save them to IDB.
    // We will not actually generate a zip as that is slow.
    const files = vm.saveProjectSb3DontZip();
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('project', 'readwrite');
        transaction.onerror = () => {
            reject(new Error(`Transaction error while saving: ${transaction.error}`));
        };

        const projectStore = transaction.objectStore('project');

        // Remove unused assets and don't waste time updating assets that are already in IDB.
        const exists = [];
        const request = projectStore.openCursor();
        request.onsuccess = e => {
            const cursor = e.target.result;
            if (cursor) {
                const key = cursor.key;
                if (files[key]) {
                    exists.push(key);
                } else {
                    cursor.delete();
                }
                cursor.continue();
            } else {
                // Cursor is done, save all new files and project.json to IDB.
                for (const file of Object.keys(files)) {
                    if (file === 'project.json' || !exists.includes(file)) {
                        projectStore.put({
                            file,
                            data: files[file].buffer
                        });
                    }
                }

                resolve();
            }
        };
    });
};

/**
 * Load a project from IDB.
 * @returns {Promise<ArrayBuffer>} sb3 project to load.
 */
const load = async () => {
    // To load a project, read the files from IDB and generate a .sb3
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('project', 'readonly');
        transaction.onerror = () => {
            reject(new Error(`Transaction error while loading: ${transaction.error}`));
        };

        const zip = new JSZip();
        const projectStore = transaction.objectStore('project');
        const request = projectStore.openCursor();
        request.onsuccess = e => {
            const cursor = e.target.result;
            if (cursor) {
                zip.file(cursor.key, cursor.value.data);
                cursor.continue();
            } else {
                // Cursor is done.
                resolve(zip.generateAsync({
                    type: 'arraybuffer'
                    // No reason to compress this zip.
                }));
            }
        };
    });
};

export default {
    save,
    load
};
