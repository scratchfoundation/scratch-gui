export default bmpImage => new Promise(resolve => {
    // If the input is an ArrayBuffer, we need to convert it to a `Blob` and give it a URL so we can use it as an <img>
    // `src`. If it's a data URI, we can use it as-is.
    const imageUrl = bmpImage instanceof String ?
        bmpImage :
        window.URL.createObjectURL(new Blob([bmpImage], {type: 'image/bmp'}));
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const image = document.createElement('img');

    image.addEventListener('load', () => {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0);

        const dataUrl = canvas.toDataURL('image/png');
    
        // Revoke URL. If a blob URL was generated earlier, this allows the blob to be GC'd and prevents a memory leak.
        window.URL.revokeObjectURL(imageUrl);

        resolve(dataUrl);
    });

    image.setAttribute('src', imageUrl);
});
