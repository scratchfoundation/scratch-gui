/* eslint-disable */

/*!
 * GPL 3.0
 * https://github.com/griffpatch/Scratch3-Dev-Tools
 * Is what we're doing here technically a GPL violation? Perhaps, but griffpatch seems fine with including
 * his dev tools inside TW, so it shouldn't be an issue.
 */

import addStyle from './lib/addStyle';
addStyle(`
#s3devToolBar {
    display: flex;
    white-space: nowrap;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.s3devLabel {
    display: flex;
    padding-right: 2em;
}

.s3devLabel>span:first-child {
    margin-left: 1.5em;
    margin-right: 1em;
    font-weight: bold;
    font-size: 0.625rem;
    user-select: none;
    cursor: default;
    white-space: nowrap;
    padding-top: 2px;
}

.s3devAction {
    transition: opacity 200ms ease-in;
    /*font-weight: bold;*/
    opacity: 0;
}

.s3devLabel:hover .s3devAction {
    opacity: 0.7;
}

/* Wrapper around find button and drop down */
.s3devWrap {
    overflow: visible;
    /*margin-left:3em;*/
    position: relative;
}

#s3devFind {
    height: 2rem;
}

/* Find Input Box */
input.s3devInp {
    background: rgba(255, 255, 255, 0.5);
    border-radius: calc(0.5rem / 2);
    font-size: .75rem;;
    font-weight: bold;
    padding: 0.4em;
    z-index: 2;
    position: relative;

    border: 1px solid hsla(0, 0%, 0%, 0.15);
    /*height: 30px;*/
    /*bottom: 5px;*/

    min-width: 100%;
    box-sizing: border-box !important;
}

.s3devInp:hover {
    background-color: white;
}

.s3devInp:focus {
    border-color: hsla(215, 100%, 65%, 1);
    /*-webkit-box-shadow: 0 0 0 0.25rem hsla(215, 100%, 65%, 0.35);*/
    /*box-shadow: 0 0 0 0.25rem hsla(215, 100%, 65%, 0.35);*/
    outline: none;
}

/* Drop down from find button */
#s3devDDOut {
    top:-6px;
}

/* Drop down from find button */
div.s3devDDOut {
    z-index: 100;
    left:0;
    width: 16em;
    position: relative;
    /*padding: 2.2em 0 0;*/
    /*background-color: white;*/
    padding: 4px;
}

/* Drop down from find button */
ul.s3devDD {
    display: none;
    position: relative;
    padding: 0.2em 0;
    font-size: 0.75rem;
    line-height: 1;
    overflow-y: auto;
    min-height: 128px;
    max-height: 65vh;
    user-select: none;
    max-width: 100%;
}

div.s3devDDOut.vis {
    /*box-shadow: 0 2px 3px rgba(0,0,0,0.3), 0 5px 8px rgba(0,0,0,0.2);*/
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, .3);
    background-color: white;
    border: none;
    border-radius: 4px;
}

div.s3devDDOut.vis ul.s3devDD {
    display: block;
    border: none;
}

/* Drop down items */
.s3devDD>li {
    display: block;
    padding: 0.5em 0.3em;
    white-space: nowrap;
    margin: 0;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
}

.s3devDD>li>b {
    background-color: #aaffaa;
    color: black;
}

/* Drop down items */
.s3devDD>li:hover, .s3devDD>li.sel {
    color: white;
    cursor: pointer;
}

#s3devDD>li::before {
    content: "\\25CF "; /* ● */
}

.define {                                           color: rgb(255, 102, 128);}
.define:hover, .define.sel {                        background-color: rgb(255, 102, 128);}

.flag {                                             color: #4CBF56;}
.flag:hover, .flag.sel {                            background-color: #4CBF56;}

.receive {                                          color: rgb(255, 191, 0);}
.receive:hover, .receive.sel {                      background-color: rgb(255, 191, 0);}

.event {                                            background-color: rgb(255, 213, 0); color: rgb(255, 191, 0);}
.event:hover, .event.sel {                          background-color: rgb(255, 191, 0);}

.var, .VAR {                                        color: rgb(255, 120, 26);}
.var:hover, .var.sel, .VAR:hover, .VAR.sel {        background-color: rgb(255, 120, 26);}

.list, .LIST {                                      color: rgb(255, 102, 26);}
.list:hover, .list.sel, .LIST:hover, .LIST.sel {    background-color: rgb(255, 102, 26);}

.costume {                                          color: rgb(26, 66, 255);}
.costume:hover, .costume.sel {                      background-color: rgb(26, 66, 255);}

.operators {                                        background-color: rgb(64, 191, 74); color: rgb(56, 148, 56);}
.operators:hover, .operators.sel {                  background-color: rgb(56, 148, 56);}

.data {                                             background-color: rgb(255, 140, 26); color: rgb(219, 110, 0);}
.data:hover, .data.sel {                            background-color: rgb(219, 110, 0); }

.data-lists {                                       background-color: rgb(255, 102, 26); color: rgb(255, 102, 26);}
.data-lists:hover, .data-lists.sel {                background-color: rgb(255, 102, 26); }

.sensing {                                          background-color: rgb(76, 191, 230); color: rgb(46, 142, 184);}
.sensing:hover, .sensing.sel {                      background-color: rgb(46, 142, 184);}

.looks {                                            background-color: rgb(153, 102, 255); color: rgb(119, 77, 203);}
.looks:hover, .looks.sel {                          background-color: rgb(119, 77, 203);}

.sounds {                                           background-color: rgb(214, 92, 214); color: rgb(189, 66, 189);}
.sounds:hover, .sounds.sel {                        background-color: rgb(189, 66, 189);}

.motion {                                           background-color: rgb(76, 151, 255); color: rgb(51, 115, 204);}
.motion:hover, .motion.sel {                        background-color: rgb(51, 115, 204);}

.events  {                                          background-color: rgb(255, 213, 0); color: rgb(204, 153, 0);}
.events:hover, .events.sel {                      background-color: rgb(204, 153, 0);}

.control {                                          background-color: rgb(255, 171, 25); color: rgb(207, 139, 23);}
.control:hover, .control.sel {                      background-color: rgb(207, 139, 23);}

.null {                                             background-color: rgb(255, 102, 128); color: rgb(255, 77, 106);}
.null:hover, .null.sel {                            background-color: rgb(255, 77, 106);}

/*.s3devDD>li.hat::before {                           content: '◠ ';}*/
/*.s3devDD>li.hat::before {                           content: '▲ ';}*/
/*.s3devDD>li.block::before {                         content: '■ ';}*/
/*.s3devDD>li.reporter::before {                      content: '● ';}*/
/*.s3devDD>li.boolean::before {                       content: '◆ ';}*/

#s3devIDD>li {                                      height: 19px; padding: 3px 8px; margin: 2px 0.3em; box-sizing: border-box;
                                                    position: relative; color: white; font-weight: bold; width: min-content; }

.s3devDD>li.hat {                                   border-radius: 14px 14px 3px 3px; }
.s3devDD>li.block {                                 border-radius: 3px; }
.s3devDD>li.reporter {                              border-radius: 10px; }

.s3devDD>li.boolean {                               width: min-content; }
.s3devDD>li.boolean::before {                       content: ""; position: absolute; left:0; top:0; width:0; height:0;
                                                    border-right: 9px solid transparent; border-top: 9px solid white; border-bottom: 10px solid white; }
.s3devDD>li.boolean::after {                        content: ""; position: absolute; right:0; top:0; width:0; height:0;
                                                    border-left: 9px solid transparent; border-top: 9px solid white; border-bottom: 10px solid white; }

#s3devOverlay {
    position:fixed;
    top:0;left:0;
    right:0;bottom:0;
    background-color: rgba(80,80,80,0.5);
    z-index: 9999;
    padding:10em;
    color:white;
    font-weight: bold;
}

.s3devMulti {
    font-weight: normal;
    position: absolute;
    right: 0;
    white-space: nowrap;
    background-color: inherit;
    z-index: 1;
    padding: 0;
}

.s3devNav {
    padding: 0 6px;
}

.s3devNav:hover {
    color: #ffff80;
}

#s3devDeep {
    /*display: none;*/
}

.s3devAction {
    margin-left: 2em;
    font-size: 12px;
    font-weight: bold;
    line-height: 2;
}

@media screen and (max-width: 1180px) {
    .s3devAction {
        display: none;
    }
}

.s3devHide {
    display: none;
}

.s3dev-mi:hover {
    background-color: #D6E9F8;
}

#s3devHelpPop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(64,64,64,0.3);
    z-index: 1000000;
}

#s3devHelpPop > div {
    box-sizing: border-box;
    position: relative;
    width: 800px;
    max-height: 800px;
    max-width: 85%;
    top: 20vh;
    height: 60vh;
    overflow-y: auto;
    background-color: white;
    box-shadow: 0 4px 16px 2px rgba(0,0,0, 0.4);
    margin-left: auto;
    margin-right: auto;
    padding: 1em 2em 4em;
}

#s3devFloatingBar {
    display: flex;
    white-space: nowrap;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

    position: absolute;
    min-width: 128px;
    background-color: white;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 0 3px, rgba(0, 0, 0, 0.2) 0 3px 10px;

    z-index: 1000001;
}

#s3devInsertLabel {
    padding: 0;
    align-items: center;
}

#s3devIInp {
    border: 0;
}

/* Drop down from find button */
ul#s3devIDD {
    max-height: 200px;
    margin-bottom: 0;
}

#s3devIDD>li>b {
    background-color: rgba(0,0,0,0.6);
    color: white;
}
`);

// console.log('Griffpatch Scratch Developer Tools Extension Handler');

export default async function () {

    const helpHTML = `
<div id="s3devHelpPop">
<div>
<h1><strong>Scratch 3 Developer Tools</strong></h1>
<p>Version 0.2.4 - Released 4 July 2020 &ndash; by <a target="_blank" href="https://www.youtube.com/user/griffpatch">Griffpatch</a></p>
<hr />
<h2><strong>Changes in 0.2.3 - 0.2.4</strong></h2>
<p><strong>Ctrl + Space or Middle Click</strong> &ndash; Experimental Feature - This pops up a floating input box where you can type the name of a block (or parts of it) and drag the block into the code to make use of it right there.</p>
<p><strong>Fixes</strong> &ndash; Fix for input box not appearing on project load. Fix for pressing Ctrl+Left or Right while trying to enter text.</p>
<hr />
<h2><strong>Code Tab Features</strong></h2>
<p><strong>Interactive Find Bar (Ctrl + F)</strong> - Quickly find and jump to any Custom Block, Variable, Event, or Hat block defined in a sprite by clicking on the new find bar located to the right of the Code, Costumes and Sound tabs.&nbsp; Begin typing to filter down the list. Use the up and down arrow keys to switch between the possible entries, and the left and right arrows to cycle between al found instances of that block.</p>
<p><strong>Improved Code Tidy Up</strong> &ndash; Right click on the scripts window to pop up the menu and the clean up blocks option will have been replaced by a Clean Up Blocks (+) option. Se this to tidy your scripts and it will preserve your scripts columns as well as attempt to align the comments and remove all those orphaned variables, etc. You'll like this a lot I guarantee!</p>
<p><strong>Copy to Clipboard</strong> &ndash; Right click a block and 3 new options are available to Copy All, Copy Block, and Cut Block.&nbsp; The Copy All will copy to the clipboard everything including and below the block you clicked on.&nbsp; Copy block will only copy the current block and its contents, but nothing below.&nbsp; And cut block will copy it and remove it from the workspace.</p>
<p><strong>Paste from Clipboard</strong> &ndash; Pastes from the clipboard, but importantly pastes it where your mouse cursor is so you can then place it (rather than placing it where you copied it from like the current scratch implementation).</p>
<p><strong>Swap Variable in Sprite</strong> &ndash; Right click a variable in your scripts for this new option. It allows you to switch all references to this variable in the current sprite all in one go to another variable. This is great for when you made a mistake and want to switch from one variable to another or need to change from a 'for all sprites' to a 'for this sprite only'. This option will not remove the old variable and will not affect any other sprites variables.</p>
<p><strong>Middle Click</strong> &ndash; Using the middle mouse button on a variable or custom block allows you to jump to its definition or open it in the interactive find bar.</p>
<p><strong>Ctrl + Left, Ctrl + Right</strong> &ndash; Navigate to previous / next visited position in the script window (after using the navigate to block or find bar). This allows you to middle click a custom block to go to its definition, then press ctrl + Left to go back to where you were before.</p>
<p><strong>Ctrl + Space, Middle Click</strong> &ndash; Experimental Feature - This pops up a floating input box where you can type the name of a block (or parts of it) and drag the block into the code to make use of it right there.</p>
<hr />
<h2><strong>Costumes Tab Features</strong></h2>
<p><strong>Find Bar</strong> &ndash; Click to list all costumes by name, and type to locate one. Use the arrow keys or mouse to click a name to just straight to that costume.</p>
<p><strong>Ctrl + Left, Ctrl + Right</strong> &ndash; These keys navigate you to the previous / next costume in the sprite.</p>
<p><strong>Send to Top, Send to Bottom</strong> &ndash; Right click a costume and 2 new menu items are present. These can be used to send the clicked sprite to the top or bottom of the list of costumes for fast re-ordering.</p>
<hr />
<h2><strong>Other Features</strong></h2>
<p><strong>Share</strong> &ndash; I have added an 'are you sure?' check to the sharing of projects - Yep I've done that a number of times by mistake - lol</p>
<hr />
<p>Youtube tutorials -&nbsp;<a target="_blank" href="https://www.youtube.com/user/griffpatch">https://www.youtube.com/user/griffpatch</a></p>
</div>
</div>
`

    const NavHist = function() {
        this.views = [];
        this.forward = [];

        function distance(pos, next) {
            return Math.sqrt(Math.pow(pos.left - next.left, 2) + Math.pow( pos.top - next.top, 2));
        }

        /**
         * Keep a record of the scroll and zoom position
         */
        this.storeView = function(next, dist) {
            this.forward = [];
            let wksp = getWorkspace(),
                s = wksp.getMetrics();


            let pos = {left:s.viewLeft, top:s.viewTop};
            if (!next || distance(pos, next) > dist) {
                this.views.push(pos);
            }
        }

        this.peek = function() {
            return this.views.length > 0 ? this.views[this.views.length - 1] : null;
        }

        this.goBack = function() {
            let wksp = getWorkspace(),
                s = wksp.getMetrics();

            let pos = {left:s.viewLeft, top:s.viewTop};
            let view = this.peek();
            if (!view) {
                return;
            }
            if (distance(pos, view) < 64) {  // Go back to current if we are already far away from it
                if (this.views.length > 1) {
                    this.views.pop();
                    this.forward.push(view);
                }
            }

            view = this.peek();
            if (!view) {
                return;
            }

            let sx = view.left - s.contentLeft,
                sy = view.top - s.contentTop;

            // transform.setTranslate(-600,0);

            wksp.scrollbar.set(sx, sy);

/*
            let blocklySvg = document.getElementsByClassName('blocklySvg')[0];
            let blocklyBlockCanvas = blocklySvg.getElementsByClassName('blocklyBlockCanvas')[0];
            let transform = blocklyBlockCanvas.transform.baseVal.getItem(0);
            let scale = blocklyBlockCanvas.transform.baseVal.getItem(1);

            let transformMatrix = transform.matrix;
            let scaleMatrix = scale.matrix;

            console.log('Transform - getMetrics', s);
            console.log('sx, sy: ', sx, sy);
            console.log('left, top: ', view.left, view.top);
            console.log('contentLeft, right:', s.contentLeft, s.contentTop);
            console.log('transform, scale matrix: ', transformMatrix, scaleMatrix);
*/
        }

        this.goForward = function() {
            let view = this.forward.pop();
            if (!view) {
                return;
            }
            this.views.push(view);

            let wksp = getWorkspace(),
                s = wksp.getMetrics();

            let sx = view.left - s.contentLeft,
                sy = view.top - s.contentTop;

            wksp.scrollbar.set(sx, sy);
        }
    }

    let find, findInp, ddOut, dd, wksp, offsetX = 32, offsetY = 32,
        codeTab, costTab, costTabBody, selVarID,
        floatInp, blockCursor,
        navHist = new NavHist(),
        canShare = false,
        events = [];

    let mouseXY = {x:0, y:0};

    function bindOnce(dom, event, func, capture) {
        capture = !!capture;
        dom.removeEventListener(event, func, capture);
        dom.addEventListener(event, func, capture);
        events.push({dom:dom, event:event, func:func, capture:capture});
    }

    function unbindAllEvents() {
        console.log('Unbinding Events - gui has become dirty');
        for (const event of events) {
            event.dom.removeEventListener(event.event, event.func, event.capture);
        }
        events = [];
    }

    function isScriptEditor() {
        return codeTab.className.indexOf("gui_is-selected") >= 0;
    }

    function isCostumeEditor() {
        return costTab.className.indexOf("gui_is-selected") >= 0;
    }

    function eventClickHelp(e) {
        if (!document.getElementById('s3devHelpPop')) {
            document.body.insertAdjacentHTML('beforeend', helpHTML);
            document.getElementById('s3devHelpPop').addEventListener('mousedown', function(e) {
                if (e.target.id === 's3devHelpPop') {
                    e.target.remove();
                }
            });
        }
        e.preventDefault();
    }

    /**
     *
     * @returns Blockly.Workspace
     */
    function getWorkspace() {
        let wksp2 = Blockly.getMainWorkspace();
        if (wksp2.getToolbox()) {
            // Sadly get get workspace does not always return the 'real' workspace... Not sure how to get that at the moment,
            //  but we can work out whether it's the right one by whether it hsa a toolbox.
            wksp = wksp2;
        }
        return wksp;
    }

    function getScratchCostumes() {
        let costumes = costTabBody.querySelectorAll("div[class^='sprite-selector-item_sprite-name']");
        // costTab[0].click();

        let myBlocks = [];
        let myBlocksByProcCode = {};

        /**
         * @param cls
         * @param txt
         * @param root
         * @returns {{clones: null, procCode: *, labelID: *, lower: *, y: number, cls: *}|*}
         */
        function addBlock(cls, txt, root) {
            let id = root.className;
            let items = {cls: cls, procCode: txt, labelID: id, y: 0, lower: txt.toLowerCase(), clones:null};
            // items.y = root.getRelativeToSurfaceXY ? root.getRelativeToSurfaceXY().y : null;
            myBlocks.push(items);
            myBlocksByProcCode[txt] = items;
            return items;
        }

        let i = 0;
        for (const costume of costumes) {
            addBlock('costume', costume.innerText, costume).y = i;
            i++;
        }

        return {procs:myBlocks};
    }

    /**
     * Fetch the scratch 3 block list
     * @returns jsonFetch object
     */
    function getScratchBlocks() {

        // Access Blockly!

        let myBlocks = [];
        let myBlocksByProcCode = {};

        // todo - get blockyly from an svg???
        
        let wksp = getWorkspace();
        let topBlocks = wksp.getTopBlocks();
        // console.log(topBlocks);

        /**
         * @param cls
         * @param txt
         * @param root
         * @returns {{clones: null, procCode: *, labelID: *, lower: *, y: number, cls: *}|*}
         */
        function addBlock(cls, txt, root) {
            let id = root.id ? root.id : root.getId ? root.getId() : null;
            let clone = myBlocksByProcCode[txt];
            if (clone) {
                if (!clone.clones) {
                    clone.clones = [];
                }
                clone.clones.push(id);
                return clone;
            }
            let items = {cls: cls, procCode: txt, labelID: id, y: 0, lower: txt.toLowerCase(), clones:null};
            items.y = root.getRelativeToSurfaceXY ? root.getRelativeToSurfaceXY().y : null;
            myBlocks.push(items);
            myBlocksByProcCode[txt] = items;
            return items;
        }

        function getDescFromField(root) {
            let fields = root.inputList[0];
            let desc;
            for (const fieldRow of fields.fieldRow) {
                desc = (desc ? desc + ' ' : '') + fieldRow.getText();
            }
            return desc;
        }

        for (const root of topBlocks) {
            if (root.type === "procedures_definition") {
                let fields = root.inputList[0];
                let typeDesc = fields.fieldRow[0].getText();
                let label = root.getChildren()[0];
                let procCode = label.getProcCode();
                if (!procCode) {
                    continue;
                }
                addBlock('define', typeDesc + ' ' + procCode, root);
                continue;
            }

            if (root.type === "event_whenflagclicked") {
                addBlock('flag', getDescFromField(root), root);   // "When Flag Clicked"
                continue;
            }

            if (root.type === "event_whenbroadcastreceived") {
                try {   // let wksp2 = Blockly.getMainWorkspace().getTopBlocks()[2].inputList[0].fieldRow[1];
                    let fields = root.inputList[0];
                    let typeDesc = fields.fieldRow[0].getText();
                    let eventName = fields.fieldRow[1].getText();
                    addBlock('receive', typeDesc + ' ' + eventName, root).eventName = eventName;
                } catch (e) {
                    // eat
                }
                continue;
            }

            if (root.type.substr(0, 10) === 'event_when') {
                addBlock('event', getDescFromField(root), root);   // "When Flag Clicked"
                continue;
            }

            if (root.type === 'control_start_as_clone') {
                addBlock('event', getDescFromField(root), root);   // "when I start as a clone"
                continue;
            }

        }

        let map = wksp.getVariableMap();
        
        let vars = map.getVariablesOfType('');
        for (const row of vars) {
            addBlock((row.isLocal ? "var" : "VAR"), (row.isLocal ? "var " : "VAR ") + row.name, row);
        }
        
        let lists = map.getVariablesOfType('list');
        for (const row of lists) {
            addBlock((row.isLocal ? "list" : "LIST"), (row.isLocal ? "list " : "LIST ") + row.name, row);
        }

        const clsOrder = {flag:0, receive:1, event:2, define:3, var:4, VAR:5, list:6, LIST:7};
        
        myBlocks.sort(function (a, b) {
            let t = clsOrder[a.cls] - clsOrder[b.cls];
            if (t !== 0) {
                return t;
            }
            if (a.lower < b.lower) {
                return -1;
            }
            if (a.lower > b.lower) {
                return 1;
            }
            return a.y - b.y;
        });
        
        return {procs:myBlocks};
    }

    let rhdd = 0;
    let rhdd2 = 0;

    function showDropDown(e, focusID, instanceBlock) {
        clearTimeout(rhdd);
        rhdd = 0;

        if (!focusID && ddOut.classList.contains('vis')) {
            return;
        }
        
        // special '' vs null... - null forces a reevaluation
        prevVal = focusID ? '' : null;   // Clear the previous value of the input search
        
        ddOut.classList.add('vis');
        let scratchBlocks;
        if (isCostumeEditor()) {
            scratchBlocks = getScratchCostumes();
        } else {
            scratchBlocks = getScratchBlocks();
        }

        dom_removeChildren(dd);

        let foundLi = null;
        let procs = scratchBlocks.procs;
        for (const proc of procs) {
            let li = document.createElement("li");
            li.innerText = proc.procCode;
            li.data = proc;
            li.className = proc.cls;
            if (focusID) {
                if (proc.labelID === focusID) {
                    foundLi = li;
                    li.classList.add("sel");
                } else {
                    li.style.display = 'none';
                }
            }
            dd.appendChild(li);
        }

        let label = document.getElementById('s3devFindLabel');
        offsetX = ddOut.getBoundingClientRect().right - label.getBoundingClientRect().left + 26;
        offsetY = 32;

        if (foundLi) {
            clickDropDownRow(foundLi, wksp, instanceBlock);
        }
    }
    
    function hideDropDown() {
        clearTimeout(rhdd);
        rhdd = setTimeout(reallyHideDropDown, 250);
    }
    
    function reallyHideDropDown() {
        
        // Check focus of find box
        if (findInp === document.activeElement) {
            hideDropDown();
            return;
        }

        // document.getElementById('s3devReplace').classList.add('s3devHide');

        ddOut.classList.remove('vis');
        rhdd = 0;
    }

    function hideFloatDropDown() {
        clearTimeout(rhdd2);
        rhdd2 = setTimeout(reallyHideFloatDropDown, 50);
    }

    function reallyHideFloatDropDown(force) {

        // Check focus of find box
        if (!force && floatInp === document.activeElement) {
            hideFloatDropDown();
            return;
        }

        let float = document.getElementById('s3devFloatingBar');
        if (float) {
            float.remove();
        }
        floatInp = null;
        rhdd2 = 0;
    }

    function dom_removeChildren(myNode) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    /**
     * A nicely ordered version of the top blocks
     * @returns {[]}
     */
    function getTopBlocks() {
        let result = getOrderedTopBlockColumns();
        let columns = result.cols;
        let topBlocks = [];
        for (const col of columns) {
            topBlocks = topBlocks.concat(col.blocks);
        }
        return topBlocks;
    }

    function hidePopups(wksp) {
        // Fire fake mouse events to trick the popup into hiding.
        const element = wksp.getToolbox().HtmlDiv;
        element.dispatchEvent(new MouseEvent("mousedown", { relatedTarget: element, bubbles: true }));
        element.dispatchEvent(new MouseEvent("mouseup", { relatedTarget: element, bubbles: true }));
    }

    function genuid() {
        const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%()*+,-./:;=?@[]^_`{|}~";
        let result = "";
        for (let i = 0; i < 20; i++) {
            result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
        return result;
    }

    function startUndoGroup(wksp) {
        const undoStack = wksp.undoStack_;
        if (undoStack.length) {
            undoStack[undoStack.length - 1]._devtoolsLastUndo = true;
        }
    }

    function endUndoGroup(wksp) {
        const undoStack = wksp.undoStack_;
        // Events (responsible for undoStack updates) are delayed with a setTimeout(f, 0)
        // https://github.com/LLK/scratch-blocks/blob/f159a1779e5391b502d374fb2fdd0cb5ca43d6a2/core/events.js#L182
        setTimeout(() => {
            const group = genuid();
            for (let i = undoStack.length - 1; i >= 0 && !undoStack[i]._devtoolsLastUndo; i--) {
                undoStack[i].group = group;
            }
        }, 0);
    }

    /**
     * A much nicer way of laying out the blocks into columns
     */
    function doCleanUp(e) {
        if (e) {
            e.cancelBubble = true;
            e.preventDefault();
            let wksp = getWorkspace();
            hidePopups(wksp);
            setTimeout(doCleanUp, 0);
            return;
        }

        startUndoGroup(wksp);

        let result = getOrderedTopBlockColumns(true);
        let columns = result.cols;
        let orphanCount = result.orphans.blocks.length;
        if (orphanCount > 0) {
            let message = 'Griffpatch: I found ' + orphanCount;
            message += orphanCount === 1 ? ' orphaned reporter block. Shall I delete it for you?' :
                ' orphaned reporter blocks. Shall I delete it for you?';
            if (confirm(message)) {
                for (const block of result.orphans.blocks) {
                    block.dispose();
                }
            } else {
                columns.unshift(result.orphans);
            }
        }

        let cursorX = 48;

        let maxWidths = result.maxWidths;

        for (const column of columns) {
            let cursorY = 64;
            let maxWidth = 0;
            
            for (const block of column.blocks) {
                let xy = block.getRelativeToSurfaceXY();
                if (cursorX - xy.x !== 0 || cursorY - xy.y !== 0) {
                    block.moveBy(cursorX - xy.x, cursorY - xy.y);
                }
                let heightWidth = block.getHeightWidth();
                cursorY += heightWidth.height + 72;

                let maxWidthWithComments = maxWidths[block.id] || 0;
                maxWidth = Math.max(maxWidth, Math.max(heightWidth.width, maxWidthWithComments));
            }
            
            cursorX += maxWidth + 96;
        }

        let topComments = wksp.getTopComments();
        for (const comment of topComments) {
            if (comment.setVisible) {
                comment.setVisible(false);
                comment.needsAutoPositioning_ = true;
                comment.setVisible(true);
            }
        }

        setTimeout(function () {
            // Locate unused local variables...
            let workspace = getWorkspace();
            let map = workspace.getVariableMap();
            let vars = map.getVariablesOfType('');

            let unusedLocals = [];

            for (const row of vars) {
                if (row.isLocal) {
                    let usages = map.getVariableUsesById(row.getId());
                    if (!usages || usages.length === 0) {
                        unusedLocals.push(row);
                    }
                }
            }

            if (unusedLocals.length > 0) {
                let message = 'Griffpatch: I found ' + unusedLocals.length;
                message += unusedLocals.length === 1 ? ' unused local variable. Shall I delete it for you?\nHere it is: ' : ' unused local variables. Shall I delete them for you?\nHere they are: ';
                for (let i=0; i<unusedLocals.length; i++) {
                    let orphan = unusedLocals[i];
                    if (i > 0) {
                        message += ', ';
                    }
                    message += orphan.name;
                }
                if (confirm(message)) {
                    for (const orphan of unusedLocals) {
                        workspace.deleteVariableById(orphan.getId());
                    }
                }
            }

            endUndoGroup(wksp);
        }, 100);
    }

    /**
     * Badly Ophaned - might want to delete these!
     * @param topBlock
     * @returns {boolean}
     */
    function isBlockAnOrphan(topBlock) {
        if (topBlock.getOutputShape() && !topBlock.getSurroundParent()) {
            return true;
        }
        return false;
    }

    /**
     * Split the top blocks into ordered columns
     * @param separateOrphans true to keep all orphans separate
     * @returns {{orphans: {blocks: [], x: number, count: number}, cols: []}}
     */
    function getOrderedTopBlockColumns(separateOrphans) {
        let w = getWorkspace();
        let topBlocks = w.getTopBlocks();
        let maxWidths = {};

        if (separateOrphans) {
            let topComments = w.getTopComments();

            // todo: tie comments to blocks... find widths and width of block stack row...
            for (const comment of topComments) {
                // coment.autoPosition_();
                // Hiding and showing repositions the comment right next to it's block - nice!
                if (comment.setVisible) {
                    comment.setVisible(false);
                    comment.needsAutoPositioning_ = true;
                    comment.setVisible(true);

                    // let bb = comment.block_.svgPath_.getBBox();
                    let right = comment.getBoundingRectangle().bottomRight.x;

                    // Get top block for stack...
                    let root = comment.block_.getRootBlock();
                    let left = root.getBoundingRectangle().topLeft.x;
                    maxWidths[root.id] = Math.max(right - left, maxWidths[root.id] || 0);
                }
            }
        }

        // Default scratch ordering is horrid... Lets try something more clever.

        let cols = [];
        const TOLERANCE = 256;
        let orphans = {x:-999999, count:0, blocks:[]};
        
        for (const topBlock of topBlocks) {
            // let r = b.getBoundingRectangle();
            let position = topBlock.getRelativeToSurfaceXY();
            let bestCol = null;
            let bestError = TOLERANCE;

            if (separateOrphans && isBlockAnOrphan(topBlock)) {
                orphans.blocks.push(topBlock);
                continue;
            }

            // Find best columns
            for (const col of cols) {
                let err = Math.abs(position.x - col.x);
                if (err < bestError) {
                    bestError = err;
                    bestCol = col;
                }
            }

            if (bestCol) {
                // We found a column that we fitted into
                bestCol.x = (bestCol.x * bestCol.count + position.x) / ++bestCol.count;    // re-average the columns as more items get added... 
                bestCol.blocks.push(topBlock);
            } else {
                // Create a new column
                cols.push({x:position.x,count:1,blocks:[topBlock]});
            }
        }
        
        // if (orphans.blocks.length > 0) {
        //     cols.push(orphans);
        // }
        
        // Sort columns, then blocks inside the columns
        cols.sort(function (a, b) {return a.x - b.x;});
        for (const col of cols) {
            col.blocks.sort(function (a, b) {return a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y;});
        }
        
        return {cols:cols, orphans:orphans, maxWidths:maxWidths};
    }

    /**
     * Find all the uses of a named variable.
     * @param {string} id ID of the variable to find.
     * @return {!Array.<!Blockly.Block>} Array of block usages.
     */
    function getVariableUsesById(id) {
        let uses = [];

        let topBlocks = getTopBlocks(true);
        for (const topBlock of topBlocks) {
            let kids = topBlock.getDescendants();
            for (const block of kids) {
                let blockVariables = block.getVarModels();
                if (blockVariables) {
                    for (const blockVar of blockVariables) {
                        if (blockVar.getId() === id) {
                            uses.push(block);
                        }
                    }
                }
            }
        }
        
        return uses;
    }

    /**
     * Find all the uses of a named procedure.
     * @param {string} id ID of the variable to find.
     * @return {!Array.<!Blockly.Block>} Array of block usages.
     */
    function getCallsToProcedureById(id) {
        let w = getWorkspace();
        let procBlock = w.getBlockById(id);
        let label = procBlock.getChildren()[0];
        let procCode = label.getProcCode();
        
        let uses = [procBlock]; // Definition First, then calls to it
        let topBlocks = getTopBlocks(true);
        for (const topBlock of topBlocks) {
            let kids = topBlock.getDescendants();
            for (const block of kids) {
                if (block.type === "procedures_call") {
                    if (block.getProcCode() === procCode) {
                        uses.push(block);
                    }
                }
            }
        }
        
        return uses;
    }

    /**
     * Find all the uses of a named procedure.
     * @param {string} id ID of the variable to find.
     * @return {!Array.<!Blockly.Block>} Array of block usages.
     */
    function getCallsToEventsByName(name) {
        let uses = []; // Definition First, then calls to it
        let topBlocks = getTopBlocks(true);
        for (const topBlock of topBlocks) {
            let kids = topBlock.getDescendants();
            for (const block of kids) {
                if (block.type === "event_broadcast" || block.type === "event_broadcastandwait") {
                    if (name === block.getChildren()[0].inputList[0].fieldRow[0].getText()) {
                        uses.push(block);
                    }
                }
            }
        }
        
        return uses;
    }

    function buildNavigationCarousel(nav, li, blocks, instanceBlock) {
        if (nav && nav.parentNode === li) {
            // Same control... click again to go to next
            multi.navRight();
        } else {
            if (nav) {
                nav.remove();
            }
            li.insertAdjacentHTML('beforeend', `
                    <span id="s3devMulti" class="s3devMulti">
                        <span id="s3devMultiLeft" class="s3devNav">◀</span><span id="s3devMultiCount"></span><span id="s3devMultiRight" class="s3devNav">▶</span>
                    </span>
                `);
            document.getElementById('s3devMultiLeft').addEventListener("mousedown", multi.navLeft);
            document.getElementById('s3devMultiRight').addEventListener("mousedown", multi.navRight);

            multi.idx = 0;

            if (instanceBlock) {
                multi.idx = blocks.indexOf(instanceBlock);
            }

            multi.blocks = blocks;
            multi.update();

            if (multi.idx < blocks.length) {
                centerTop(blocks[multi.idx]);
            }
        }
    }

    function triggerDragAndDrop(selectorDrag, selectorDrop, mouseXY) {

        // function for triggering mouse events
        let fireMouseEvent = function (type, elem, centerX, centerY) {
            let evt = document.createEvent('MouseEvents');
            evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
            elem.dispatchEvent(evt);
        };

        // fetch target elements
        let elemDrag = selectorDrag;    // document.querySelector(selectorDrag);
        let elemDrop = selectorDrop;    // document.querySelector(selectorDrop);
        if (!elemDrag/* || !elemDrop*/) return false;

        // calculate positions
        let pos = elemDrag.getBoundingClientRect();
        let center1X = Math.floor((pos.left + pos.right) / 2);
        let center1Y = Math.floor((pos.top + pos.bottom) / 2);

        // mouse over dragged element and mousedown
        fireMouseEvent('mouseover', elemDrag, center1X, center1Y);
        fireMouseEvent('mousedown', elemDrag, center1X, center1Y);

        // start dragging process over to drop target
        fireMouseEvent('dragstart', elemDrag, center1X, center1Y);
        fireMouseEvent('drag', elemDrag, center1X, center1Y);
        fireMouseEvent('mousemove', elemDrag, center1X, center1Y);

        if (!elemDrop) {
            if (mouseXY) {
                // console.log(mouseXY);
                let center2X = mouseXY.x;
                let center2Y = mouseXY.y;
                fireMouseEvent('drag', elemDrag, center2X, center2Y);
                fireMouseEvent('mousemove', elemDrag, center2X, center2Y);
            }
            return false;
        }

        pos = elemDrop.getBoundingClientRect();
        let center2X = Math.floor((pos.left + pos.right) / 2);
        let center2Y = Math.floor((pos.top + pos.bottom) / 2);

        fireMouseEvent('drag', elemDrag, center2X, center2Y);
        fireMouseEvent('mousemove', elemDrop, center2X, center2Y);

        // trigger dragging process on top of drop target
        fireMouseEvent('mouseenter', elemDrop, center2X, center2Y);
        fireMouseEvent('dragenter', elemDrop, center2X, center2Y);
        fireMouseEvent('mouseover', elemDrop, center2X, center2Y);
        fireMouseEvent('dragover', elemDrop, center2X, center2Y);

        // release dragged element on top of drop target
        fireMouseEvent('drop', elemDrop, center2X, center2Y);
        fireMouseEvent('dragend', elemDrag, center2X, center2Y);
        fireMouseEvent('mouseup', elemDrag, center2X, center2Y);

        return true;
    }

    /**
     * Move a costume to the top or bottom of the list
     * @param top true for the top, false for the bottom
     * @param selected optional parameter to pass in the costume div to be moved
     */
    function moveCostumeTo(top, selected) {
        let isSelected = !selected || selected.className.indexOf("sprite-selector-item_is-selected") >= 0;
        if (!selected) {
            selected = costTabBody.querySelectorAll("div[class*='sprite-selector-item_is-selected']");
            if (selected.length === 0) {
                return;
            }
            selected = selected[0].querySelectorAll("div[class^='sprite-selector-item_sprite-name']")[0];
        }
        let costumes = costTabBody.querySelectorAll("div[class^='sprite-selector-item_sprite-name']");

        // First scroll sprite view to reveal top or bottom otherwise this won't work.
        let scroller = selected.closest("div[class*=selector_list-area]");
        let lastScroll = scroller.scrollTop;
        scroller.scrollTop = top ? 0 : scroller.scrollHeight;

        triggerDragAndDrop(selected, costumes[top ? 0 : costumes.length - 1]);
        if (!isSelected) {
            // Restore Scroll position
            scroller.scrollTop = lastScroll;
        }
    }

    /**
     *
     * @param li
     * @param workspace
     * @param instanceBlock the instance to be highlighted (or null)
     */
    function clickDropDownRow(li, workspace, instanceBlock) {
        let nav = document.getElementById('s3devMulti');

        let cls = li.data.cls;
        if (cls === 'costume') {
            // Viewing costumes - jump to selected costume
            let costumes = costTabBody.querySelectorAll("div[class^='sprite-selector-item_sprite-name']");
            let costume = costumes[li.data.y];
            if (costume) {
                costume.click();
                setTimeout(function () {
                    let wrapper = costume.closest("div[class*=gui_flex-wrapper]");
                    costume.parentElement.parentElement.scrollIntoView({
                        behavior: "auto",
                        block: "center",
                        inline: "start"
                    });
                    wrapper.scrollTop = 0;
                }, 10);
            }

        } else if (cls === 'var' || cls === 'VAR' || cls === 'list' || cls === 'LIST') {

            // Search now for all instances
            // let wksp = getWorkspace();
            // let blocks = wksp.getVariableUsesById(li.data.labelID);
            let blocks = getVariableUsesById(li.data.labelID);
            buildNavigationCarousel(nav, li, blocks, instanceBlock);

        } else if (cls === 'define') {
            let blocks = getCallsToProcedureById(li.data.labelID);
            buildNavigationCarousel(nav, li, blocks, instanceBlock);

        } else if (cls === 'receive') {
            let blocks = [workspace.getBlockById(li.data.labelID)];
            if (li.data.clones) {
                for (const cloneID of li.data.clones) {
                    blocks.push(workspace.getBlockById(cloneID))
                }
            }
            blocks = blocks.concat(getCallsToEventsByName(li.data.eventName));
            buildNavigationCarousel(nav, li, blocks, instanceBlock);

        } else if (li.data.clones) {
            let blocks = [workspace.getBlockById(li.data.labelID)];
            for (const cloneID of li.data.clones) {
                blocks.push(workspace.getBlockById(cloneID))
            }
            buildNavigationCarousel(nav, li, blocks, instanceBlock);

        } else {

            multi.blocks = null;
            centerTop(li.data.labelID);
            if (nav) {
                nav.remove();
            }
        }
    }

    function dropDownClick(e) {
        // console.log(e);
        let workspace = getWorkspace();

        if (prevVal === null) {
            prevVal = findInp.value;   // Hack to stop filter change if not entered data into edt box, but clicked on row
        }
        
        let li = e.target;
        for (;;) {
            if (!li || li === dd) {
                return;
            }
            if (li.data) {
                break;
            }
            li = li.parentNode;
        }

        // If this was a mouse click, unselect the keyboard selection
        // e.navKey is set when this is called from the keyboard handler...
        if (!e.navKey) {
            let sel = dd.getElementsByClassName('sel');
            sel = sel.length > 0 ? sel[0] : null;
            if (sel && sel !== li) {
                try {
                    sel.classList.remove('sel');
                } catch (e) {
                    console.log(sel);
                    console.error(e);
                }
            }
            if (li !== sel) {
                li.classList.add('sel');
            }
        }

        clickDropDownRow(li, workspace);
        if (e) {
            e.preventDefault();
            e.cancelBubble = true;
        }
        return false;
    }

    let multi = {
        idx: 0,
        blocks: null,
        update: function () {
            let count = document.getElementById('s3devMultiCount');
            count.innerText = multi.blocks && multi.blocks.length > 0 ? enc((multi.idx + 1) + " / " + multi.blocks.length) : "0"
        },
        navLeft: function(e) { return multi.navSideways(e, -1); },
        navRight: function(e) { return multi.navSideways(e, 1); },
        navSideways: function(e, dir) {
            if (multi.blocks && multi.blocks.length > 0) {
                multi.idx = (multi.idx + dir + multi.blocks.length) % multi.blocks.length; // + length to fix negative modulo js issue.
                multi.update();
                centerTop(multi.blocks[multi.idx]);
            }
            if (e) {
                e.cancelBubble = true;
                e.preventDefault();
            }
            return false;
        }
    };
    
    let myFlash = {block:null, timerID:null, colour:null};
    let myFlashTimer;

    /**
     * Based on wksp.centerOnBlock(li.data.labelID);
     * @param e
     * @param force if true, the view always moves, otherwise only move if the selected element is not entirely visible
     */
    function centerTop(e, force) {
        let wksp = getWorkspace();
        if (e = (e && e.id ? e : wksp.getBlockById(e))) {
            
            let root = e.getRootBlock();
            let base = e;
            while (base.getOutputShape() && base.getSurroundParent()) {
                base = base.getSurroundParent();
            }
            
            let ePos = base.getRelativeToSurfaceXY(),   // Align with the top of the block
                rPos = root.getRelativeToSurfaceXY(),   // Align with the left of the block 'stack'
                eSiz = e.getHeightWidth(),
                scale = wksp.scale,

                // x = (ePos.x + (wksp.RTL ? -1 : 1) * eSiz.width / 2) * scale,
                x = rPos.x * scale,
                y = ePos.y * scale,
                
                xx = e.width + x,   // Turns out they have their x & y stored locally, and they are the actual size rather than scaled or including children...
                yy = e.height + y,
                // xx = eSiz.width * scale + x,
                // yy = eSiz.height * scale + y,

                s = wksp.getMetrics();

            // On screen?

                // ratio = wksp.scrollbar.hScroll.ratio_;
            // w.scrollbar.hScroll.scrollViewSize_
            
            if (x < s.viewLeft + offsetX - 4 || xx > s.viewLeft + s.viewWidth || y < s.viewTop + offsetY - 4 || yy > s.viewTop + s.viewHeight) {

                // sx = s.contentLeft + s.viewWidth / 2 - x,
                let sx = x - s.contentLeft - offsetX,
                    // sy = s.contentTop - y + Math.max(Math.min(32, 32 * scale), (s.viewHeight - yh) / 2);
                    sy = y - s.contentTop - offsetY;

                navHist.storeView(navHist.peek(), 64);

                // wksp.hideChaff(),
                wksp.scrollbar.set(sx, sy);
                navHist.storeView({left:sx, top:sy}, 64);
            }

            doFlash(e);
        }
    }

    function doFlash(block) {
        if (myFlash.timerID > 0) {
            clearTimeout(myFlash.timerID);
            myFlash.block.setColour(myFlash.colour);
        }

        let count = 4;
        let flashOn = true;
        myFlash.colour = block.getColour();
        myFlash.block = block;

        function flash() {
            // wksp.glowBlock(e.id, flashOn);
            myFlash.block.setColour(flashOn ? "#ffff80" : myFlash.colour);
            flashOn = !flashOn;
            count--;
            if (count > 0) {
                myFlash.timerID = setTimeout(flash, 200);
            } else {
                myFlash.timerID = 0;
            }
        }

        flash();
    }

    function enc(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    
    let prevVal = '';
    
    function inputChange(e) {

        if (!ddOut.classList.contains('vis')) {
            showDropDown();
            hideDropDown(); // Start timer to hide if not got focus
        }

        // Filter the list...
        let val = (findInp.value || '').toLowerCase();
        if (val === prevVal) {
            return;
        }

        prevVal = val;
        multi.blocks = null;

        let listLI = dd.getElementsByTagName('li');
        for (const li of listLI) {
            let procCode = li.data.procCode;
            let i = li.data.lower.indexOf(val);
            if (i >= 0) {
                li.style.display = 'block';
                dom_removeChildren(li);
                if (i > 0) {
                    li.appendChild(document.createTextNode(procCode.substring(0, i)));
                }
                let bText = document.createElement('b');
                bText.appendChild(document.createTextNode(procCode.substr(i, val.length)));
                li.appendChild(bText);
                if (i + val.length < procCode.length) {
                    li.appendChild(document.createTextNode(procCode.substr(i + val.length)));
                }                
                // li.innerHTML = enc(procCode.substring(0, i)) + '<b>' + enc(procCode.substr(i, val.length)) + "</b>" + enc(procCode.substr(i + val.length));
            } else {
                li.style.display = 'none';
            }
        }
    }

    function navigateFilter(dir) {
        let sel = dd.getElementsByClassName('sel');
        let nxt = null;
        if (sel.length > 0 && sel[0].style.display !== 'none') {
            nxt = dir === -1 ? sel[0].previousSibling : sel[sel.length - 1].nextSibling;
        } else {
            nxt = dd.children[0];
            dir = 1;
        }
        while (nxt && nxt.style.display === 'none') {
            nxt = dir === -1 ? nxt.previousSibling : nxt.nextSibling;
        }
        if (nxt) {
            for (const i of sel) {
                i.classList.remove("sel");
            }
            nxt.classList.add('sel');
            dropDownClick({target:nxt, navKey:true});
            // centerTop(nxt.data.labelID);
        }
    }

    function inputKeyDown(e) {
        if (e.keyCode === 38) {
            navigateFilter(-1);
            e.preventDefault();
            return;
        }
        if (e.keyCode === 40) {
            navigateFilter(1);
            e.preventDefault();
            return;
        }
        if (e.keyCode === 37) {
            let sel = dd.getElementsByClassName('sel');
            if (sel && multi.blocks) {
                multi.navLeft(e);
            }
        }
        if (e.keyCode === 39) {
            let sel = dd.getElementsByClassName('sel');
            if (sel && multi.blocks) {
                multi.navRight(e);
            }
        }
        if (e.keyCode === 13) { // Enter
            // Any selected on enter? if not select now
            let sel = dd.getElementsByClassName('sel');
            if (sel.length === 0) {
                navigateFilter(1);
            }
            document.activeElement.blur();
            e.preventDefault();
            return;
        }
        if (e.keyCode === 27) { // Escape
            if (findInp.value.length > 0) {
                findInp.value = ''; // Clear search first, then close on second press
                inputChange(e);
            } else {
                document.activeElement.blur();
            }
            e.preventDefault();
            return;
        }
    }

    function deepSearch(e) {

        let selected = document.querySelector('[class*=sprite-selector-item_is-selected_]');
        let wksp = getWorkspace();
        let myTopBlocks = wksp.getTopBlocks();

        let dict = {};

        wksp.setVisible(false);

        document.body.insertAdjacentHTML('beforeend', `
            <div id="s3devOverlay">
            </div>
        `);

        let overlay = document.getElementById("s3devOverlay");
        let sprites = document.querySelectorAll('[class*=sprite-selector_sprite_]');
        let sprite = null, name = null;
        let i = -1;
        
        function nextSprite() {
            if (sprite !== null) {
                let topBlocks;
                if (sprite === selected) {
                    topBlocks = myTopBlocks;
                } else {
                    sprite.click();
                    topBlocks = wksp.getTopBlocks();
                }

                dict[name] = topBlocks;
            }

            if (++i >= sprites.length) {
                selected.click();   // Back to first -- todo: watch out for background selection
                wksp.setVisible(true);
                return overlay.remove();
            }

            sprite = sprites[i];
            name = sprite.querySelector('[class*=sprite-selector-item_sprite-name]').textContent;

            console.log('Loading ' + name);
            let divElement = document.createElement("div");
            divElement.appendChild(document.createTextNode("Searching in " + name));
            overlay.appendChild(divElement);

            setTimeout(nextSprite, 50);
        }
        
        nextSprite();

        // for (const sprite of sprites) {
        // }

        e.preventDefault();
        return true;
    }

    function doReplaceVariable(varId, newVarName, type) {
        let wksp = getWorkspace();
        let v = wksp.getVariable(newVarName, type);
        if (!v) {
            alert('That variable does not exist...');
            return;
        }
        let newVId = v.getId();

        startUndoGroup(wksp);
        let blocks = getVariableUsesById(varId);
        for (const block of blocks) {
            try {
                if (type === "") {
                    block.getField("VARIABLE").setValue(newVId);
                } else {
                    block.getField("LIST").setValue(newVId);
                }
            } catch (e) {
                // ignore
            }
        }
        endUndoGroup(wksp);
    }

    class XML {
        constructor() {
            this.xmlDoc = document.implementation.createDocument(null, "xml");
        }

        newXml(x, tagName, attrs) {
            let xAdd = this.xmlDoc.createElement(tagName);
            x.appendChild(xAdd);
            return this.setAttr(xAdd,  attrs);
        }

        setAttr(x, attrs) {
            if (attrs) {
                for (const key of Object.keys(attrs)) {
                    if (key === 'text') {
                        x.appendChild(this.xmlDoc.createTextNode(attrs[key]));
                    } else {
                        x.setAttribute(key, attrs[key]);
                    }
                }
            }
            return x;
        }
    }

    function doInjectScripts(codeString) {
        let w = getWorkspace();
        let xml = new XML(); // document.implementation.createDocument(null, "xml");
        let x = xml.xmlDoc.firstChild;
        
        let tree = math.parse(codeString);
        console.log(tree);

        const binaryOperatorTypes = {
            add: 'operator_add',
            subtract: 'operator_subtract',
            multiply: 'operator_multiply',
            divide: 'operator_divide'
        };

        const BLOCK_TYPE = {
            number: 'math_number',
            text: 'text'
        };
        
        function translateMathToXml(x, tree, shadowType) {

            let xShadowField = null;
            if (shadowType) {
                let xShadow = xml.newXml(x, 'shadow', {type: shadowType});
                if (shadowType === BLOCK_TYPE.number) {
                    xShadowField = xml.newXml(xShadow, 'field', {name:'NUM'});
                } else if (shadowType === BLOCK_TYPE.text) {
                    xShadowField = xml.newXml(xShadow, 'field', {name:'TEXT'});
                }
            }
            
            if (!tree || !tree.type) {
                return;
            }
            
            if (tree.type === 'OperatorNode') {

                let operatorType = binaryOperatorTypes[tree.fn];
                if (operatorType) {
                    let xOp = newXml(x, 'block', {type:operatorType});
                    translateMathToXml(xml.newXml(xOp, "value", {name: 'NUM1'}), tree.args[0], BLOCK_TYPE.number);
                    translateMathToXml(xml.newXml(xOp, "value", {name: 'NUM2'}), tree.args[1], BLOCK_TYPE.number);
                    return;
                }

                return;
            }
            
            if (tree.type === 'ConstantNode') { // number or text in quotes
                if (xShadowField) {
                    xml.setAttr(xShadowField, {text:tree.value});
                }
                return;
            }

            if (tree.type === 'SymbolNode') {   // variable
                let xVar = xml.newXml(x, 'block', {type:'data_variable'});
                xml.newXml(xVar, 'field', {name:'VARIABLE', text:tree.name});
                return;
            }
            
            if (tree.type === 'FunctionNode') { // Method Call
                if (tree.fn.name === 'join') {
                    let xOp = newXml(x, 'block', {type:'operator_join'});
                    translateMathToXml(xml.newXml(xOp, "value", {name: 'STRING1'}), tree.args[0], BLOCK_TYPE.text);
                    translateMathToXml(xml.newXml(xOp, "value", {name: 'STRING2'}), tree.args[1], BLOCK_TYPE.text);
                    return;
                }
            }
        }

        translateMathToXml(x, tree);
        console.log(x);

        let ids = Blockly.Xml.domToWorkspace(x, w);
        console.log(ids);
    }



    function simulateDragDrop(sourceNode, destinationNode) {
        const EVENT_TYPES = {
            MOUSE_OVER: 'mouseover',
            MOUSE_DOWN: 'mousedown',
            MOUSE_MOVE: 'mousemove',
            MOUSE_OUT:  'mouseout',
            MOUSE_UP:   'mouseup',
        };

        function createCustomEvent(type) {
            let event = new CustomEvent("CustomEvent");
            event.initCustomEvent(type, true, true, null);
            event.dataTransfer = {
                data: {
                },
                setData: function(type, val) {
                    this.data[type] = val;
                },
                getData: function(type) {
                    return this.data[type];
                }
            }
            return event;
        }

        function dispatchEvent(node, type, event) {
            if (node.dispatchEvent) {
                return node.dispatchEvent(event);
            }
            if (node.fireEvent) {
                return node.fireEvent("on" + type, event);
            }
        }

        let event = createCustomEvent(EVENT_TYPES.DRAG_START);
        dispatchEvent(sourceNode, EVENT_TYPES.DRAG_START, event);

        let dropEvent = createCustomEvent(EVENT_TYPES.DROP);
        dropEvent.dataTransfer = event.dataTransfer;
        dispatchEvent(destinationNode, EVENT_TYPES.DROP, dropEvent);

        let dragEndEvent = createCustomEvent(EVENT_TYPES.DRAG_END);
        dragEndEvent.dataTransfer = event.dataTransfer;
        dispatchEvent(sourceNode, EVENT_TYPES.DRAG_END, dragEndEvent);

        // var event = new MouseEvent('click', {
        //     view: window,
        //     bubbles: true,
        //     cancelable: true
        // });
        // var cb = document.getElementById('checkbox');
        // var cancelled = !cb.dispatchEvent(event);
    }
    





    // Loop until the DOM is ready for us...
    function initInner() {
        let root = document.querySelector("ul[class*=gui_tab-list_");
        let guiTabs = root && root.childNodes;
        if (guiTabs == null || guiTabs.length < 3) {
            setTimeout(initInner, 1000);
            return;
        }

        if (codeTab && guiTabs[0] != codeTab) {
            // We have been CHANGED!!! - Happens when going to project page, and then back inside again!!!
            unbindAllEvents();
        }

        codeTab = guiTabs[0];
        costTab = guiTabs[1];
        costTabBody = document.querySelector("div[aria-labelledby=" + costTab.id + "]");

        if (!document.getElementById('s3devFind')) {
            root.insertAdjacentHTML('beforeend', `
                <div id="s3devToolBar">
<!--                    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/6.2.1/math.min.js" type="text/javascript"></script>-->
                    <label class='title s3devLabel' id=s3devFindLabel>
                        <span>Find </span>
                        <span id=s3devFind class="s3devWrap">
                            <div id='s3devDDOut' class="s3devDDOut">
                                <input id='s3devInp' class="s3devInp" type='search' placeholder='Find (Ctrl+F)' autocomplete='off'>
                                <ul id='s3devDD' class="s3devDD"></ul>
                            </div>
                        </span>
                        <a id="s3devDeep" class="s3devAction s3devHide" href="#">Deep</a>
                        <a href="#" class="s3devAction" id="s3devHelp"><b>Help</b></a>
                        <a href="https://www.youtube.com/user/griffpatch" class="s3devAction" target="_blank" id="s3devHelp">Tutorials</a>
                    </label>
<!--                    <a id="s3devCleanUp" class="s3devAction" href="#">Clean Up</a>-->
                    <a id="s3devInject" class="s3devAction s3devHide" href="#">Inject</a>
<!--                    <a id="s3devReplace" class="s3devAction s3devHide" href="#">Replace All</a>-->
                </div>
            `);

            find = document.getElementById('s3devFind');
            findInp = document.getElementById('s3devInp');
            ddOut = document.getElementById('s3devDDOut');
            bindOnce(ddOut, 'mousedown', dropDownClick);
            dd = document.getElementById('s3devDD');

            // bindOnce(find, 'mouseenter', showDropDown);
            // bindOnce(find, 'mouseleave', hideDropDown);
            bindOnce(findInp, 'keyup', inputChange);
            bindOnce(findInp, 'keydown', inputKeyDown);
            bindOnce(findInp, 'focus', inputChange);

            bindOnce(document.getElementById('s3devHelp'), 'click', eventClickHelp);

            bindOnce(document, 'keydown', eventKeyDown, true);
        }

        bindOnce(document, 'mousemove', eventMouseMove, true);
        bindOnce(document, 'mousedown', eventMouseDown, true);   // true to capture all mouse downs 'before' the dom events handle them
        bindOnce(document.getElementById('s3devDeep'), 'click', deepSearch);
        // bindOnce(document.getElementById('s3devCleanUp'),'click', clickCleanUp);
        bindOnce(document.getElementById('s3devInject'), 'click', clickInject);
        // bindOnce(document.getElementById('s3devReplace'), 'click', clickReplace);
    }

/*
    function clickCleanUp(e) {
        // if (window.confirm('Griffpatch: Tidy up your scripts?')) {
            doCleanUp();
        // }
        e.preventDefault();
        return false;
    }
*/

    function clickInject(e) {
        let codeString = window.prompt('Griffpatch: Enter an expression (i.e. a+2*3)');
        if (codeString) {
            doInjectScripts(codeString);
        }
        e.preventDefault();
        return false;
    }

    function clickReplace(e) {
        let wksp = getWorkspace();
        hidePopups(wksp);

        setTimeout(function() {
            let wksp = getWorkspace();
            let v = wksp.getVariableById(selVarID);
            let varName = window.prompt(`Griffpatch: Switch all '${v.name}' in this sprite for the variable named:`);
            if (varName) {
                doReplaceVariable(selVarID, varName, v.type);
            }
        }, 0)
        e.preventDefault();
        return false;
    }

    function getTopBlockIDs() {
        // Paste!!! Try to center after the event??
        let wksp = getWorkspace();
        let topBlocks = wksp.getTopBlocks();
        let ids = new Set();
        for (const block of topBlocks) {
            ids.add(block.id);
        }
        return ids;
    }

    function beginDragOfNewBlocksNotInIDs(ids) {
        let wksp = getWorkspace();
        let topBlocks = wksp.getTopBlocks();
        for (const block of topBlocks) {
            if (!ids.has(block.id)) {
                // console.log("I found a new block!!! - " + block.id);
                // todo: move the block to the mouse pointer?
                let mouseXYClone = {x: mouseXY.x, y: mouseXY.y};
                triggerDragAndDrop(block.svgPath_, null, mouseXYClone);
            }
        }
    }

    function eventMouseMove(e) {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
    }

    function eventKeyDown(e) {
        function switchCostume(up) {
            // todo: select previous costume
            let selected = costTabBody.querySelector("div[class*='sprite-selector-item_is-selected']");
            let node = up ? selected.parentNode.previousSibling : selected.parentNode.nextSibling;
            if (node) {
                let wrapper = node.closest("div[class*=gui_flex-wrapper]");
                node.querySelector("div[class^='sprite-selector-item_sprite-name']").click();
                node.scrollIntoView({
                    behavior: "auto",
                    block: "center",
                    inline: "start"
                });
                wrapper.scrollTop = 0;
            }
        }

        if (document.URL.indexOf('editor') <= 0) {
            return;
        }

        let ctrlKey = e.ctrlKey || e.metaKey;

        if (e.key === 'f' && ctrlKey) {     // Ctrl + F (Override default Ctrl+F find)
            findInp.focus();
            findInp.select();
            e.cancelBubble = true;
            e.preventDefault();
            return true;
        }

        if (e.key === ' ' && ctrlKey) {     // Ctrl + F (Override default Ctrl+F find)
            middleClickWorkspace(e);
            e.cancelBubble = true;
            e.preventDefault();
            return true;
        }

        if (e.keyCode === 37 && ctrlKey) {  // Ctrl + Left Arrow Key
            if (document.activeElement.tagName === 'INPUT') {
                return;
            }
            if (isScriptEditor()) {
                navHist.goBack();
            } else if (isCostumeEditor()) {
                switchCostume(true);
            }
            e.cancelBubble = true;
            e.preventDefault();
            return true;
        }

        if (e.keyCode === 39 && ctrlKey) {  // Ctrl + Right Arrow Key
            if (document.activeElement.tagName === 'INPUT') {
                return;
            }
            if (isScriptEditor()) {
                navHist.goForward();
            } else if (isCostumeEditor()) {
                switchCostume(false);
            }
            e.cancelBubble = true;
            e.preventDefault();
            return true;
        }

        if (e.keyCode === 86 && ctrlKey && !e.griff) {  // Ctrl + V
            // Set a timeout so we can take control of the paste after the event
            let ids = getTopBlockIDs();
            setTimeout(function () {
                beginDragOfNewBlocksNotInIDs(ids);
            }, 10);
        }

        // if (e.keyCode === 220 && (!document.activeElement || document.activeElement.tagName === 'INPUT')) {
        //
        // }
    }

    function eventMouseDown(e) {
        if (ddOut && ddOut.classList.contains('vis') && !e.target.closest('#s3devDDOut')) {
            // If we click outside the dropdown, then instigate the hide code...
            hideDropDown();
        }

        if (floatInp && !e.target.closest('#s3devIDDOut')) {
            // If we click outside the dropdown, then instigate the hide code...
            hideFloatDropDown();
        }

        if (e.button === 1) {   // Wheel button...
            try {
                middleClick(e);
            } catch (x) {
                console.error(x);
            }
        } else if (e.button === 2) {    // Right click...
            // tw: send to top/bottom is broken, disable for now
            /*
            let spriteSelector = e.target.closest("div[class*='sprite-selector-item_sprite-selector-item']");
            if (spriteSelector) {
                let contextMenu = spriteSelector.getElementsByTagName("nav")[0];
                if (!contextMenu.querySelector("div.s3devSTT")) {
                    contextMenu.insertAdjacentHTML('beforeend', `
                            <div class="react-contextmenu-item context-menu_menu-item_3cioN s3devSTT" role="menuitem"
                                tabindex="-1" aria-disabled="false" style="border-top: 1px solid hsla(0, 0%, 0%, 0.15);"><span>Send to top</span></div>
                            <div class="react-contextmenu-item context-menu_menu-item_3cioN s3devSTT" role="menuitem"
                                tabindex="-1" aria-disabled="false"><span>Send to bottom</span></div>
                        `);
                }
            }
            */

            let blockSvg = e.target.closest('[data-id]');
            let isBackground = !blockSvg && e.target.closest("svg.blocklySvg");
            if (blockSvg || isBackground) {
                let dataId = blockSvg && blockSvg.getAttribute('data-id');
                if (dataId || isBackground) {
                    setTimeout(function() {
                        // Is there a popup menu to hi-jack?
                        let widget = document.querySelector("div.blocklyWidgetDiv");
                        if (!widget) {
                            return;
                        }
                        let blocklyContextMenu = widget.querySelector("div.blocklyContextMenu");
                        if (!blocklyContextMenu) {
                            return;
                        }
                        if (isBackground) {
                            let nodes = blocklyContextMenu.children;
                            for (const node of nodes) {
                                if (node.textContent === 'Clean up Blocks') {
                                    node.remove();
                                }
                            }
                            blocklyContextMenu.insertAdjacentHTML('beforeend', `
                            <div id="s3devCleanUp" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none; border-top: 1px solid hsla(0, 0%, 0%, 0.15);">
                                <div class="goog-menuitem-content" style="user-select: none;">Clean Up Blocks (+)</div>
                            </div>
                            <div id="s3devPaste" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none;">
                                <div class="goog-menuitem-content" style="user-select: none;">Paste</div>
                            </div>
                            `);
                        } else {
                            let wksp = getWorkspace();
                            let block = wksp.getBlockById(dataId);
                            let isFlyOut = block.workspace.isFlyout;

                            if (!isFlyOut) {
                                blocklyContextMenu.insertAdjacentHTML('beforeend', `
                                    <div id="s3devCopy" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none; border-top: 1px solid hsla(0, 0%, 0%, 0.15);">
                                        <div class="goog-menuitem-content" style="user-select: none;">Copy All</div>
                                    </div>
                                    <div id="s3devCopyBlock" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none;">
                                        <div class="goog-menuitem-content" style="user-select: none;">Copy Block</div>
                                    </div>
                                    <div id="s3devCutBlock" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none;">
                                        <div class="goog-menuitem-content" style="user-select: none;">Cut Block</div>
                                    </div>
                                `);
                            }

                            // Is this a variable or a list?
                            if (block && (block.getCategory() === "data" || block.getCategory() === "data-lists")) {
                                blocklyContextMenu.insertAdjacentHTML('beforeend', `
                                <div id="s3devReplaceAllVars" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none; border-top: 1px solid hsla(0, 0%, 0%, 0.15);">
                                    <div class="goog-menuitem-content" style="user-select: none;">Swap ${block.getCategory() === "data" ? "Variable" : "List"} in Sprite</div>
                                </div>
                                `);
                                selVarID = block.getVars()[0];
                            }
                        }

                        if (blocklyContextMenu.children.length < 15) {
                            blocklyContextMenu.style.maxHeight = 'none';
                            widget.style.height = (blocklyContextMenu.getBoundingClientRect().height + 12) + "px";
                            blocklyContextMenu.style.maxHeight = '';
                        }

                        let copyDiv = blocklyContextMenu.querySelector("div#s3devCleanUp");
                        if (copyDiv) {
                            copyDiv.addEventListener("click", doCleanUp);
                        }
                        copyDiv = blocklyContextMenu.querySelector("div#s3devCopy");
                        if (copyDiv) {
                            copyDiv.addEventListener("click", eventCopyClick);
                        }
                        copyDiv = blocklyContextMenu.querySelector("div#s3devCopyBlock");
                        if (copyDiv) {
                            copyDiv.addEventListener("click", function(e) { eventCopyClick(e, 1); } );
                        }
                        copyDiv = blocklyContextMenu.querySelector("div#s3devCutBlock");
                        if (copyDiv) {
                            copyDiv.addEventListener("click", function(e) { eventCopyClick(e, 2); } );
                        }
                        copyDiv = blocklyContextMenu.querySelector("div#s3devReplaceAllVars");
                        if (copyDiv) {
                            copyDiv.addEventListener("click", clickReplace);
                        }

                        function eventCopyClick(e, blockOnly) {
                            let wksp = getWorkspace();
                            hidePopups(wksp);

                            let block = wksp.getBlockById(dataId);
                            if (block) {
                                block.select();
                                let next = blockOnly ? block.getNextBlock() : null;
                                if (next) {
                                    next.unplug(false); // setParent(null);
                                }

                                // separate child temporarily
                                document.dispatchEvent(new KeyboardEvent("keydown", {keyCode:67, ctrlKey:true}));
                                if (next || blockOnly === 2) {
                                    setTimeout(function() {
                                        if (next) {
                                            wksp.undo();    // undo the unplug above...
                                        }
                                        if (blockOnly === 2) {
                                            let block = wksp.getBlockById(dataId);
                                            startUndoGroup(wksp);
                                            block.dispose(true);
                                            endUndoGroup(wksp);
                                        }

                                    }, 0);
                                }
                            }
                        }

                        let pasteDiv = blocklyContextMenu.querySelector("div#s3devPaste");
                        if (pasteDiv) {
                            pasteDiv.addEventListener("click", function() {
                                let wksp = getWorkspace();
                                hidePopups(wksp);

                                let ids = getTopBlockIDs();

                                document.dispatchEvent(new KeyboardEvent("keydown", {
                                    keyCode:86, ctrlKey:true, griff:true
                                }));

                                setTimeout(function() {
                                    beginDragOfNewBlocksNotInIDs(ids);
                                }, 10);
                            });
                        }

                    }, 1);
                }
            }
        } else {
            let chk = e.target;
            if (chk && (chk.tagName !== 'BUTTON' && chk.getAttribute && !chk.getAttribute('role'))) {
                chk = chk.parentNode;
                if (chk && (chk.tagName !== 'BUTTON' && chk.getAttribute && !chk.getAttribute('role'))) {
                    chk = chk.parentNode;
                }
            }

            if (chk && chk.className && chk.className.indexOf) {
                if (chk.className.indexOf('see-inside-button') >= 0) {
                    // Try to re-inject GUI after rebuild
                    setTimeout(initInner, 200);
                }

                if (!canShare && chk.className.indexOf('share-button') >= 0) {
                    e.cancelBubble = true;
                    e.preventDefault();

                    if (confirm("Griffpatch: Are you sure you want to share?")) {
                        // action the share!
                        canShare = true;
                        chk.click();
                    }

                    return;
                }
            }

            chk = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target;

            if (chk.classList.contains('s3devSTT')) {
                if (chk.textContent === 'Send to top' || chk.textContent === 'Send to bottom') {
                    let spriteSelector = e.target.closest("div[class*='sprite-selector-item_sprite-selector-item']");
                    moveCostumeTo(chk.textContent === 'Send to top', spriteSelector);
                    e.cancelBubble = true;
                    e.preventDefault();
                }
            }
        }
    }

    function middleClickWorkspace(e) {
        if (!isScriptEditor()) {
            return;
        }

        e.cancelBubble = true;
        e.preventDefault();

        let floatBar = document.getElementById("s3devFloatingBar");
        if (floatBar) {
            floatBar.remove();
        }

        // Popup new input box for block injection
        document.body.insertAdjacentHTML('beforeend', `
            <div id="s3devFloatingBar">
                <label class='title s3devLabel' id=s3devInsertLabel>
                    <span style="display:none;">Insert </span>
                    <span id=s3devInsert class="s3devWrap">
                        <div id='s3devIDDOut' class="s3devDDOut">
                            <input id='s3devIInp' class="s3devInp" type='search' placeholder='Start Typing...' autocomplete='off'>
                            <ul id='s3devIDD' class="s3devDD"></ul>
                        </div>
                    </span>
                </label>
            </div>
        `);

        floatBar = document.getElementById("s3devFloatingBar");
        floatBar.style.left = (mouseXY.x + 16) + "px";
        floatBar.style.top = (mouseXY.y - 8) + "px";

        floatInp = document.getElementById("s3devIInp");
        floatInp.focus();

        // Build Filter List...

        buildFloatingFilterList(e, floatBar);

        const ddOut = document.getElementById("s3devIDDOut");
        ddOut.addEventListener('mousedown', dropDownFloatClick);

        floatInp.addEventListener('keyup', floatInputChange);
        floatInp.addEventListener('focus', floatInputChange);
        floatInp.addEventListener('keydown', floatInputKeyDown);
    }

    function middleClick(e) {
        // Intercept clicks to allow jump to...?
        let blockSvg = e.target.closest('[data-id]');
        if (!blockSvg) {
            // Ok, so no selection... are we at least clicking on the workspace?
            if (e.target.closest("svg.blocklySvg")) {
                blockCursor = null; // Clear the cursor if using the mouse
                middleClickWorkspace(e);
            }
            return;
        }

        let w = getWorkspace();
        let dataId = blockSvg.getAttribute('data-id');
        let block = w.getBlockById(dataId);
        if (!block) {
            return;
        }

        // Move outwards until we reach a block we can take action on

        for (; block; block = block.getSurroundParent()) {

            if (block.type === 'procedures_call') {
                e.cancelBubble = true;
                e.preventDefault();

                // todo: navigate to definition
                let findProcCode = block.getProcCode();

                let wksp = getWorkspace();
                let topBlocks = wksp.getTopBlocks();
                for (const root of topBlocks) {
                    if (root.type === "procedures_definition") {
                        let label = root.getChildren()[0];
                        let procCode = label.getProcCode();
                        if (procCode && procCode === findProcCode) {
                            // Found... navigate to it!
                            centerTop(root);
                            return;
                        }
                    }
                }
            }

            if (block.type === 'procedures_definition') {
                let id = block.id ? block.id : block.getId ? block.getId() : null;

                findInp.focus();
                showDropDown(null, id);
                // findInp.select();

                e.cancelBubble = true;
                e.preventDefault();
                return;
            }

            if (block.type === 'data_variable' ||
                block.type === 'data_changevariableby' ||
                block.type === 'data_setvariableto') {

                let id = block.getVars()[0];

                findInp.focus();
                showDropDown(null, id, block);

                // let button = document.getElementById('s3devReplace');

                selVarID = id;
                // button.classList.remove('s3devHide');

                e.cancelBubble = true;
                e.preventDefault();
                return;

                // data_variable
                // block.getVars()[0].id

                // block.inputList[0].fieldRow[0].getText()
                // Blockly.getMainWorkspace().getVariable('PLAYER X');
            }
        }

        e.cancelBubble = true;
        e.preventDefault();
    }

    function getEdgeTypeClass(block) {
        switch (block.edgeShape_) {
            case 1: return 'boolean';
            case 2: return 'reporter';
            default: return block.startHat_ ? 'hat' : 'block';
        }
    }

    function buildFloatingFilterList(e, floatBar) {
        // todo: Iterate through the toolbox?

        let options = [];

        let t = Blockly.getMainWorkspace().getToolbox();

        let blocks = t.flyout_.getWorkspace().getTopBlocks();
        // 107 blocks, not in order... but we can sort by y value or description right :)

        let fullDom = Blockly.Xml.workspaceToDom(t.flyout_.getWorkspace());
        const doms = {};
        for (const x of fullDom.children) {
            if (x.tagName === 'BLOCK') {
                // let type = x.getAttribute('type');
                let id = x.getAttribute('id');
                doms[id] = x;
            }
        }

        for (const block of blocks) {
            getBlockText(block, options, doms);
        }

        options.sort((a, b) => a.desc.localeCompare(b.desc));

        const dd = document.getElementById('s3devIDD');

        for (const option of options) {
            const li = document.createElement("li");
            const desc = option.desc;

            // bType = hat block reporter boolean

            let bType = getEdgeTypeClass(option.block);

            li.innerText = desc;
            li.data = {text:desc, lower:' ' + desc.toLowerCase(), option:option};
            li.className = 'var ' + option.block.getCategory() + " " + bType;  // proc.cls;
            dd.appendChild(li);
        }

        const ddOut = document.getElementById('s3devIDDOut');
        ddOut.classList.add('vis');

        // console.log(options);
    }

    function getBlockText(block, options, doms) {
        // block.type;  "looks_nextbackdrop"

        let desc;
        let picklist, pickField;

        let dom = doms[block.id];

        // dom = doms[block.type];

        for (const input of block.inputList) {
            // input.name = "", input.type = 5
            let fields = input.fieldRow;
            for (const field of fields) {

                // field --- Blockly.FieldLabel .className = "blocklyText"
                // Blockly.FieldDropdown --- .className = "blocklyText blocklyDropdownText"

                let text;

                if (!picklist && field.className_ === 'blocklyText blocklyDropdownText') {
                    picklist = field.getOptions();
                    pickField = field.name;
                    if (picklist && picklist.length > 0) {
                        text = "^^";
                    } else {
                        text = field.getText();
                    }
                } else {
                    text = field.getText();
                }

                desc = (desc ? desc + ' ' : '') + text;
            }
        }

        if (picklist) {
            for (const item of picklist) {
                let code = item[1];
                if (code === "DELETE_VARIABLE_ID" || code === "RENAME_VARIABLE_ID") {
                    continue;   // Skip these
                }
                options.push({desc: desc.replace("^^", item[0]), block:block, dom:dom, option:item, pickField:pickField});
            }
        } else {
            options.push({desc: desc, block:block, dom:dom});
        }

        return desc;
    }

    function floatInputKeyDown(e) {
        if (e.keyCode === 38) {
            navigateFloatFilter(-1);
            e.preventDefault();
            return;
        }
        if (e.keyCode === 40) {
            navigateFloatFilter(1);
            e.preventDefault();
            return;
        }
        if (e.keyCode === 13) { // Enter
            let dd = document.getElementById('s3devIDD');
            let sel = dd.querySelector('.sel');
            if (sel) {
                dropDownFloatClick(e);
            }
            e.cancelBubble = true;
            e.preventDefault();
            return;
        }
        if (e.keyCode === 27) { // Escape
            let findInp = document.getElementById('s3devIInp');
            if (findInp.value.length > 0) {
                findInp.value = ''; // Clear search first, then close on second press
                floatInputChange(e);
            } else {
                reallyHideFloatDropDown(true);
            }
            e.preventDefault();
            return;
        }
    }

    function navigateFloatFilter(dir) {
        let dd = document.getElementById('s3devIDD');
        let sel = dd.getElementsByClassName('sel');
        let nxt;
        if (sel.length > 0 && sel[0].style.display !== 'none') {
            nxt = dir === -1 ? sel[0].previousSibling : sel[sel.length - 1].nextSibling;
        } else {
            nxt = dd.children[0];
            dir = 1;
        }
        while (nxt && nxt.style.display === 'none') {
            nxt = dir === -1 ? nxt.previousSibling : nxt.nextSibling;
        }
        if (nxt) {
            for (const i of sel) {
                i.classList.remove("sel");
            }
            nxt.classList.add('sel');
            // centerTop(nxt.data.labelID);
        }
    }

    function findNextHole(block, typ) {
        const inputs = block.inputList;
        if (inputs) {
            /** Blockly.Input */
            for (const input of inputs) {
                const fieldRow = input.fieldRow;
                if (fieldRow) {
                    /** Blockly.FieldNumber */
                    for (const field of fieldRow) {
                        if (field.argType_ && field.argType_.includes(typ)) {

                        }
                    }
                }
            }
        }
    }

    /**
     * Inject the selected block into the script
     * @param e
     */
    function dropDownFloatClick(e) {
        e.cancelBubble = true;
        e.preventDefault();

        let wksp = getWorkspace();

        let sel = e && e.target;
        if (sel.tagName === 'B') {
            sel = sel.parentNode;
        }
        if (!sel || !sel.data) {
            let dd = document.getElementById('s3devIDD');
            sel = dd.querySelector('.sel');
        }

        if (!sel) {
            return;
        }

        const xml = new XML();
        let x = xml.xmlDoc.firstChild;
        let option = sel.data.option;
        // block:option.block, dom:option.dom, option:option.option
        if (option.option) {
            // We need to tweak the dropdown in this xml...
            let field = option.dom.querySelector('field[name=' + option.pickField + ']');
            field.innerText = option.option[0];
            field.setAttribute("id", option.option[1] + '-' + option.option[0]);
        }

        x.appendChild(option.dom);

        let ids = Blockly.Xml.domToWorkspace(x, wksp);

        reallyHideFloatDropDown(true);

        let block = wksp.getBlockById(ids[0]);

        if (blockCursor) {
            // What sort of block did we just inject?
            let typ = getEdgeTypeClass(option.block);
            if (typ === 'boolean') {
                findNextHole(blockCursor, '');
            } else if (typ === 'reporter') {
                findNextHole(blockCursor, typ);
            }
        }

        triggerDragAndDrop(block.svgPath_, null, {x: mouseXY.x, y: mouseXY.y});

        blockCursor = block;
    }

    function floatInputChange(e) {

        let ddOut = document.getElementById('s3devIDDOut');

        if (!ddOut.classList.contains('vis')) {
            // showDropDown();
            // hideDropDown(); // Start timer to hide if not got focus
        }

        let findInp = document.getElementById('s3devIInp');

        // Filter the list...
        let val = (findInp.value || '').toLowerCase();
        if (val === prevVal) {
            return;
        }

        prevVal = val;
        multi.blocks = null;

        let dd = document.getElementById('s3devIDD');
        let p = dd.parentNode;
        dd.remove();

        let count = 0;
        const max = 25;

        let split = val.split(' ');
/*
        let split = val.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&').split(' ');
        let regExStr = '';
        for (const token of split) {
            regExStr += '(\\b' + token + ').*';
        }
        let regExp = new RegExp(regExStr);
*/

        let listLI = dd.getElementsByTagName('li');
        for (const li of listLI) {
            const procCode = li.data.text;
            const lower = li.data.lower;
            // let i = li.data.lower.indexOf(val);
            // let array = regExp.exec(li.data.lower);

            let im = 0;
            let match = [];
            for (let si = 0; si < split.length; si++) {
                let find = ' ' + split[si];
                let idx = lower.indexOf(find, im);
                if (idx === -1) {
                    match = null;
                    break;
                }
                match.push(idx);
                im = idx + find.length;
            }

            if (count < max && match) {
                li.style.display = 'block';
                dom_removeChildren(li);

                let i = 0;

                for (let iM = 0; iM < match.length; iM++) {
                    let im = match[iM];
                    if (im > i) {
                        li.appendChild(document.createTextNode(procCode.substring(i, im)));
                        i = im;
                    }
                    let bText = document.createElement('b');
                    let len = split[iM].length;
                    bText.appendChild(document.createTextNode(procCode.substr(i, len)));
                    li.appendChild(bText);
                    i += len;
                }

                if (i < procCode.length) {
                    li.appendChild(document.createTextNode(procCode.substr(i)));
                }

                if (count === 0) {
                    li.classList.add('sel');
                } else {
                    li.classList.remove('sel');
                }
                count++;
            } else {
                li.style.display = 'none';
                li.classList.remove('sel');
            }
        }
        p.append(dd);
    }

    setTimeout(initInner, 1000);

/*
    // The magic code
    let oldAddEventListener;
    
    if (!oldAddEventListener) {
        console.log('*** Looking for event handler registrations');
        
        oldAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(eventName, eventHandler) {
            let ok = this.className && this.className.startsWith !== undefined;
            if (ok) {
                console.log('*** REGISTER - ' + eventName);
                if (ok && this.className.indexOf('color-picker_swatch') > -1) {
                    console.log('******** FOUND')
                }
                oldAddEventListener.call(this, eventName, function (event) {
                    eventHandler(event);
                });
            } else {
                // console.log('*** REGISTER - ' + eventName + " svg?");
                oldAddEventListener.call(this, eventName, eventHandler);
            }
        };
    }
*/
}

// initGUI();
//getScratchBlocks();

// Later, you can stop observing
// observer.disconnect();
