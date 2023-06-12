const SVG_NS = 'http://www.w3.org/2000/svg';

const containerSvg = document.createElementNS(SVG_NS, 'svg');
// unfortunately we can't use display: none on this as that breaks filters
containerSvg.style.position = 'fixed';
containerSvg.style.top = '-999999px';
containerSvg.style.width = '0';
containerSvg.style.height = '0';
document.body.appendChild(containerSvg);

let nextGlowerId = 0;

const highlightsPerElement = new WeakMap();

const getHighlightersForElement = element => {
    if (!highlightsPerElement.get(element)) {
        highlightsPerElement.set(element, new Set());
    }
    return highlightsPerElement.get(element);
};

const updateHighlight = (element, highlighters) => {
    let result;
    for (const i of highlighters) {
        if (!result || i.priority > result.priority) {
            result = i;
        }
    }
    if (result) {
        element.style.filter = result.filter;
    } else {
        element.style.filter = '';
    }
};

const addHighlight = (element, highlighter) => {
    const highlighters = getHighlightersForElement(element);
    highlighters.add(highlighter);
    updateHighlight(element, highlighters);
};

const removeHighlight = (element, highlighter) => {
    const highlighters = getHighlightersForElement(element);
    highlighters.delete(highlighter);
    updateHighlight(element, highlighters);
};

class Highlighter {
    constructor (priority, color) {
        this.priority = priority;

        const id = `sa_glower_filter${nextGlowerId++}`;
        this.filter = `url("#${id}")`;

        this.previousElements = new Set();

        const filterElement = document.createElementNS(SVG_NS, 'filter');
        filterElement.id = id;
        filterElement.setAttribute('width', '180%');
        filterElement.setAttribute('height', '160%');
        filterElement.setAttribute('x', '-40%');
        filterElement.setAttribute('y', '-30%');

        const filterBlur = document.createElementNS(SVG_NS, 'feGaussianBlur');
        filterBlur.setAttribute('in', 'SourceGraphic');
        filterBlur.setAttribute('stdDeviation', '4');
        filterElement.appendChild(filterBlur);

        const filterTransfer = document.createElementNS(SVG_NS, 'feComponentTransfer');
        filterTransfer.setAttribute('result', 'outBlur');
        filterElement.appendChild(filterTransfer);

        const filterTransferTable = document.createElementNS(SVG_NS, 'feFuncA');
        filterTransferTable.setAttribute('type', 'table');
        filterTransferTable.setAttribute('tableValues', '0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1');
        filterTransfer.appendChild(filterTransferTable);

        const filterFlood = document.createElementNS(SVG_NS, 'feFlood');
        filterFlood.setAttribute('flood-opacity', '1');
        filterFlood.setAttribute('result', 'outColor');
        filterElement.appendChild(filterFlood);
        this.filterFlood = filterFlood;

        const filterComposite = document.createElementNS(SVG_NS, 'feComposite');
        filterComposite.setAttribute('in', 'outColor');
        filterComposite.setAttribute('in2', 'outBlur');
        filterComposite.setAttribute('operator', 'in');
        filterComposite.setAttribute('result', 'outGlow');
        filterElement.appendChild(filterComposite);

        const filterFinalComposite = document.createElementNS(SVG_NS, 'feComposite');
        filterFinalComposite.setAttribute('in', 'SourceGraphic');
        filterFinalComposite.setAttribute('in2', 'outGlow');
        filterFinalComposite.setAttribute('operator', 'over');
        filterElement.appendChild(filterFinalComposite);

        containerSvg.appendChild(filterElement);
        this.setColor(color);
    }

    setColor (color) {
        this.filterFlood.setAttribute('flood-color', color);
    }

    setGlowingThreads (threads) {
        const elementsToHighlight = new Set();
        const workspace = window.Blockly.getMainWorkspace();

        if (workspace) {
            for (const thread of threads) {
                thread.stack.forEach(blockId => {
                    const block = workspace.getBlockById(blockId);
                    if (!block) {
                        return;
                    }
                    const childblock = thread.stack.find(i => {
                        let b = block;
                        while (b.childBlocks_.length) {
                            b = b.childBlocks_[b.childBlocks_.length - 1];
                            if (i === b.id) return true;
                        }
                        return false;
                    });
                    if (!childblock && block.svgPath_) {
                        const svgPath = block.svgPath_;
                        elementsToHighlight.add(svgPath);
                    }
                });
            }
        }

        for (const element of this.previousElements) {
            if (!elementsToHighlight.has(element)) {
                removeHighlight(element, this);
            }
        }
        for (const element of elementsToHighlight) {
            if (!this.previousElements.has(element)) {
                addHighlight(element, this);
            }
        }
        this.previousElements = elementsToHighlight;
    }
}

export default Highlighter;
