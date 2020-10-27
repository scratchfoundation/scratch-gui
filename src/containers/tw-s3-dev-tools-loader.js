// Loader for https://github.com/griffpatch/Scratch3-Dev-Tools

let injected = false;

// git tag or commit of the version to use
// we use commits so that the version loaded is always the same and known to work, no surprises
const VERSION = '62a4369a78d2c560e6d59fcaa3ae9afcef2fa46b';

const inject = () => {
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/gh/griffpatch/Scratch3-Dev-Tools@${VERSION}/inject3.js`;
    const style = document.createElement('link');
    style.href = `https://cdn.jsdelivr.net/gh/griffpatch/Scratch3-Dev-Tools@${VERSION}/inject.css`;
    style.rel = 'stylesheet';

    document.head.appendChild(script);
    document.head.appendChild(style);
};

const load = () => {
    if (injected) return;
    injected = true;

    // We try to delay the script loading until everything else is complete to avoid main thread work
    // This is critically important as the page is likely still loading when this runs
    if (window.requestIdleCallback) {
        requestIdleCallback(inject);
    } else {
        setTimeout(inject, 0);
    }
};

export default {
    load
};
