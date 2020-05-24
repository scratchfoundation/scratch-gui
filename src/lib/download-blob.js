export default (filename, blob) => {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    // Use special ms version if available to get it working on Edge.
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }

    if ('download' in HTMLAnchorElement.prototype) {
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.type = blob.type;
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
    } else {
        // iOS Safari, open a new page and set href to data-uri
        let popup = window.open('', '_blank');
        const reader = new FileReader();
        reader.onloadend = function () {
            popup.location.href = reader.result;
            popup = null;
        };
        reader.readAsDataURL(blob);
    }

};
