let loaded = false;

const loadAddons = () => {
    if (loaded) {
        return;
    }
    loaded = true;
    
    import(/* webpackChunkName: "addons" */ './index');
};

export default loadAddons;
