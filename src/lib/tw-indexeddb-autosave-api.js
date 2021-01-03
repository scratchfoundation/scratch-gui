// TODO: gracefully handle no window.indexedDB

let _db;

const openDB = () => new Promise((resolve, reject) => {
    if (_db) {
        resolve(_db);
        return;
    }

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

    request.onerror = e => {
        // TODO: examine error?
        reject(new Error('Cannot get DB'));
    };
});

const save = vm => new Promise(async (resolve, reject) => {
    const files = vm.saveProjectSb3DontZip();
    
    const db = await openDB();
    const transaction = db.transaction('project', 'readwrite');
    transaction.onerror = e => {
        // TODO: examine error?
        reject(new Error('save transaction error'));
    };

    const projectStore = transaction.objectStore('project');

    const exists = [];
    const cursorRequest = projectStore.openCursor();
    cursorRequest.onsuccess = e => {
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
    // TODO: check that cursorRequest error bubbles to transaction
});

const load = () => new Promise((resolve, reject) => {
    // TODO
});

export default {
    save,
    load
};
