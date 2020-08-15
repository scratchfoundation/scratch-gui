const isSupported = () =>
    // These are the features we override to make the progress bar work.
    // If these don't exist Scratch 3 can still load projects but we won't be able to monitor it.
    !!window.Worker && !!window.fetch;

const HIDE_AFTER = 5000;

if (isSupported()) {
    let total = 0;
    let complete = 0;
    let hideTimeout;

    const progressEl = document.createElement('div');
    progressEl.style.position = 'absolute';
    progressEl.style.top = '0';
    progressEl.style.left = '0';
    progressEl.style.height = '5px';
    progressEl.style.backgroundColor = 'white';
    progressEl.style.zIndex = '99999999';
    progressEl.style.width = '0';
    progressEl.style.opacity = '0';
    progressEl.style.transition = 'all .2s';
    progressEl.style.pointerEvents = 'none';
    document.body.appendChild(progressEl);

    const hideProgress = () => {
        progressEl.style.opacity = '0';
        clearTimeout(hideTimeout);
    };

    const showProgress = () => {
        progressEl.style.opacity = '1';
        clearTimeout(hideTimeout);
    };

    const setProgress = progress => {
        progressEl.style.width = `${10 + (progress * 90)}%`;
        if (progress >= 1) {
            hideProgress();
        }
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideProgress, HIDE_AFTER);
    };

    const handlePostMessage = e => {
        const data = e.data;
        if (Array.isArray(data)) {
            complete += data.length;
            setProgress(complete / total);
        }
    };

    const isProjectDataRequest = (url, opts) => typeof url === 'string' && /^https:\/\/projects\.scratch\.mit\.edu\/\d+$/.test(url) && opts && opts.method === 'GET';

    // Scratch uses fetch() to download the project JSON, so we override the global fetch() method to monitor when the project is being downloaded.
    const originalFetch = window.fetch;
    window.fetch = (url, opts) => {
        if (isProjectDataRequest(url, opts)) {
            // `url` is known to be a string now

            showProgress();
            setProgress(0);

            return new Promise((resolve, reject) => {
                // fetch() does not support progress, so we use XMLHttpRequest
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    resolve(new Response(xhr.response, {
                        status: xhr.status,
                        statusText: xhr.statusText
                    }));
                };
                xhr.onerror = () => reject(new Error('(tw-hacky-progress-bar) xhr failed'));
                xhr.onprogress = e => {
                    if (e.lengthComputable) {
                        setProgress(e.loaded / e.total);
                    }
                };
                xhr.open('GET', url);
                xhr.send();
            });
        }
        return originalFetch(url, opts);
    };

    // Scratch uses a worker to download assets, so we override the global Worker object to monitor when objects are passed around.
    // Is this terrible? Absolutely.
    // Never do this. Please.
    window.Worker = class Worker extends window.Worker {
        constructor (url, options) {
            super(url, options);
            this.addEventListener('message', handlePostMessage);
        }

        postMessage (message) {
            super.postMessage(message);
            // check that this is the right object
            if (message && typeof message === 'object') {
                if ('url' in message && 'id' in message && 'options' in message) {
                    showProgress();
                    total++;
                }
            }
        }
    };

    window.addEventListener('hashchange', () => {
        if (location.hash) {
            total = 0;
            complete = 0;
            setProgress(0);
        }
    });
}
