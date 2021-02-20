const isMobile = () => (
    // In case running in node
    typeof navigator !== 'undefined' &&
    /android|iphone|ipod|ipad/i.test(navigator.userAgent)
);

export default isMobile();
