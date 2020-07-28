let total = 0;
let complete = 0;

const progressEl = document.createElement('div');
progressEl.id = 'hacky-progress-el';
progressEl.style.position = 'absolute';
progressEl.style.top = '0';
progressEl.style.left = '0';
progressEl.style.height = '4px';
progressEl.style.backgroundColor = 'white';
progressEl.style.zIndex = '99999999';
progressEl.style.width = '0';
progressEl.style.opacity = '0';
progressEl.style.transition = 'all .2s';
progressEl.title = 'Progress Bar'; // todo: translate
document.body.appendChild(progressEl);

window.addEventListener('hashchange', (e) => {
    if (location.hash) {
        total = 0;
        complete = 0;
        setProgress(0);
    }
});

const hideProgress = () => {
    progressEl.style.opacity = '0';
};

const showProgress = () => {
    progressEl.style.opacity = '1';
};

const setProgress = (progress) => {
    progressEl.style.width = 10 + progress * 90 + '%';
    if (progress >= 1) {
        hideProgress();
    }
};

const handlePostMessage = (e) => {
    const data = e.data;
    if (Array.isArray(data)) {
        complete += data.length;
        setProgress(complete / total);
    }
};

setProgress(0);

// Alternative implementation below, disables worker so everything happens on the main thread.
// It does provide a more accurate progress bar but loading things off the main thread is probably more important.
// const originalFetch = window.fetch;
// window.fetch = (url, opts) => {
//     total++;
//     return originalFetch(url, opts)
//         .then((r) => {
//             complete++;
//             updateProgressBar();
//             return r;
//         });
// };
// window.Worker = null;

// We override the global Worker object to monitor when messages are passed around.
// Is this terrible? Absolutely.
// Never do this. Please.
window.Worker = class Worker extends window.Worker {
    constructor(url, options) {
        super(url, options);
        this.addEventListener('message', handlePostMessage);
    }
    
    postMessage(message) {
        super.postMessage(message);
        showProgress();
        total++;
    }
};
