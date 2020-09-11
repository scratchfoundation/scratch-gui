const isSupported = () =>
    // These are the features we override to make the progress bar work.
    // If these don't exist Scratch 3 can still load projects but we won't be able to monitor it.
    !!window.Worker && !!window.fetch;

if (isSupported()) {
    let total = 0;
    let complete = 0;

    const barOuter = document.createElement('div');
    barOuter.id = 'tw-progress-bar';
    barOuter.style.width = '100%';
    barOuter.style.height = '5px';
    barOuter.style.border = '1px solid white';

    const barInner = document.createElement('div');
    barInner.style.height = '100%';
    barInner.style.width = '0';
    barInner.style.background = 'white';
    barOuter.appendChild(barInner);

    // 0 - none
    // 1 - load json
    // 2 - load assets
    let state = 0;

    let loadingMessage;

    const setState = newState => {
        if (state === newState) {
            return;
        }
        state = newState;
        addBarToDocument();
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    const updateMessage = () => {
        if (loadingMessage) {
            if (state === 1) {
                loadingMessage.textContent = `Loading project data …`;
            } else if (state === 2) {
                loadingMessage.textContent = `Loading assets (${complete}/${total}) …`;
            }
        }
    };

    const setProgress = progress => {
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        if (progress === 1) {
            mutationObserver.disconnect();
            state = 0;
        }
        if (state === 2) {
            updateMessage();
        }
        barInner.style.width = `${progress * 100}%`;
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

            setState(1);
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
                xhr.onloadend = () => setProgress(1);
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
                    setState(2);
                    setProgress(0);
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

    const addBarToDocument = () => {
        if (document.getElementById('tw-progress-bar')) {
            return;
        }

        const message = document.getElementById('tw-loading-message');
        if (message) {
            loadingMessage = message;
            updateMessage();
            message.parentElement.parentElement.appendChild(barOuter);
        }
    };

    const mutationObserver = new MutationObserver(addBarToDocument);
}
