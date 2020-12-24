let loaded = false;

const load = () => {
    import(/* webpackChunkName: "addons" */ './index');
};

const loadAddons = () => {
    if (loaded) {
        return;
    }
    loaded = true;

    setTimeout(load, 0);
};

export default loadAddons;
