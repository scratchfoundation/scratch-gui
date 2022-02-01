/**
 * @fileoverview
 * Utility functions for drag interactions, e.g. sorting items in a grid/list.
 */

/**
 * From an xy position and a list of boxes {top, left, bottom, right}, return there
 * corresponding box index the position is over. The boxes are in a (possibly wrapped)
 * list, the only requirement being all boxes are flush against the edges, that is,
 * if they are along an outer edge, the position of that edge is identical.
 * This functionality works for a single column of items, a wrapped list with
 * many rows, or a single row of items.
 * @param {{x: number, y: number}} position The xy coordinates to retreive the corresponding index of.
 * @param {Array.<DOMRect>} boxes The rects of the items, returned from `getBoundingClientRect`
 * @param {bool} isRtl are the boxes in RTL order.
 * @return {?number} index of the corresponding box, or null if one could not be found.
 */
const indexForPositionOnList = ({x, y}, boxes, isRtl) => {
    if (boxes.length === 0) return null;
    let index = null;
    const leftEdge = Math.min.apply(null, boxes.map(b => b.left));
    const rightEdge = Math.max.apply(null, boxes.map(b => b.right));
    const topEdge = Math.min.apply(null, boxes.map(b => b.top));
    const bottomEdge = Math.max.apply(null, boxes.map(b => b.bottom));
    for (let n = 0; n < boxes.length; n++) {
        const box = boxes[n];
        // Construct an "extended" box for each, extending out to infinity if
        // the box is along a boundary.
        let minX = box.left === leftEdge ? -Infinity : box.left;
        let maxX = box.right === rightEdge ? Infinity : box.right;
        const minY = box.top === topEdge ? -Infinity : box.top;
        const maxY = box.bottom === bottomEdge ? Infinity : box.bottom;
        // The last item in the wrapped list gets a right edge at infinity, even
        // if it isn't the farthest right, in RTL mode. In LTR mode, it gets a
        // left edge at infinity.
        if (n === boxes.length - 1) {
            if (isRtl) {
                minX = -Infinity;
            } else {
                maxX = Infinity;
            }
        }

        // Check if the point is in the bounds.
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            index = n;
            break; // No need to keep looking.
        }
    }
    return index;
};

export {
    indexForPositionOnList
};
