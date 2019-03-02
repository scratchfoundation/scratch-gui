/**
 * Generate a function that walks a toolbox or workspace xml defition and
 * determine the pieces of text and their widths.
 * @param {ScratchBlocks} ScratchBlocks blocks top level object to bind to
 * @return {function} function that will determine texts and their widths
 */
export default function (ScratchBlocks) {
    const svgTag = tagName => ScratchBlocks.utils.createSvgElement(tagName);

    const textRoot = svgTag('svg');

    // A cache of element class name to text content/text width pairs.
    const textRenderCache = {};

    // Wrap Field.getCachedWidth. Use a nested cache, it'll be faster
    // than concatenating a key every visit to this function.
    const _getCachedWidth = ScratchBlocks.Field.getCachedWidth;
    ScratchBlocks.Field.getCachedWidth = function (text) {
        const className = text.className.baseVal;
        const textContent = text.textContent;
        if (textRenderCache[className]) {
            const _cached = textRenderCache[className][textContent];
            if (_cached) {
                return _cached;
            }
            textRenderCache[className][textContent] = _getCachedWidth.call(this, text);
            return textRenderCache[className][textContent];
        }
        textRenderCache[className] = {};
        textRenderCache[className][textContent] = _getCachedWidth.call(this, text);
        return textRenderCache[className][textContent];
    };

    // Create a <text class="blocklyText"></text>
    const blocklyText = text => {
        const tag = svgTag('text');
        tag.setAttribute('class', 'blocklyText');
        tag.textContent = text;
        return tag;
    };
    blocklyText.class = 'blocklyText';

    // Create a <text class="blocklyText blocklyDropdownText"></text>
    const blocklyDropdownText = text => {
        const tag = svgTag('text');
        tag.setAttribute('class', 'blocklyText blocklyDropdownText');
        tag.textContent = text;
        return tag;
    };
    blocklyDropdownText.class = 'blocklyText blocklyDropdownText';

    // Create a <text class="blocklyFlyoutLabelText"></text>
    const blocklyFlyoutLabelText = text => {
        const tag = svgTag('text');
        tag.setAttribute('class', 'blocklyFlyoutLabelText');
        tag.textContent = text;
        return tag;
    };
    blocklyText.class = 'blocklyFlyoutLabelText';

    // A new text group will be assigned during each iteration.
    let textGroup;

    // Create and add an element to the textGroup.
    const add = (type, text) => {
        if (textRenderCache[type.class] && textRenderCache[type.class][text]) {
            // Skip this element if its end result is in the render cache from a
            // previous iteration.
            return;
        }
        textGroup.appendChild(type(text));
    };

    // Create an element without handling text or checking a walk stage cache.
    const justCache = (type, text) => {
        if (!text) {
            return;
        }
        add(type, text);
    };

    // Check if the type/text pair is accounted for in a passed cache. Add it if
    // it is not.
    const isCached = (subcache, type, text) => {
        if (!text) {
            return true;
        } else if (subcache[type.class] && subcache[type.class][text]) {
            return true;
        } else if (subcache[type.class]) {
            subcache[type.class][text] = true;
        } else {
            subcache[type.class] = {
                [text]: true
            };
        }
        return false;
    };

    const spaceRE = / /g;
    const localekeyRE = /%\{[^}]*\}/;
    const argnumRE = /%(\d+|\{[^}]*\})/;
    const argcodeRE = /%[bns]/;
    const nbsp = '\u00a0';

    // Create a single element of type.class and text.
    const cacheOneCache = {};
    const cacheOne = (type, text) => {
        if (isCached(cacheOneCache, type, text)) return;

        add(type, text.replace(spaceRE, nbsp));
    };

    // Create a localized element of type.class and Msg[key].
    const cacheLocalized = (type, key) => {
        let _key = key.toUpperCase();
        if (_key.startsWith('BKY_')) {
            _key = _key.substring(4);
        }

        const text = ScratchBlocks.Msg[_key];
        justCache(type, text);
    };

    // Create a set of elements spliting the block's proccode at inputs.
    const cacheProccodeCache = {};
    const cacheProccode = (type, text) => {
        if (isCached(cacheProccodeCache, type, text)) return;

        for (const _sub of text.split(argcodeRE)) {
            const sub = _sub.trim().replace(spaceRE, nbsp);
            add(type, sub);
        }
    };

    // Create a set of elements spliting the block's message at inputs. Elements
    // are also created for locale keys.
    const cacheSplitCache = {};
    const cacheSplit = (type, text) => {
        if (!localekeyRE.test(text) && isCached(cacheSplitCache, type, text)) return;

        let index = 0;
        for (const _sub of text.split(argnumRE)) {
            if ((index % 2) === 1) {
                if (_sub [0] === '{') {
                    cacheLocalized(type, _sub.substring(1, _sub.length - 1));
                }
            } else {
                const sub = _sub.trim().replace(spaceRE, nbsp);
                add(type, sub);
            }
            index++;
        }
    };

    // Emulate the parts needed to generate block json data for 99% of blocks.
    const cacheBlockImitation = {
        id: null,
        jsonInit (def) {
            if (def.message0) {
                cacheSplit(blocklyText, def.message0);
            }
            if (def.message1) {
                let i = 2;
                let key = 'message1';
                do {
                    cacheSplit(blocklyText, def[key]);
                    key = `message${i}`;
                    i += 1;
                } while (def[key]);
            }
            if (def.args0) {
                for (const arg of def.args0) {
                    if (arg.variable) {
                        cacheOne(blocklyDropdownText, arg.variable);
                    }
                    if (arg.type === 'field_dropdown') {
                        let {options} = arg;
                        if (typeof options === 'function') {
                            options = options();
                        }
                        for (const option of options) {
                            cacheOne(blocklyDropdownText, option[0]);
                        }
                    }
                }
            }
        }
    };

    // Create a set of elements for the message(s) and dropdowns of a block.
    const cacheBlock = (type, id) => {
        try {
            cacheBlockImitation.id = id;
            ScratchBlocks.Blocks[type].init.call(cacheBlockImitation);
        } catch (e) {
            // Blocks we can't yet handle will fallback to building their
            // text lengths later.
        }
    };

    /**
     * Walk a workspace or toolbox dom and emulate the text elements that will
     * be created. Measure the width of the text and cache it. Use those cached
     * values later in normal blocks construction. Creating and measuring all
     * of the text at one point lets us collapse the necessary document style
     * recalculations and layout into one.
     * @param {object} options - options of what and how to precache the text
     * @param {string} options.xml - the xml defining blocks whose text to cache
     * @param {boolean} options.isToolbox - is the xml for a toolbox
     * @param {XMLElement} options.dom - optional already parsed xml dom
     * @param {Element} options.root - root to append text element children on
     */
    return function ({
        xml,
        isToolbox = false,
        dom = ScratchBlocks.Xml.textToDom(xml),
        root = document.body
    }) {
        // Group to attach text elements to. Attach to a g element instead of
        // the svg root so let the g and text element tree be collected and
        // reuse the svg element.
        textGroup = svgTag('g');

        cacheOne(blocklyText, ' ');
        cacheOne(blocklyDropdownText, ' ');

        // Stop blocks use a lot of Block features this module doesn't emulate.
        // The values we need to render the text are fixed though, so we can
        // just render those specifically.
        cacheOne(blocklyText, ScratchBlocks.Msg.CONTROL_STOP);
        cacheOne(blocklyDropdownText, ScratchBlocks.Msg.CONTROL_STOP_ALL);
        cacheOne(blocklyDropdownText, ScratchBlocks.Msg.CONTROL_STOP_THIS);
        cacheOne(blocklyDropdownText, ScratchBlocks.Msg.CONTROL_STOP_OTHER);

        // Some text is generated dynamically for toolboxs and are not created
        // like most blocks are by their definitions in the xml input.
        if (isToolbox) {
            // NEW_* messsages are labels dynamically created for the toolbox.
            justCache(blocklyText, ScratchBlocks.Msg.NEW_VARIABLE);
            justCache(blocklyText, ScratchBlocks.Msg.NEW_LIST);
            justCache(blocklyText, ScratchBlocks.Msg.NEW_PROCEDURE);

            // Variable command blocks are created dynamically outside of what
            // the toolbox xml states.
            cacheBlock('data_setvariableto');
            cacheBlock('data_changevariableby');
            cacheBlock('data_showvariable');
            cacheBlock('data_hidevariable');

            // Default list block inputs
            cacheLocalized(blocklyText, 'DEFAULT_LIST_ITEM');
            justCache(blocklyText, 1);

            // List command blocks are created dynamically outside of what the
            // toolbox xml states.
            cacheBlock('data_addtolist');
            cacheBlock('data_deleteoflist');
            cacheBlock('data_deletealloflist');
            cacheBlock('data_insertatlist');
            cacheBlock('data_replaceitemoflist');
            cacheBlock('data_itemoflist');
            cacheBlock('data_itemnumoflist');
            cacheBlock('data_lengthoflist');
            cacheBlock('data_listcontainsitem');
            cacheBlock('data_showlist');
            cacheBlock('data_hidelist');
        }

        // Before the workspace is created some blocks want the pathToMedia.
        const mainWorkspace = ScratchBlocks.mainWorkspace;
        if (!mainWorkspace) {
            ScratchBlocks.mainWorkspace = {
                options: {
                    pathToMedia: ''
                }
            };
        }

        // Breadth-first walk the blocks xml dom and turn elements into their
        // respective text elements.
        const nodes = Array.from(dom.children);
        while (nodes.length) {
            const el = nodes.shift();

            // Is it a block?
            const type = el.getAttribute('type');
            if (ScratchBlocks.Blocks[type]) {
                cacheBlock(type, el.getAttribute('id'));
            }

            // Is it something else that has text?
            const tagName = el.tagName.toLowerCase();
            if (tagName === 'mutation') {
                cacheProccode(blocklyText, el.getAttribute('proccode'));
            } else if (tagName === 'category') {
                cacheSplit(blocklyFlyoutLabelText, el.getAttribute('name'));
            } else if (tagName === 'label') {
                justCache(blocklyFlyoutLabelText, el.getAttribute('text'));
            } else if (tagName === 'field') {
                cacheOne(blocklyText, el.textContent);
            } else if (tagName === 'variable') {
                cacheOne(blocklyText, el.textContent);
                cacheOne(blocklyDropdownText, el.textContent);
            }

            // Push the children so we can iterate over them as well.
            for (let i = 0; i < el.children.length; i++) {
                nodes.push(el.children[i]);
            }
        }

        // If the workspace isn't reated yet, overwrite the placeholder used
        // about to the previous falsy value.
        if (!mainWorkspace) {
            ScratchBlocks.mainWorkspace = mainWorkspace;
        }

        // Add the svg, g, and text tree to the dom.
        textRoot.appendChild(textGroup);
        root.appendChild(textRoot);

        // Measure all the elements.
        for (const element of textGroup.children) {
            ScratchBlocks.Field.getCachedWidth(element);
        }

        // Remove the tree from the dom.
        root.removeChild(textRoot);
        textRoot.removeChild(textGroup);
    };
}
