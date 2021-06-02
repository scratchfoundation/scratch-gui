const isMobile = () => (
    // In case running in node
    typeof window !== 'undefined' &&
    'ontouchstart' in window
);

export default isMobile();
