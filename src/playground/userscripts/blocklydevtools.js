
module.exports = {
    func: function () {
        function blocklyDeveloperTools() {
            var Blockly = window.Blockly; //Blockly is usually exposed by default.

            if (!Blockly) { //If the Blockly global is not exposed or found manually, the script cannot do anything useful.
                return "Failed to find Blockly instance!";
            }

            var workspace = Blockly.getMainWorkspace();

            var dom = Blockly.Xml.workspaceToDom(workspace); //Export the workspace to a DOM representing the save XML.
            workspace.addChangeListener(() => { //Every time the workspace changes, update the dom variable.
                if (!document.querySelector("g.blocklyDraggable[data-id].blocklyInsertionMarker")) { //Blockly will try to serialise insertion markers, which will cause an internal crash.
                    dom = Blockly.Xml.workspaceToDom(workspace);
                }
            });

            const observerConfig = { childList: true, characterData: false, attributes: false, subtree: true }; //Config for MutationObservers.

            const TabManager = { //Hacky fix to get the tab key working in the XML editor.
                enableTab: function (keyEvent) { //Call with the key event and a string to insert at the text caret's position
                    if (keyEvent.keyCode === 9) {
                        // Insert tab at cursor position
                        this.insertTab();

                        // Prevent switching focus to next element
                        this.blockKeyEvent(keyEvent);
                    }
                },
                insertTab: function () { //Function to insert the tab char
                    if (window.getSelection) {
                        const sel = window.getSelection();

                        sel.modify("extend", "backward", "paragraphboundary"); //Alter bounds of selection

                        const pos = sel.anchorOffset; //Offset of caret in anchorNode (in the editor's case, this is the current Text node)

                        if (sel.anchorNode) {
                            sel.collapseToEnd();

                            const node = sel.anchorNode;

                            if (node instanceof HTMLElement) {
                                //Get text before and after caret
                                const preText = node.innerHTML.substring(0, pos);
                                const postText = node.innerHTML.substring(pos, node.innerHTML.length);

                                node.innerHTML = preText + "&emsp;" + postText; //Insert tab character
                            } else if (node instanceof Node) {
                                //Get text before and after caret
                                const preText = node.nodeValue.substring(0, pos);
                                const postText = node.nodeValue.substring(pos, node.nodeValue.length);

                                node.nodeValue = preText + "\u2003" + postText; //Insert tab character
                            }

                            sel.setPosition(node, pos + 1); //Move text caret forward
                        }
                    }
                },
                blockKeyEvent: function (keyEvent) {
                    if (keyEvent.preventDefault) {
                        keyEvent.preventDefault();
                    } else {
                        keyEvent.returnValue = false;
                    }
                }
            };

            function firefoxSpacingFix(elem) { //Fix for firefox adding a \n at the end of every text node, which makes the editor feel janky.
                elem.childNodes.forEach(element => {
                    if (element instanceof Text) {
                        element.nodeValue = element.nodeValue.replace(/\n/g, "");
                    }
                })
            }

            function makeEditorContainer() {
                var editor = document.createElement("div");

                editor.setAttribute("data-isblocklydeveditor", "true"); //Attribute to identify element as editor
                editor.contentEditable = true; //Allow editing of content

                //Styling
                editor.style.padding = "10px";
                editor.style.userSelect = "text";
                editor.style.cursor = "auto";
                editor.style.font = "12pt monospace";
                editor.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
                editor.style.color = "yellowgreen";
                editor.style.border = "2px solid white";
                editor.style.zIndex = "998";
                editor.style.borderRadius = "0.8rem";
                editor.style.width = "max-content";
                editor.style.backgroundColor = "rgb(0,0,30)";
                editor.style.overflowX = "hidden";
                editor.style.maxHeight = "100vh";
                editor.style.overflowY = "scroll";
                editor.style.caretColor = "white";

                //Disable spellcheck and autocomplete.
                editor.setAttribute("autocomplete", "false");
                editor.setAttribute("spellcheck", "false");

                //Prevent events from propagating to Blockly
                editor.addEventListener("pointerdown", (event) => {
                    event.stopPropagation();
                }, {
                    capture: true
                });
                editor.addEventListener("wheel", (event) => {
                    event.stopPropagation();
                }, {
                    capture: true
                });
                editor.addEventListener("scroll", (event) => {
                    event.stopPropagation();
                }, {
                    capture: true
                });
                editor.addEventListener("contextmenu", (event) => {
                    event.stopPropagation();
                }, {
                    capture: true
                });
                editor.addEventListener("keydown", (event) => {
                    TabManager.enableTab(event); //Fix for tab key

                }, {
                    capture: true
                });

                return editor;
            }

            var style = document.createElement("style");
            style.innerHTML = `
            /* Hide the ✏️ button on blocks that aren't top level */
            g.blocklyDraggable[data-id]:not(.blocklyInsertionMarker):not(g.blocklyBlockCanvas>g.blocklyDraggable[data-id]:not(.blocklyInsertionMarker)) [data-is-blocklydev-btn] {
                display: none !important;
            }

            /* Hide editor buttons on blocks that aren't top level */
            g.blocklyDraggable[data-id]:not(.blocklyInsertionMarker):not(g.blocklyBlockCanvas>g.blocklyDraggable[data-id]:not(.blocklyInsertionMarker)) [data-is-blocklydev-editor-btn] {
                display: none !important;
            }

            /* Hide the XML editor on blocks that aren't top level */
            g.blocklyDraggable[data-id]:not(.blocklyInsertionMarker):not(g.blocklyBlockCanvas>g.blocklyDraggable[data-id]:not(.blocklyInsertionMarker)) [data-isblocklydeveditor] {
                display: none !important;
            }

            /* Hide scrollbars on the XML editor */
            div[data-isblocklydeveditor]::-webkit-scrollbar {
                display: none;
            }
            div[data-isblocklydeveditor] {
                scrollbar-width: none;
            }
            `;
            document.head.appendChild(style);

            //CSS would normally be injected here.

            if (!getBlocklyWorkspace()) {
                return "Failed to find Blockly SvgWorkspace!";
            }

            function formatXml(xml, innerHTMLMode = false) { //Utility function to format XML, optionally outputting valid HTML
                var formatted = '', indent = '';
                var tab = '\t';
                xml.split(/>\s*</).forEach(function (node) {
                    if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
                    formatted += indent + '<' + node + '>\r\n';
                    if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab;
                });
                if (!innerHTMLMode) {
                    return formatted.substring(1, formatted.length - 3);
                } else {
                    return formatted.substring(1, formatted.length - 3)
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/\t/g, "&emsp;")
                        .replace(/\n/g, "<br>")
                        .replace(/ /g, "&nbsp;");
                }
            }
            function getBlocklyWorkspace() { //Get the svg workspace
                return document.querySelector("svg.blocklySvg>g.blocklyWorkspace");
            }
            function getBlocklyBlockCanvas() { //get the block canvas from the workspace
                return getBlocklyWorkspace().querySelector("g.blocklyBlockCanvas");
            }
            function getSvgPathFromBlock(blockElem) { //Get the svg path from an svg block
                if (isNewBlocklyBlock(blockElem)) {
                    return blockElem.querySelector("g.blocklyDraggable[data-id]:not(.blocklyInsertionMarker)>path.blocklyPath[d]");
                }
            }
            function isNewBlocklyBlock(node) { //Is node a block svg that has not yet been hooked.
                return node && node instanceof Element && node.tagName === "g" && node.classList.contains("blocklyDraggable") && !node.classList.contains("blocklyInsertionMarker") && node.hasAttribute("data-id") && !node.hasAttribute("data-blocklydev-hooked");
            }
            function makeXMLEditor(blockId, block) { //Make the XML editor for a blockId
                function getXmlFromBlockId(id, dom) { //Utility function to get the block's XML string from a Blockly serialised DOM.
                    for (const element of dom.children) {
                        if (element.tagName.toLowerCase() === "block" && element.getAttribute("id") === id) {
                            return element.outerHTML;
                        }
                    }
                }

                function getXmlFromVarId(id, dom) { //Utility function to get the block's XML string from a Blockly serialised DOM.
                    var variables = dom.querySelector("variables");
                    for (const element of variables.children) {
                        if (element.tagName.toLowerCase() === "variable" && element.getAttribute("id") === id) {
                            return element.outerHTML;
                        }
                    }
                }

                var originalXml = getXmlFromBlockId(blockId, dom); //Store the block's original, un-edited XML.


                var container = makeEditorContainer(); //Create the editor

                //Set the editor's contents to the formatted original XML.
                container.innerHTML = formatXml(originalXml, true);
                firefoxSpacingFix(container);

                var referencesVars = block.getVars(); //Array of variable ids referenced by block (directly)
                var editorVar = referencesVars[0]; //The variable to display
                var secondaryEditor = makeEditorContainer(); //Create secondary editor
                var originalVarXml = editorVar ? getXmlFromVarId(editorVar, dom) : null;

                secondaryEditor.innerHTML = originalVarXml ? formatXml(originalVarXml, true) : "";
                secondaryEditor.style.display = originalVarXml ? "block" : "none";
                firefoxSpacingFix(container);

                function update() { //Function called when the workspace updates
                    originalXml = getXmlFromBlockId(blockId, dom); //Update original XML
                    if (!originalXml) { //If it is now undefined, the block has been deleted or no longer exists, so remove listeners and exit.
                        workspace.removeChangeListener(update);
                        return;
                    }
                    referencesVars = block.getVars();
                    editorVar = referencesVars[0] || false;
                    originalVarXml = editorVar ? getXmlFromVarId(editorVar, dom) : null;
                    if (originalVarXml) {
                        secondaryEditor.innerHTML = formatXml(originalVarXml, true);
                        secondaryEditor.style.display = "block";
                        firefoxSpacingFix(container);
                    } else {
                        secondaryEditor.innerHTML = "";
                        secondaryEditor.style.display = "none";
                    }
                    container.innerHTML = formatXml(originalXml, true); //Update contents
                    firefoxSpacingFix(container);
                }

                workspace.addChangeListener(update); //Register change listener

                container.save = function () { //Function to save
                    var xmlStr = (Blockly.Xml.domToText || Blockly.utils.xml.domToText)(dom); //Convert the dom to string
                    if (!xmlStr.includes(originalXml)) { //If the domn does not contain the original block XML, it is impossible to save changes.
                        throw new Error("Workspace XML does not contain block!");
                    }
                    xmlStr = xmlStr.replace(originalXml, container.textContent); //Replace original XML with modified XML.
                    if (originalVarXml) {
                        xmlStr = xmlStr.replace(originalVarXml, secondaryEditor.textContent);
                    }
                    //xmlStr = xmlStr.replace(/\u2003/g, "").replace(/\n/g, "");
                    xmlStr = xmlStr.replace(/\u00A0/g, "\u0020"); //Replace any non-breaking spaces with normal ones.
                    var tempDom = (Blockly.Xml.textToDom || Blockly.utils.xml.textToDom)(xmlStr);
                    if (tempDom.querySelector("parsererror")) {
                        tempDom.querySelectorAll("parsererror").forEach(err => {
                            var display = document.createElement("div");
                            display.innerText = err.querySelector("div").innerText;
                            display.style.color = "red";
                            display.style.font = "12pt monospace";
                            display.style.backgroundColor = "rgb(0,0,20)";
                            display.style.border = "2px solid white";
                            display.style.borderRadius = "0.4rem";
                            display.style.width = "max-content";
                            display.style.padding = "8px";
                            display.style.cursor = "auto";
                            display.addEventListener("pointerdown", (event) => { event.stopPropagation(); }, { capture: true });
                            display.addEventListener("contextmenu", (event) => { event.stopPropagation(); }, { capture: true });
                            devWrapper.appendChild(display);
                            setTimeout(() => {
                                display.classList.add("blocklyDevtoolsFadeOut");
                                setTimeout(() => {
                                    display.remove();
                                }, 1000);
                            }, 3000);
                        });
                        return;
                    }
                    dom = tempDom; //Update the DOM variable.
                    workspace.clear(); //Clear the workspace
                    Blockly.Xml.domToWorkspace(dom, workspace); //Load the DOM
                    if (workspace.getToolbox() //If the blockly instance has a toolbox, it needs to be refreshed,
                    ) {
                        workspace.getToolbox().refreshSelection();
                    }
                }

                return [container, secondaryEditor];
            }
            function processBlock(element) { //Function to hook block svg element
                if (isNewBlocklyBlock(element)) { //Check if we have not already hooked it
                    var blockId = element.getAttribute("data-id"); //Get the id
                    var internalBlock = workspace.getBlockById(blockId); //Get the internal block object
                    if (!internalBlock) {
                        return;
                    }
                    internalBlock.tooltip ||= internalBlock.type || "unknown"; //If the block does not have a tooltip, set it to it's opcode.
                    const devWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject'); //Create a foreignObject element to allow HTML inside of SVG.
                    const btnWrapper = document.createElement("div"); //Wrapper for buttons to keep them on the same row

                    btnWrapper.style.cursor = "auto"; //Fix for cursor being the grab hand
                    btnWrapper.style.width = "max-content";

                    const btn = document.createElement("span"); //Create the edit button
                    btn.style.cursor = "pointer";
                    btn.style.zIndex = "999";
                    btn.style.lineHeight = "1rem";
                    btn.setAttribute("data-is-blocklydev-btn", "true");
                    btn.innerText = "✏️"; //📝✏️

                    const save = document.createElement("span"); //Create the save button
                    save.style.cursor = "pointer";
                    save.style.zIndex = "999";
                    save.setAttribute("data-is-blocklydev-editor-btn", "true");
                    save.style.display = "none";
                    save.innerText = "💾";
                    save.style.lineHeight = "1rem";

                    const collapse = document.createElement("span"); //Create the collapse/uncollapse button
                    collapse.style.cursor = "pointer";
                    collapse.style.zIndex = "999";
                    collapse.setAttribute("data-is-blocklydev-editor-btn", "true");
                    collapse.style.display = "none";
                    collapse.innerText = "⬆️";
                    collapse.style.lineHeight = "1rem";

                    const bin = document.createElement("span"); //Create the force delete button
                    bin.style.cursor = "pointer";
                    bin.style.zIndex = "999";
                    bin.setAttribute("data-is-blocklydev-btn", "true");
                    bin.innerText = "🗑️";
                    bin.style.lineHeight = "1rem";

                    //Get the block's hull and calculate bounding box. Used to calculate where to position elements.
                    const path = getSvgPathFromBlock(element);
                    var bbox = path.getBBox();

                    //Attributes and styles for the foreignObject
                    //Width and height are 1 instead of 0 because firefox is won't render the element if it doesn't have a positive size.
                    devWrapper.setAttributeNS(null, "width", 1);
                    devWrapper.setAttributeNS(null, "height", 1);

                    devWrapper.style.overflow = "visible";
                    devWrapper.style.userSelect = "none";

                    devWrapper.setAttributeNS(null, "class", "blocklyText");
                    devWrapper.setAttributeNS(null, "y", "0");
                    devWrapper.setAttributeNS(null, "text-anchor", "middle");
                    devWrapper.setAttributeNS(null, "dominant-baseline", "middle");
                    devWrapper.setAttributeNS(null, "dy", "0");
                    devWrapper.setAttributeNS(null, "x", bbox.width);
                    devWrapper.setAttributeNS(null, "transform", `translate(0, 0) `);

                    //Add buttons to button wrapper
                    btnWrapper.appendChild(btn);
                    btnWrapper.appendChild(save);
                    btnWrapper.appendChild(collapse);
                    btnWrapper.appendChild(bin);

                    //Add button wrapper to foreignObject
                    devWrapper.appendChild(btnWrapper);

                    //Add foreignObject to block SVG
                    element.appendChild(devWrapper);

                    //The block has been hooked
                    element.setAttribute("data-blocklydev-hooked", "true");

                    //Stop events reaching Blockly
                    btnWrapper.addEventListener("pointerdown", (event) => {
                        event.stopPropagation();
                    });

                    //Edit button handler.
                    btn.addEventListener("pointerdown", (event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        if (element.hasAttribute("data-id")) {
                            blockId = element.getAttribute("data-id");
                            if (devWrapper.querySelector("div[data-isblocklydeveditor]")) { //If the editor exists, remove it.
                                devWrapper.querySelectorAll("div[data-isblocklydeveditor]").forEach(element => {
                                    element.remove();
                                });
                                save.style.display = "none";
                                collapse.style.display = "none";
                            } else {
                                //Add editor if it does not exist.
                                internalBlock = workspace.getBlockById(blockId);
                                makeXMLEditor(blockId, internalBlock).forEach(editorSegment => {
                                    devWrapper.appendChild(editorSegment);
                                });

                                save.style.display = "initial";
                                if (internalBlock.nextConnection || internalBlock.previousConnection) {
                                    collapse.style.display = "initial";
                                }
                            }
                        }
                    }, {
                        capture: true
                    });

                    collapse.addEventListener("pointerdown", (event) => { //Handler for collapse button
                        event.stopPropagation();
                        event.preventDefault();
                        if (element.hasAttribute("data-id")) {
                            blockId = element.getAttribute("data-id");
                            internalBlock = workspace.getBlockById(blockId);

                            internalBlock.setCollapsed(!internalBlock.isCollapsed()); //Toggle collapsed for the current block

                            var collapsed = internalBlock.isCollapsed(); //Store collapsed as variable for efficiency

                            //Loop through all sub-blocks and set collapsed to match.
                            var blocks = element.querySelectorAll("g.blocklyDraggable[data-id]:not(.blocklyInsertionMarker)");
                            for (let i = 0; i < blocks.length; i++) {
                                const b = blocks[i];
                                var bId = b.getAttribute("data-id");
                                workspace.getBlockById(bId).setCollapsed(collapsed);
                            }
                            if (collapsed) { //Change button
                                collapse.innerText = "⬇️";
                            } else {
                                collapse.innerText = "⬆️";
                            }
                        }
                    }, {
                        capture: true
                    });

                    save.addEventListener("pointerdown", (event) => { //Save button handler
                        event.stopPropagation();
                        event.preventDefault();
                        if (element.hasAttribute("data-id") && devWrapper.querySelector("div[data-isblocklydeveditor]")) {
                            devWrapper.querySelector("div[data-isblocklydeveditor]").save(); //Delegate saving to the editor
                        }
                    }, {
                        capture: true
                    });

                    bin.addEventListener("pointerdown", (event) => { //Force delete handler
                        event.stopPropagation();
                        event.preventDefault();
                        if (element.hasAttribute("data-id")) {
                            blockId = element.getAttribute("data-id");
                            var block = workspace.getBlockById(blockId);
                            block.getDescendants(false, true).forEach((block) => {
                                block.dispose(true); //Healing the stack is a good idea, previously I was not doing this and it was corrupting everything yay :]
                            });
                            if (workspace.getToolbox() //If the blockly instance has a toolbox, it needs to be refreshed,
                            ) {
                                workspace.getToolbox().refreshSelection();
                            }
                        }
                    }, {
                        capture: true
                    });

                    var updateObserver = new MutationObserver(function () { //When this block updates
                        blockId = element.getAttribute("data-id");
                        bbox = path.getBBox();

                        devWrapper.setAttributeNS(null, "class", "blocklyText");
                        devWrapper.setAttributeNS(null, "y", "0");
                        devWrapper.setAttributeNS(null, "text-anchor", "middle");
                        devWrapper.setAttributeNS(null, "dominant-baseline", "middle");
                        devWrapper.setAttributeNS(null, "dy", "0");
                        devWrapper.setAttributeNS(null, "x", bbox.width);
                        devWrapper.setAttributeNS(null, "transform", `translate(0, 0) `);

                        updateObserver.disconnect();
                        element.appendChild(devWrapper); //Move element to be last, to allow displaying on top of other blocks connected underneath. (When an element is already appended, appendChild() moves rather than appends)
                        updateObserver.observe(element, observerConfig);
                    });
                    updateObserver.observe(element, observerConfig); //Initialise observer
                }
            }
            var observer = new MutationObserver(mutationHandler);

            function mutationHandler(mutationRecords) { //Handler that tries to process all blocks every time the block canvas changes.
                mutationRecords.forEach(function (mutation) {
                    mutation.addedNodes.forEach(function (node) {
                        processBlock(node);
                    });
                });
            }

            //Initial block processing (script runs too early in this case)
            var blocks = getBlocklyBlockCanvas().children;
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                processBlock(block);
            }

            //Observe canvas
            observer.observe(getBlocklyBlockCanvas(), observerConfig);
            return "Blockly dev tools ran successfully.";
        }
        if (localStorage.getItem("blocklydevtools") === "true") {
            blocklyDeveloperTools();
        }
    }
}
