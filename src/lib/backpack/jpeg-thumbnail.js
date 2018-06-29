const jpegThumbnail = dataUrl => new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // TODO we may want to draw to a smaller, fixed size to optimize file size
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.fillStyle = 'white'; // Create white background, since jpeg doesn't have transparency
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(image, 0, 0);
        // TODO we can play with the `quality` option here to optimize file size
        resolve(canvas.toDataURL('image/jpeg', 0.92 /* quality */)); // Default quality is 0.92
    };
    image.src = dataUrl;
});

export default jpegThumbnail;
