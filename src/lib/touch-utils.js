const getEventXY = e => {
    if (e.touches && e.touches[0]) {
        return {x: e.touches[0].clientX, y: e.touches[0].clientY};
    } else if (e.changedTouches && e.changedTouches[0]) {
        return {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY};
    }
    return {x: e.clientX, y: e.clientY};
};

export {
    getEventXY
};
