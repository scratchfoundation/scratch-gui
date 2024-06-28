function getAppState() {
    var appChild = document.querySelector("body>div>div[dir]");
    if (!appChild || !appChild.parentElement) { throw new Error("Unable to access vm through redux"); }

    var stateNode = appChild.parentElement
    [
        Object.keys(appChild.parentElement).find((key) => key.startsWith("__reactContainer"))
    ].child.stateNode;
    window.redux = stateNode.store;
}
getAppState();
const contextMenuCallbacks = [];
const CONTEXT_MENU_ORDER = [
    "editor-devtools",
    "block-switching",
    "blocks2image",
    "swap-local-global",
];
let createdAnyBlockContextMenus = false;
function createBlockContextMenu(
    callback,
    { workspace = false, blocks = false, flyout = false, comments = false } = {}
) {
    contextMenuCallbacks.push({
        addonId: this._addonId,
        callback,
        workspace,
        blocks,
        flyout,
        comments,
    });

    contextMenuCallbacks.sort(
        (b, a) =>
            CONTEXT_MENU_ORDER.indexOf(b.addonId) -
            CONTEXT_MENU_ORDER.indexOf(a.addonId)
    );

    if (createdAnyBlockContextMenus) return;
    createdAnyBlockContextMenus = true;

    const oldShow = ScratchBlocks.ContextMenu.show;
    ScratchBlocks.ContextMenu.show = function (event, items, rtl) {
        const gesture = ScratchBlocks.mainWorkspace.currentGesture_;
        const block = gesture.targetBlock_;

        for (const {
            callback,
            workspace,
            blocks,
            flyout,
            comments,
        } of contextMenuCallbacks) {
            let injectMenu =
                // Workspace
                (workspace && !block && !gesture.flyout_ && !gesture.startBubble_) ||
                // Block in workspace
                (blocks && block && !gesture.flyout_) ||
                // Block in flyout
                (flyout && gesture.flyout_) ||
                // Comments
                (comments && gesture.startBubble_);
            if (injectMenu) {
                try {
                    items = callback(items, block);
                } catch (e) {
                    console.error("Error while calling context menu callback: ", e);
                }
            }
        }

        oldShow.call(this, event, items, rtl);

        const blocklyContextMenu = ScratchBlocks.WidgetDiv.DIV.firstChild;
        items.forEach((item, i) => {
            if (i !== 0 && item.separator) {
                const itemElt = blocklyContextMenu.children[i];
                itemElt.style.paddingTop = "2px";
                itemElt.style.borderTop = "1px solid hsla(0, 0%, 0%, 0.15)";
            }
        });
    };
}
var markedAsSeenSet = new WeakSet();
async function waitForElement(selector, period, condition, markAsSeen) {
    return new Promise((res, rej)=>{
        setInterval(()=>{
            var elems = document.querySelectorAll(selector);
            for (let i = 0; i < elems.length; i++) {
                const elem = elems[i];
                if (elem && condition(elem) && !markedAsSeenSet.has(elem)) {
                    if (markAsSeen) {
                        markedAsSeenSet.add(elem);
                    }
                    res(elem);
                    break;
                }
            }
        }, period || 500)
    });
}

var scratchClass = window.scratchClass = function scratchClass(targetClass) {
    var allClasses = [];
    var styleSheets = document.styleSheets;

    for (var i = 0; i < styleSheets.length; i++) {
        var rules = styleSheets[i].cssRules;
        for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (rule.selectorText && rule.selectorText.startsWith('.')) {
                var classes = rule.selectorText.split(',').map(function(selector) {
                    return selector.trim().split(' ')[0].substring(1);
                });
                allClasses = allClasses.concat(classes);
            }
        }
    }

    // Remove duplicates
    allClasses = [...new Set(allClasses)];

    return allClasses.filter(className => {
        return className.startsWith(targetClass + "_") && className.length === targetClass.length + 6;
    })[0] || targetClass;
}


require("./catblocks").func();
require("./numberpad").func();
require("./blocks2image").func(createBlockContextMenu);
require("./cherrypicking").func();
require("./blocklydevtools").func();
require("./cleanupplus").func();
require("./locator").func();
require("./opacity").func(waitForElement, scratchClass);