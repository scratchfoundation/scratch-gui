import xhr from 'xhr';

const getBackpackContents = ({
    host,
    username,
    token,
    limit,
    offset
}) => new Promise((resolve, reject) => {
    xhr({
        method: 'GET',
        uri: `${host}${username}?limit=${limit}&offset=${offset}`,
        headers: {'x-token': token},
        json: true
    }, (error, response) => {
        if (error || response.statusCode !== 200) {
            return reject();
        }
        // Add a new property for the full thumbnail url, which includes the host.
        // TODO retreiving the images through storage would allow us to remove this.
        return resolve(response.body.map(item => (
            Object.assign({}, item, {thumbnailUrl: `${host}/${item.thumbnail}`})
        )));
    });
});

export {
    getBackpackContents
};
