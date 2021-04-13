export default async function ({ addon, global, console }) {
  // TODO: Switch completely to Blockly?
  // Well anyway future self, here you go: https://github.com/LLK/scratch-blocks/compare/hotfix/totally-normal-2020
  const inject = async () => ((await addon.tab.traps.getBlockly()).BlockSvg.START_HAT_HEIGHT = 31);
  if (addon.tab.editorMode === "editor") {
    const interval = setInterval(() => {
      if (Blockly.getMainWorkspace()) {
        inject();
        clearInterval(interval);
      }
    }, 100);
  }
  addon.tab.addEventListener("urlChange", () => addon.tab.editorMode === "editor" && inject());

  var LEFT_EAR_UP = "c -1 -12.5 5.3 -23.3 8.4 -24.8 c 3.7 -1.8 16.5 13.1 18.4 15.4";
  var LEFT_EAR_DOWN = "c -5.8 -4.8 -8 -18 -4.9 -19.5 c 3.7 -1.8 24.5 11.1 31.7 10.1";
  var RIGHT_EAR_UP = "c 1.9 -2.3 14.7 -17.2 18.4 -15.4 c 3.1 1.5 9.4 12.3 8.4 24.8";
  var RIGHT_EAR_DOWN = "c 7.2 1 28 -11.9 31.7 -10.1 c 3.1 1.5 0.9 14.7 -4.9 19.5";
  // Ears look slightly different for define hat blocks
  var DEFINE_HAT_LEFT_EAR_UP = "c 0 -7.1 3.7 -13.3 9.3 -16.9 c 1.7 -7.5 5.4 -13.2 7.6 -14.2 c 2.6 -1.3 10 6 14.6 11.1";
  var DEFINE_HAT_RIGHT_EAR_UP = "h 33 c 4.6 -5.1 11.9 -12.4 14.6 -11.1 c 1.9 0.9 4.9 5.2 6.8 11.1 c 2.6 0 5.2 0 7.8 0";
  var DEFINE_HAT_LEFT_EAR_DOWN =
    "c 0 -4.6 1.6 -8.9 4.3 -12.3 c -2.4 -5.6 -2.9 -12.4 -0.7 -13.4 c 2.1 -1 9.6 2.6 17 5.8 c 2.6 0 6.2 0 10.9 0";
  var DEFINE_HAT_RIGHT_EAR_DOWN = "c 0 0 25.6 0 44 0 c 7.4 -3.2 14.8 -6.8 16.9 -5.8 c 1.2 0.6 1.6 2.9 1.3 5.8";

  async function catBlockify(hat) {
    while (true) {
      if (hat) {
        let hatblock = await addon.tab.waitForElement("[data-shapes='hat']", { markAsSeen: true });
        const path = hatblock.querySelector("path");
        let hatpath = path.getAttribute("d");
        path.setAttribute(
          "d",
          hatpath.replace(
            "c 25,-22 71,-22 96,0",
            `c2.6,-2.3 5.5,-4.3 8.5,-6.2${LEFT_EAR_UP}c8.4,-1.3 17,-1.3 25.4,0${RIGHT_EAR_UP}c3,1.8 5.9,3.9 8.5,6.1`
          )
        );
        insertCatStuff(hatblock);
      } else {
        let customblock = await addon.tab.waitForElement("[data-shapes='c-block c-1 hat']", { markAsSeen: true });
        const path = customblock.querySelector("path");
        let custompath = path.getAttribute("d");
        path.setAttribute(
          "d",
          custompath.replace("a 20,20 0 0,1 20,-20", DEFINE_HAT_LEFT_EAR_UP + DEFINE_HAT_RIGHT_EAR_UP)
        );
        insertCatStuff(customblock);
      }
    }
  }
  function insertCatStuff(to) {
    let outerG = to.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
    outerG.setAttribute("fill", "#000000");
    let path1 = outerG.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    path1.setAttribute(
      "d",
      "M25.2-1.1c0.1,0,0.2,0,0.2,0l8.3-2.1l-7-4.8c-0.5-0.3-1.1-0.2-1.4,0.3s-0.2,1.1,0.3,1.4L29-4.1l-4,1c-0.5,0.1-0.9,0.7-0.7,1.2C24.3-1.4,24.7-1.1,25.2-1.1z"
    );
    path1.setAttribute("fill-opacity", "0");
    let path2 = outerG.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    path2.setAttribute(
      "d",
      "M62.4-1.1c-0.1,0-0.2,0-0.2,0l-8.3-2.1l7-4.8c0.5-0.3,1.1-0.2,1.4,0.3s0.2,1.1-0.3,1.4l-3.4,2.3l4,1c0.5,0.1,0.9,0.7,0.7,1.2C63.2-1.4,62.8-1.1,62.4-1.1z"
    );
    path2.setAttribute("fill-opacity", "0");
    let eye1 = outerG.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "circle"));
    eye1.setAttribute("cx", "59.2");
    eye1.setAttribute("cy", "-3.3");
    eye1.setAttribute("r", "3.4");
    eye1.setAttribute("fill-opacity", "0.6");
    let eye2 = outerG.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "circle"));
    eye2.setAttribute("cx", "29.1");
    eye2.setAttribute("cy", "-3.3");
    eye2.setAttribute("r", "3.4");
    eye2.setAttribute("fill-opacity", "0.6");
    let mouth = outerG.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    mouth.setAttribute(
      "d",
      "M45.6,0.1c-0.9,0-1.7-0.3-2.3-0.9c-0.6,0.6-1.3,0.9-2.2,0.9c-0.9,0-1.8-0.3-2.3-0.9c-1-1.1-1.1-2.6-1.1-2.8c0-0.5,0.5-1,1-1l0,0c0.6,0,1,0.5,1,1c0,0.4,0.1,1.7,1.4,1.7c0.5,0,0.7-0.2,0.8-0.3c0.3-0.3,0.4-1,0.4-1.3c0-0.1,0-0.1,0-0.2c0-0.5,0.5-1,1-1l0,0c0.5,0,1,0.4,1,1c0,0,0,0.1,0,0.2c0,0.3,0.1,0.9,0.4,1.2C44.8-2.2,45-2,45.5-2s0.7-0.2,0.8-0.3c0.3-0.4,0.4-1.1,0.3-1.3c0-0.5,0.4-1,0.9-1.1c0.5,0,1,0.4,1.1,0.9c0,0.2,0.1,1.8-0.8,2.8C47.5-0.4,46.8,0.1,45.6,0.1z"
    );
    mouth.setAttribute("fill-opacity", "0.6");
    let ear2 = to.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    ear2.setAttribute(
      "d",
      "M73.1-15.6c1.7-4.2,4.5-9.1,5.8-8.5c1.6,0.8,5.4,7.9,5,15.4c0,0.6-0.7,0.7-1.1,0.5c-3-1.6-6.4-2.8-8.6-3.6C72.8-12.3,72.4-13.7,73.1-15.6z"
    );
    ear2.setAttribute("fill", "#FFD5E6");
    ear2.setAttribute("fill-opacity", "");
    let ear1 = to.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    ear1.setAttribute(
      "d",
      "M22.4-15.6c-1.7-4.2-4.5-9.1-5.8-8.5c-1.6,0.8-5.4,7.9-5,15.4c0,0.6,0.7,0.7,1.1,0.5c3-1.6,6.4-2.8,8.6-3.6C22.8-12.3,23.2-13.7,22.4-15.6z"
    );
    ear1.setAttribute("fill", "#FFD5E6");
    ear1.setAttribute("fill-opacity", "");

    let blinkFn,
      earFn,
      ear2Fn,
      svgBlock = to.querySelector("path");

    svgBlock.addEventListener("mouseenter", () => {
      clearTimeout(blinkFn);
      // blink
      eye1.setAttribute("fill-opacity", "0");
      eye2.setAttribute("fill-opacity", "0");
      path1.setAttribute("fill-opacity", "0.6");
      path2.setAttribute("fill-opacity", "0.6");

      // reset after a short delay
      blinkFn = setTimeout(() => {
        eye1.setAttribute("fill-opacity", "0.6");
        eye2.setAttribute("fill-opacity", "0.6");
        path1.setAttribute("fill-opacity", "0");
        path2.setAttribute("fill-opacity", "0");
      }, 100);
    });

    ear1.addEventListener("mouseenter", () => {
      clearTimeout(earFn);
      clearTimeout(ear2Fn);
      // ear flick
      ear2.setAttribute("fill-opacity", "");
      ear1.setAttribute("fill-opacity", "0");
      svgBlock.setAttribute("d", svgBlock.getAttribute("d").replace(LEFT_EAR_UP, LEFT_EAR_DOWN));
      svgBlock.setAttribute("d", svgBlock.getAttribute("d").replace(DEFINE_HAT_LEFT_EAR_UP, DEFINE_HAT_LEFT_EAR_DOWN));
      svgBlock.setAttribute("d", svgBlock.getAttribute("d").replace(RIGHT_EAR_DOWN, RIGHT_EAR_UP));
      svgBlock.setAttribute(
        "d",
        svgBlock.getAttribute("d").replace(DEFINE_HAT_RIGHT_EAR_DOWN, DEFINE_HAT_RIGHT_EAR_UP)
      );
      // reset after a short delay
      ear2Fn = setTimeout(() => {
        ear1.setAttribute("fill-opacity", "");
        svgBlock.setAttribute("d", svgBlock.getAttribute("d").replace(LEFT_EAR_DOWN, LEFT_EAR_UP));
        svgBlock.setAttribute(
          "d",
          svgBlock.getAttribute("d").replace(DEFINE_HAT_LEFT_EAR_DOWN, DEFINE_HAT_LEFT_EAR_UP)
        );
      }, 50);
    });

    ear2.addEventListener("mouseenter", () => {
      clearTimeout(earFn);
      clearTimeout(ear2Fn);
      // ear flick
      ear1.setAttribute("fill-opacity", "");
      ear2.setAttribute("fill-opacity", "0");
      svgBlock.setAttribute("d", svgBlock.getAttribute("d").replace(RIGHT_EAR_UP, RIGHT_EAR_DOWN));
      svgBlock.setAttribute(
        "d",
        svgBlock.getAttribute("d").replace(DEFINE_HAT_RIGHT_EAR_UP, DEFINE_HAT_RIGHT_EAR_DOWN)
      );
      svgBlock.setAttribute("d", svgBlock.getAttribute("d").replace(LEFT_EAR_DOWN, LEFT_EAR_UP));
      svgBlock.setAttribute("d", svgBlock.getAttribute("d").replace(DEFINE_HAT_LEFT_EAR_DOWN, DEFINE_HAT_LEFT_EAR_UP));

      // reset after a short delay
      earFn = setTimeout(() => {
        ear2.setAttribute("fill-opacity", "");
        svgBlock.setAttribute("d", svgBlock.getAttribute("d").replace(RIGHT_EAR_DOWN, RIGHT_EAR_UP));
        svgBlock.setAttribute(
          "d",
          svgBlock.getAttribute("d").replace(DEFINE_HAT_RIGHT_EAR_DOWN, DEFINE_HAT_RIGHT_EAR_UP)
        );
      }, 50);
    });
  }
  catBlockify(false);
  catBlockify(true);
}
