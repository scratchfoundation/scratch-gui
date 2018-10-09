import defaultsdeep from 'lodash.defaultsdeep';
import xhr from 'xhr';

const api = (options, token, callback) => {
    defaultsdeep(options, {
        host: process.env.API_HOST || 'https://api.scratch.mit.edu'
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
