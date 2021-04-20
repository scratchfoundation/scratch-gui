import Papa from 'papaparse';

export default () => new Promise((resolve, reject) => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', '.csv, .tsv, .txt'); // parser auto-detects delimiter
    fileInput.onchange = e => {
        const file = e.target.files[0];
        const fr = new FileReader();
        fr.onload = () => {
            document.body.removeChild(fileInput);
            const text = fr.result;
            Papa.parse(text, {
                header: false,
                complete: results => {
                    resolve({
                        rows: results.data,
                        text
                    });
                },
                error: err => {
                    reject(err);
                }
            });
        };
        fr.onerror = () => {
            document.body.removeChild(fileInput);
            reject(new Error('Cannot read file'));
        };
        fr.readAsText(file);
    };
    document.body.appendChild(fileInput);
    fileInput.click();
});
