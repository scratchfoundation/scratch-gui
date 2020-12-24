/* eslint-disable */
// Loader for https://github.com/griffpatch/Scratch3-Dev-Tools

const VERSION = '62a4369a78d2c560e6d59fcaa3ae9afcef2fa46b';

export default async function () {
    // TODO: include local copies
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/gh/griffpatch/Scratch3-Dev-Tools@${VERSION}/inject3.js`;
    const style = document.createElement('link');
    style.href = `https://cdn.jsdelivr.net/gh/griffpatch/Scratch3-Dev-Tools@${VERSION}/inject.css`;
    style.rel = 'stylesheet';

    document.head.appendChild(script);
    document.head.appendChild(style);
}
