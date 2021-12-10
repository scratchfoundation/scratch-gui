import Papa from 'papaparse';

export default () => new Promise((resolve, reject) => {
    const fileInput = document.getElementById('import_csv') || document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', '.csv, .tsv, .txt'); // parser auto-detects delimiter
    fileInput.setAttribute('style', 'display: none');
    fileInput.setAttribute('id', 'import_csv');
    fileInput.onchange = e => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: false,
            complete: results => {
                document.body.removeChild(fileInput);
                resolve(results.data);
            },
            error: err => {
                document.body.removeChild(fileInput);
                reject(err);
            }
        });
    };
    document.body.appendChild(fileInput);
    fileInput.click();
});
