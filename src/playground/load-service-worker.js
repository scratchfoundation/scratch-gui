import log from '../lib/log';
import serviceWorker from '!!file-loader?name=sw.js!./service-worker.js';

if (process.env.ENABLE_SERVICE_WORKER && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(serviceWorker)
            .catch(err => {
                log.error('sw error', err);
            });
    });
}
