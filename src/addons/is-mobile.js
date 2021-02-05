const isMobile = () => (
    // In case running in node
    typeof navigator !== 'undefined' &&
    // TODO: should tablets be included?
    /android|iphone|ipod|ipad/i.test(navigator.userAgent)
);

export default isMobile();
