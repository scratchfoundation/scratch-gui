let injected = false;

// git tag of the version to use
const VERSION = '0.2.4';

const load = () => {
    if (injected) return;
    injected = true;
    
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/gh/griffpatch/Scratch3-Dev-Tools@${VERSION}/inject3.js`;
    const style = document.createElement('link');
    style.href = `https://cdn.jsdelivr.net/gh/griffpatch/Scratch3-Dev-Tools@${VERSION}/inject.css`;
    style.rel = 'stylesheet';
    
    document.head.appendChild(script);
    document.head.appendChild(style);
};

export default {
    load
}
