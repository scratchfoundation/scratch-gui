const getBackpackContents = ({
    host,
    username,
    token,
    limit,
    offset
}) => fetch(`${host}${username}?limit=${limit}&offset=${offset}`, {
    headers: {'x-token': token}
})
    .then(d => d.json())
    .then(items => items.map(item =>
        // Add a new property for the full thumbnail url, which includes the host.
        // TODO retreiving the images through storage would allow us to remove this.
        Object.assign(item, {thumbnailUrl: `${host}${item.thumbnail}`})
    ));

export {
    getBackpackContents
};
