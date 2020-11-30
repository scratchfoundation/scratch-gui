const available = () => !!window.showSaveFilePicker;

const scratchFileType = {
    description: 'Scratch 3 Project',
    accept: {
        'application/x.scratch.sb3': '.sb3'
    }
};

const showSaveFilePicker = async () => await window.showSaveFilePicker({
    types: [scratchFileType]
});

const showOpenFilePicker = async () => {
    const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [scratchFileType]
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
