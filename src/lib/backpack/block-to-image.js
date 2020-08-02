import computedStyleToInlineStyle from 'computed-style-to-inline-style';
import ScratchBlocks from 'scratch-blocks';

/**
 * Given a blockId, return a data-uri image that can be used to create a thumbnail.
 * @param {string} blockId the ID of the block to imagify
 * @return {Promise} resolves to a data-url of a picture of the blocks
 */
export default function (blockId) {
    // Not sure any better way to access the scratch-blocks workspace than this...
    const block = ScratchBlocks.getMainWorkspace().getBlockById(blockId);
    const blockSvg = block.getSvgRoot().cloneNode(true /* deep */);

    // Once we have the cloned SVG, do the rest in a setTimeout to prevent
    // blocking the drag end from finishing promptly.
    return new Promise(resolve => {
        setTimeout(() => {
            // Strip &nbsp; entities that cannot be inlined
            blockSvg.innerHTML = blockSvg.innerHTML.replace(/&nbsp;/g, ' ');

            // Create an <svg> element to put the cloned blockSvg inside
            const NS = 'http://www.w3.org/2000/svg';
            const svg = document.createElementNS(NS, 'svg');
            svg.appendChild(blockSvg);

            // Needs to be on the DOM to get CSS properties and correct sizing
            document.body.appendChild(svg);

            const padding = 10;
            const extraHatPadding = 16;
            const topPadding = padding + (blockSvg.getAttribute('data-shapes') === 'hat' ? extraHatPadding : 0);
            const leftPadding = padding;
            blockSvg.setAttribute('transform', `translate(${leftPadding} ${topPadding})`);

            const bounds = blockSvg.getBoundingClientRect();
            svg.setAttribute('width', bounds.width + (2 * padding));
            svg.setAttribute('height', bounds.height + (2 * padding));

            // We need to inline the styles set by CSS rules because
            // not all the styles are set directly on the SVG. This makes the
            // image styled the same way the block actually appears.
            // TODO this doesn't handle images that are xlink:href in the SVG
            computedStyleToInlineStyle(svg, {
                recursive: true,
                // Enumerate the specific properties we need to inline.
                // Specifically properties that are set from CSS in scratch-blocks
                properties: ['fill', 'font-family', 'font-size', 'font-weight']
            });

            const svgString = (new XMLSerializer()).serializeToString(svg);

            // Once we have the svg as a string, remove it from the DOM
            svg.parentNode.removeChild(svg);

            resolve(`data:image/svg+xml;utf-8,${encodeURIComponent(svgString)}`);
        }, 10);
    });
}
