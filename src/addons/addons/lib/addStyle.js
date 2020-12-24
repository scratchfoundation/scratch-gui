const addStlye = css => {
    const style = document.createElement('style');
    style.innerText = css;
    document.head.appendChild(style);
};

export default addStlye;
