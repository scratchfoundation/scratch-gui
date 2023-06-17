import _fetch from 'node-fetch';
import {HttpProxyAgent} from 'http-proxy-agent';
import {HttpsProxyAgent} from 'https-proxy-agent';
/**
 * A wrapper for node-fetch that adds preset options for every requests.
 * @param {string} url the request's url passed to node-fetch.
 * @param {RequestInit} options the fetch options to be passed to node-fetch.
 * @returns {Promise<Response>} the response object returned from node-fetch
 */
export default (url, options) => _fetch(url, {
    // Configure the proxy designated from environment variable, if there is one.
    agent (parsedURL) {
        const protocol = parsedURL.protocol;

        const httpProxyAddress = process.env.http_proxy;
        const httpsProxyAddress = process.env.https_proxy;

        if (protocol === 'http:' && httpProxyAddress) {
            return new HttpProxyAgent(httpProxyAddress);
        } else if (protocol === 'https:' && httpsProxyAddress) {
            return new HttpsProxyAgent(httpsProxyAddress);
        }

        return null;
    },

    ...options
});
