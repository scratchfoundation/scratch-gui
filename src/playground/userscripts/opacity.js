async function opacity(waitForElement, scratchClass) {
    //Get scratch-paint to shut up about its invalid hex color codes
    var oldWarn = console.warn;
    console.warn = (...args) => {
        if (args && args[0] && !args[0].includes(`scratch-paint Invalid hex color code`)) {
            oldWarn(...args)
        }
    }

    const CONTAINER_WIDTH = 150;
    const HANDLE_WIDTH = 26;
    let prevEventHandler;
    let handleClickOffset;
    let element;
    let labelReadout;
    let saOpacityHandle;
    let saOpacitySlider;
    let saOpacitySliderBg;
    const getColor = () => {
        let fillOrStroke;
        if (redux.getState().scratchPaint.modals.fillColor) {
            fillOrStroke = "fill";
        } else if (redux.getState().scratchPaint.modals.strokeColor) {
            fillOrStroke = "stroke";
        } else {
            // fillOrStroke = "ihadastroke";
            return;
        }
        const colorType = redux.getState().scratchPaint.fillMode.colorIndex;
        const primaryOrSecondary = ["primary", "secondary"][colorType];
        const color = redux.getState().scratchPaint.color[`${fillOrStroke}Color`][primaryOrSecondary];
        if (color === null || color === "scratch-paint/style-path/mixed") return;
        // This value can be arbitrary - it can be HEX, RGB, etc.
        // Use tinycolor to convert them.
        return tinycolor(color).toRgbString();
    };

    const setColor = (color) => {
        var unsub = () => { };
        const onEyeDropperOpened = () => {
            var action = redux.getState().lastAction || {};
            if (action.type !== "scratch-paint/eye-dropper/ACTIVATE_COLOR_PICKER") return;
            unsub();
            const previousTool = redux.getState().scratchPaint.color.eyeDropper.previousTool;
            if (previousTool) previousTool.activate();
            redux.getState().scratchPaint.color.eyeDropper.callback(color);
            redux.dispatch({
                type: "scratch-paint/eye-dropper/DEACTIVATE_COLOR_PICKER",
            });
        };
        unsub = redux.subscribe(onEyeDropperOpened);
        element.children[1].children[0].click();
    };

    const setSliderBg = (color) => {
        const hex = tinycolor(color).toHexString(); // remove alpha value
        saOpacitySliderBg.style.background = `linear-gradient(to left, ${hex} 0%, rgba(0, 0, 0, 0) 100%)`;
    };

    const getEventXY = (e) => {
        if (e.touches && e.touches[0]) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.changedTouches && e.changedTouches[0]) {
            return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (event) => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        handleClickOffset = getEventXY(event).x - saOpacityHandle.getBoundingClientRect().left;
    };

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
        event.preventDefault();
        changeOpacity(scaleMouseToSliderPosition(event));
    };

    const handleClickBackground = (event) => {
        handleClickOffset = HANDLE_WIDTH / 2;
        changeOpacity(scaleMouseToSliderPosition(event));
    };

    const scaleMouseToSliderPosition = (event) => {
        const { x } = getEventXY(event);
        const backgroundBBox = saOpacitySlider.getBoundingClientRect();
        const scaledX = x - backgroundBBox.left - handleClickOffset;
        return Math.max(0, Math.min(100, (100 * scaledX) / (backgroundBBox.width - HANDLE_WIDTH)));
    };

    const changeOpacity = (opacityValue) => {
        const halfHandleWidth = HANDLE_WIDTH / 2;
        const pixelMin = halfHandleWidth;
        const pixelMax = CONTAINER_WIDTH - halfHandleWidth;
        labelReadout.textContent = Math.round(opacityValue);
        saOpacityHandle.style.left = pixelMin + (pixelMax - pixelMin) * (opacityValue / 100) - halfHandleWidth + "px";

        const color = tinycolor(getColor()).toRgb();
        //scratchAddons.opacitySliderAlpha = opacityValue / 100;
        setColor(`rgba(${color.r}, ${color.g}, ${color.b}, ${opacityValue / 100})`);
    };

    const setHandlePos = (alphaValue) => {
        saOpacityHandle.style.left = alphaValue * (CONTAINER_WIDTH - HANDLE_WIDTH) + "px";
    };

    while (true) {
        element = await waitForElement('div[class*="color-picker_swatch-row"]',
            250,
            (elem) => {
                return redux.getState().scratchGui.editorTab.activeTabIndex === 1 &&
                    !redux.getState().scratchGui.mode.isPlayerOnly &&
                    redux.getState().scratchPaint.selectedItems.length > 0 &&
                    !(elem.parentElement.children.length > 5)
            }, false);
        if (typeof prevEventHandler === "function") {
            prevEventHandler();
        }

        const containerWrapper = document.createElement("div");
        const rowHeader = Object.assign(document.createElement("div"), {
            className: scratchClass("color-picker_row-header"),
        });

        const saLabelName = Object.assign(document.createElement("span"), {
            className: scratchClass("color-picker_label-name"),
            textContent: "Opacity",
        });

        const defaultAlpha = tinycolor(getColor()).toRgb().a;
        labelReadout = Object.assign(document.createElement("span"), {
            className: "sa-color-picker_label-readout",
        });
        labelReadout.textContent = Math.round(defaultAlpha * 100);

        const defaultColor = getColor();
        saOpacitySlider = Object.assign(document.createElement("div"), {
            className: `sa-opacity-slider ${scratchClass("slider_container", "slider_last")}`,
        });
        saOpacitySlider.addEventListener("click", handleClickBackground);

        saOpacitySliderBg = Object.assign(document.createElement("div"), {
            className: "sa-opacity-slider-bg",
        });
        setSliderBg(defaultColor);

        saOpacityHandle = Object.assign(document.createElement("div"), {
            className: `sa-opacity-handle ${scratchClass("slider_handle")}`,
        });
        saOpacityHandle.addEventListener("mousedown", handleMouseDown);
        saOpacityHandle.addEventListener("click", (event) => event.stopPropagation());

        const lastSlider = document.querySelector('[class*="slider_last"]');
        lastSlider.className = scratchClass("slider_container");
        setHandlePos(defaultAlpha);

        prevEventHandler = () => {
            var action = redux.getState().lastAction || {};
            if (
                action.type === "scratch-paint/fill-style/CHANGE_FILL_COLOR" ||
                action.type === "scratch-paint/fill-style/CHANGE_FILL_COLOR_2" ||
                action.type === "scratch-paint/stroke-style/CHANGE_STROKE_COLOR" ||
                action.type === "scratch-paint/stroke-style/CHANGE_STROKE_COLOR_2" ||
                action.type === "scratch-paint/color-index/CHANGE_COLOR_INDEX"
            ) {
                const color = getColor();
                setSliderBg(color);
                if (action.type === "scratch-paint/color-index/CHANGE_COLOR_INDEX") {
                    labelReadout.textContent = Math.round(tinycolor(color).toRgb().a * 100);
                    setHandlePos(tinycolor(color).toRgb().a);
                }
            }
        };
        prevEventHandler = redux.subscribe(prevEventHandler);

        if (redux.getState().scratchPaint.format.startsWith("BITMAP")) continue;

        containerWrapper.appendChild(rowHeader);
        containerWrapper.appendChild(saOpacitySlider);
        rowHeader.appendChild(saLabelName);
        rowHeader.appendChild(labelReadout);
        saOpacitySlider.appendChild(saOpacitySliderBg);
        saOpacitySlider.appendChild(saOpacityHandle);
        const brightnessSlider = Array.from(element.parentElement.children).filter(
            (e) => !e.querySelector("div[class*=color-picker_gradient-picker-row]")
        )[2];
        brightnessSlider.after(containerWrapper);
    }
}
module.exports = {
    func: (waitForElem, scratchClass) => {
        if (localStorage.getItem("opacity") !== "true") {
            return;
        }
        require("./lib/tinycolor-min").init();
        opacity(waitForElem, scratchClass);
        var s = document.createElement("style");
        s.innerHTML = `
        .sa-opacity-slider {
            /* overflow: hidden; */
            background-image: linear-gradient(45deg, #eaf0f8 25%, transparent 25%, transparent 75%, #eaf0f8 75%),
                linear-gradient(45deg, #eaf0f8 25%, transparent 25%, transparent 75%, #eaf0f8 75%);
            background-size: 20px 20px;
            background-position:
                0 0,
                10px 10px;
        }

        .sa-opacity-slider-bg {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 11px;
        }
        
        .sa-color-picker_label-readout {
            margin-left: 10px;
        }`;
        document.head.appendChild(s);
    }
}