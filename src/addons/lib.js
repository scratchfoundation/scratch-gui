const addStylesheet = source => {
    const style = document.createElement('style');
    style.innerText = source;
    document.head.appendChild(style);
};

export {
    addStylesheet
};
