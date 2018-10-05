import defaultsdeep from 'lodash.defaultsdeep';
import xhr from 'xhr';

const api = (options, token, callback) => {
    defaultsdeep(options, {
        host: 'https://api.scratch.mit.edu',
        headers: {},
        responseType: 'json'
    });
    defaultsdeep(options, {
        uri: options.host + options.path,
        headers: {},
        responseType: 'json'
    });
    if (token) {
        options.headers['X-Token'] = token;
    }

    xhr(options, (err, res, body) => {
        if (err) {
            callback({
                isError: true,
                error: err
            });
        }
        callback(body);
    });
};

export default api;
