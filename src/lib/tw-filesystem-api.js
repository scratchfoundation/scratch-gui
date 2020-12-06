const available = () => !!window.showSaveFilePicker;

const scratch1 = {
    description: 'Scratch 1 Project',
    accept: {
        // TODO: not sure what the proper type for this is
        'application/x.scratch.sb': '.sb'
    }
};
const scratch2 = {
    description: 'Scratch 2 Project',
    accept: {
        // TODO: not sure what the proper type for this is
        'application/x.scratch.sb2': '.sb2'
    }
};
const scratch3 = {
    description: 'Scratch 3 Project',
    accept: {
        'application/x.scratch.sb3': '.sb3'
    }
};

const showSaveFilePicker = async () => await window.showSaveFilePicker({
    types: [scratch3]
});

const showOpenFilePicker = async () => {
    const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [scratch3, scratch2, scratch1]
    });
    return handle;
};

const writeToHandle = async (handle, content) => {
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
};

export default {
    available,
    showOpenFilePicker,
    showSaveFilePicker,
    writeToHandle
};
