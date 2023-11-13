module.exports = {
  func: function (createBlockContextMenu) {
    function makeStyle() {
      let style = document.createElement("style");
      style.textContent = `
        .blocklyText {
            fill: #fff;
            font-family: "Helvetica Neue", Helvetica, sans-serif;
            font-size: 12pt;
            font-weight: 500;
        }
        .blocklyNonEditableText>text, .blocklyEditableText>text {
            fill: #575E75;
        }
        .blocklyDropdownText {
            fill: #fff !important;
        }
        `;
      for (let userstyle of document.querySelectorAll(
        ".scratch-addons-style[data-addon-id='editor-theme3']"
      )) {
        if (userstyle.disabled) continue;
        style.textContent += userstyle.textContent;
      }
      return style;
    }

    function setCSSVars(element) {
      for (let property of document.documentElement.style) {
        if (property.startsWith("--editorTheme3-"))
          element.style.setProperty(
            property,
            document.documentElement.style.getPropertyValue(property)
          );
      }
    }
    if (localStorage.getItem("blocks2image") === "true") {
      let exSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      exSVG.setAttribute("xmlns:html", "http://www.w3.org/1999/xhtml");
      exSVG.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      exSVG.setAttribute("version", "1.1");

      let blocksMedia = new Map();
      blocksMedia.set(
        "repeat.svg",
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9InJlcGVhdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNDRjhCMTc7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8dGl0bGU+cmVwZWF0PC90aXRsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTIzLjMsMTFjLTAuMywwLjYtMC45LDEtMS41LDFoLTEuNmMtMC4xLDEuMy0wLjUsMi41LTEuMSwzLjZjLTAuOSwxLjctMi4zLDMuMi00LjEsNC4xCgljLTEuNywwLjktMy42LDEuMi01LjUsMC45Yy0xLjgtMC4zLTMuNS0xLjEtNC45LTIuM2MtMC43LTAuNy0wLjctMS45LDAtMi42YzAuNi0wLjYsMS42LTAuNywyLjMtMC4ySDdjMC45LDAuNiwxLjksMC45LDIuOSwwLjkKCXMxLjktMC4zLDIuNy0wLjljMS4xLTAuOCwxLjgtMi4xLDEuOC0zLjVoLTEuNWMtMC45LDAtMS43LTAuNy0xLjctMS43YzAtMC40LDAuMi0wLjksMC41LTEuMmw0LjQtNC40YzAuNy0wLjYsMS43LTAuNiwyLjQsMEwyMyw5LjIKCUMyMy41LDkuNywyMy42LDEwLjQsMjMuMywxMXoiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTIxLjgsMTFoLTIuNmMwLDEuNS0wLjMsMi45LTEsNC4yYy0wLjgsMS42LTIuMSwyLjgtMy43LDMuNmMtMS41LDAuOC0zLjMsMS4xLTQuOSwwLjhjLTEuNi0wLjItMy4yLTEtNC40LTIuMQoJYy0wLjQtMC4zLTAuNC0wLjktMC4xLTEuMmMwLjMtMC40LDAuOS0wLjQsMS4yLTAuMWwwLDBjMSwwLjcsMi4yLDEuMSwzLjQsMS4xczIuMy0wLjMsMy4zLTFjMC45LTAuNiwxLjYtMS41LDItMi42CgljMC4zLTAuOSwwLjQtMS44LDAuMi0yLjhoLTIuNGMtMC40LDAtMC43LTAuMy0wLjctMC43YzAtMC4yLDAuMS0wLjMsMC4yLTAuNGw0LjQtNC40YzAuMy0wLjMsMC43LTAuMywwLjksMEwyMiw5LjgKCWMwLjMsMC4zLDAuNCwwLjYsMC4zLDAuOVMyMiwxMSwyMS44LDExeiIvPgo8L3N2Zz4K"
      );
      blocksMedia.set(
        "green-flag.svg",
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ImdyZWVuZmxhZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM0NTk5M0Q7fQoJLnN0MXtmaWxsOiM0Q0JGNTY7fQo8L3N0eWxlPgo8dGl0bGU+Z3JlZW5mbGFnPC90aXRsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTIwLjgsMy43Yy0wLjQtMC4yLTAuOS0wLjEtMS4yLDAuMmMtMiwxLjYtNC44LDEuNi02LjgsMGMtMi4zLTEuOS01LjYtMi4zLTguMy0xVjIuNWMwLTAuNi0wLjUtMS0xLTEKCXMtMSwwLjQtMSwxdjE4LjhjMCwwLjUsMC41LDEsMSwxaDAuMWMwLjUsMCwxLTAuNSwxLTF2LTYuNGMxLTAuNywyLjEtMS4yLDMuNC0xLjNjMS4yLDAsMi40LDAuNCwzLjQsMS4yYzIuOSwyLjMsNywyLjMsOS44LDAKCWMwLjMtMC4yLDAuNC0wLjUsMC40LTAuOVY0LjdDMjEuNiw0LjIsMjEuMywzLjgsMjAuOCwzLjd6IE0yMC41LDEzLjlDMjAuNSwxMy45LDIwLjUsMTMuOSwyMC41LDEzLjlDMTgsMTYsMTQuNCwxNiwxMS45LDE0CgljLTEuMS0wLjktMi41LTEuNC00LTEuNGMtMS4yLDAuMS0yLjMsMC41LTMuNCwxLjFWNEM3LDIuNiwxMCwyLjksMTIuMiw0LjZjMi40LDEuOSw1LjcsMS45LDguMSwwYzAuMSwwLDAuMSwwLDAuMiwwCgljMCwwLDAuMSwwLjEsMC4xLDAuMUwyMC41LDEzLjl6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMC42LDQuOGwtMC4xLDkuMWMwLDAsMCwwLjEsMCwwLjFjLTIuNSwyLTYuMSwyLTguNiwwYy0xLjEtMC45LTIuNS0xLjQtNC0xLjRjLTEuMiwwLjEtMi4zLDAuNS0zLjQsMS4xVjQKCUM3LDIuNiwxMCwyLjksMTIuMiw0LjZjMi40LDEuOSw1LjcsMS45LDguMSwwYzAuMSwwLDAuMSwwLDAuMiwwQzIwLjUsNC43LDIwLjYsNC43LDIwLjYsNC44eiIvPgo8L3N2Zz4K"
      );
      blocksMedia.set(
        "rotate-left.svg",
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIGlkPSJyb3RhdGUtY2xvY2t3aXNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHN0eWxlPi5jbHMtMXtmaWxsOiMzZDc5Y2M7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PHRpdGxlPnJvdGF0ZS1jbG9ja3dpc2U8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIwLjM0LDE4LjIxYTEwLjI0LDEwLjI0LDAsMCwxLTguMSw0LjIyLDIuMjYsMi4yNiwwLDAsMS0uMTYtNC41MmgwYTUuNTgsNS41OCwwLDAsMCw0LjI1LTIuNTMsNS4wNiw1LjA2LDAsMCwwLC41NC00LjYyQTQuMjUsNC4yNSwwLDAsMCwxNS41NSw5YTQuMzEsNC4zMSwwLDAsMC0yLS44QTQuODIsNC44MiwwLDAsMCwxMC40LDlsMS4xMiwxLjQxQTEuNTksMS41OSwwLDAsMSwxMC4zNiwxM0gyLjY3YTEuNTYsMS41NiwwLDAsMS0xLjI2LS42M0ExLjU0LDEuNTQsMCwwLDEsMS4xMywxMUwyLjg1LDMuNTdBMS41OSwxLjU5LDAsMCwxLDQuMzgsMi40LDEuNTcsMS41NywwLDAsMSw1LjYyLDNMNi43LDQuMzVhMTAuNjYsMTAuNjYsMCwwLDEsNy43Mi0xLjY4QTkuODgsOS44OCwwLDAsMSwxOSw0LjgxLDkuNjEsOS42MSwwLDAsMSwyMS44Myw5LDEwLjA4LDEwLjA4LDAsMCwxLDIwLjM0LDE4LjIxWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE5LjU2LDE3LjY1YTkuMjksOS4yOSwwLDAsMS03LjM1LDMuODMsMS4zMSwxLjMxLDAsMCwxLS4wOC0yLjYyLDYuNTMsNi41MywwLDAsMCw1LTIuOTIsNi4wNSw2LjA1LDAsMCwwLC42Ny01LjUxLDUuMzIsNS4zMiwwLDAsMC0xLjY0LTIuMTYsNS4yMSw1LjIxLDAsMCwwLTIuNDgtMUE1Ljg2LDUuODYsMCwwLDAsOSw4Ljg0TDEwLjc0LDExYS41OS41OSwwLDAsMS0uNDMsMUgyLjdhLjYuNiwwLDAsMS0uNi0uNzVMMy44MSwzLjgzYS41OS41OSwwLDAsMSwxLS4yMWwxLjY3LDIuMWE5LjcxLDkuNzEsMCwwLDEsNy43NS0yLjA3LDguODQsOC44NCwwLDAsMSw0LjEyLDEuOTIsOC42OCw4LjY4LDAsMCwxLDIuNTQsMy43MkE5LjE0LDkuMTQsMCwwLDEsMTkuNTYsMTcuNjVaIi8+PC9zdmc+"
      );
      blocksMedia.set(
        "rotate-right.svg",
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIGlkPSJyb3RhdGUtY291bnRlci1jbG9ja3dpc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzNkNzljYzt9LmNscy0ye2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPnJvdGF0ZS1jb3VudGVyLWNsb2Nrd2lzZTwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjIuNjgsMTIuMmExLjYsMS42LDAsMCwxLTEuMjcuNjNIMTMuNzJhMS41OSwxLjU5LDAsMCwxLTEuMTYtMi41OGwxLjEyLTEuNDFhNC44Miw0LjgyLDAsMCwwLTMuMTQtLjc3LDQuMzEsNC4zMSwwLDAsMC0yLC44LDQuMjUsNC4yNSwwLDAsMC0xLjM0LDEuNzMsNS4wNiw1LjA2LDAsMCwwLC41NCw0LjYyQTUuNTgsNS41OCwwLDAsMCwxMiwxNy43NGgwYTIuMjYsMi4yNiwwLDAsMS0uMTYsNC41MkExMC4yNSwxMC4yNSwwLDAsMSwzLjc0LDE4LDEwLjE0LDEwLjE0LDAsMCwxLDIuMjUsOC43OCw5LjcsOS43LDAsMCwxLDUuMDgsNC42NCw5LjkyLDkuOTIsMCwwLDEsOS42NiwyLjVhMTAuNjYsMTAuNjYsMCwwLDEsNy43MiwxLjY4bDEuMDgtMS4zNWExLjU3LDEuNTcsMCwwLDEsMS4yNC0uNiwxLjYsMS42LDAsMCwxLDEuNTQsMS4yMWwxLjcsNy4zN0ExLjU3LDEuNTcsMCwwLDEsMjIuNjgsMTIuMloiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yMS4zOCwxMS44M0gxMy43N2EuNTkuNTksMCwwLDEtLjQzLTFsMS43NS0yLjE5YTUuOSw1LjksMCwwLDAtNC43LTEuNTgsNS4wNyw1LjA3LDAsMCwwLTQuMTEsMy4xN0E2LDYsMCwwLDAsNywxNS43N2E2LjUxLDYuNTEsMCwwLDAsNSwyLjkyLDEuMzEsMS4zMSwwLDAsMS0uMDgsMi42Miw5LjMsOS4zLDAsMCwxLTcuMzUtMy44MkE5LjE2LDkuMTYsMCwwLDEsMy4xNyw5LjEyLDguNTEsOC41MSwwLDAsMSw1LjcxLDUuNCw4Ljc2LDguNzYsMCwwLDEsOS44MiwzLjQ4YTkuNzEsOS43MSwwLDAsMSw3Ljc1LDIuMDdsMS42Ny0yLjFhLjU5LjU5LDAsMCwxLDEsLjIxTDIyLDExLjA4QS41OS41OSwwLDAsMSwyMS4zOCwxMS44M1oiLz48L3N2Zz4="
      );
      blocksMedia.set(
        "dropdown-arrow.svg",
        "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MSIgaGVpZ2h0PSI4Ljc5IiB2aWV3Qm94PSIwIDAgMTIuNzEgOC43OSI+PHRpdGxlPmRyb3Bkb3duLWFycm93PC90aXRsZT48ZyBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0xMi43MSwyLjQ0QTIuNDEsMi40MSwwLDAsMSwxMiw0LjE2TDguMDgsOC4wOGEyLjQ1LDIuNDUsMCwwLDEtMy40NSwwTDAuNzIsNC4xNkEyLjQyLDIuNDIsMCwwLDEsMCwyLjQ0LDIuNDgsMi40OCwwLDAsMSwuNzEuNzFDMSwwLjQ3LDEuNDMsMCw2LjM2LDBTMTEuNzUsMC40NiwxMiwuNzFBMi40NCwyLjQ0LDAsMCwxLDEyLjcxLDIuNDRaIiBmaWxsPSIjMjMxZjIwIi8+PC9nPjxwYXRoIGQ9Ik02LjM2LDcuNzlhMS40MywxLjQzLDAsMCwxLTEtLjQyTDEuNDIsMy40NWExLjQ0LDEuNDQsMCwwLDEsMC0yYzAuNTYtLjU2LDkuMzEtMC41Niw5Ljg3LDBhMS40NCwxLjQ0LDAsMCwxLDAsMkw3LjM3LDcuMzdBMS40MywxLjQzLDAsMCwxLDYuMzYsNy43OVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
      );

      createBlockContextMenu(
        (items) => {
          let svgchild = document.querySelector(
            "svg.blocklySvg g.blocklyBlockCanvas"
          );

          const pasteItemIndex = items.findIndex((obj) => obj._isDevtoolsFirstItem);
          const insertBeforeIndex =
            pasteItemIndex !== -1
              ? // If "paste" button exists, add own items before it
              pasteItemIndex
              : // If there's no such button, insert at end
              items.length;

          items.splice(
            insertBeforeIndex,
            0,
            {
              enabled: !!svgchild?.childNodes?.length,
              text: "Export All to SVG",
              callback: () => {
                exportBlock(false);
              },
              separator: true,
            },
            {
              enabled: !!svgchild?.childNodes?.length,
              text: "Export All to PNG",
              callback: () => {
                exportBlock(true);
              },
              separator: false,
            }
          );

          return items;
        },
        { workspace: true }
      );
      createBlockContextMenu(
        (items, block) => {
          const makeSpaceItemIndex = items.findIndex(
            (obj) => obj._isDevtoolsFirstItem
          );
          const insertBeforeIndex =
            makeSpaceItemIndex !== -1
              ? // If "make space" button exists, add own items before it
              makeSpaceItemIndex
              : // If there's no such button, insert at end
              items.length;

          items.splice(
            insertBeforeIndex,
            0,
            {
              enabled: true,
              text: "Export Selected Block to SVG",
              callback: () => {
                exportBlock(false, block);
              },
              separator: true,
            },
            {
              enabled: true,
              text: "Export Selected Block to PNG",
              callback: () => {
                exportBlock(true, block);
              },
              separator: false,
            }
          );

          return items;
        },
        { blocks: true }
      );
    }



    function exportBlock(isExportPNG, block) {
      let svg;
      if (block) {
        svg = selectedBlocks(isExportPNG, block);
      } else {
        svg = allBlocks(isExportPNG);
      }
      // resolve nbsp whitespace
      svg.querySelectorAll("text").forEach((text) => {
        text.innerHTML = text.innerHTML.replace(/&nbsp;/g, " ");
      });
      // resolve image path
      let scratchURL = window.location.origin;

      svg.querySelectorAll("image").forEach((item) => {
        let builtinSvgData = blocksMedia.get(
          item
            .getAttribute("xlink:href")
            .substring(item.getAttribute("xlink:href").lastIndexOf("/") + 1)
        );
        if (builtinSvgData) {
          // replace svg file path (official) to inline svg
          item.setAttribute("xlink:href", builtinSvgData);
        } else if (item.getAttribute("xlink:href").indexOf("/static/") === 0) {
          // replace link path for third party website
          item.setAttribute(
            "xlink:href",
            scratchURL + item.getAttribute("xlink:href").slice(0)
          );
        } else if (item.getAttribute("xlink:href").indexOf("./static/") === 0) {
          item.setAttribute(
            "xlink:href",
            scratchURL + item.getAttribute("xlink:href").slice(1)
          );
        } else if (item.getAttribute("xlink:href").indexOf("static/") === 0) {
          item.setAttribute(
            "xlink:href",
            scratchURL + "/" + item.getAttribute("xlink:href")
          );
        }
      });
      if (!isExportPNG) {
        exportData(new XMLSerializer().serializeToString(svg));
      } else {
        exportPNG(svg);
      }
    }

    function selectedBlocks(isExportPNG, block) {
      let svg = exSVG.cloneNode();

      let svgchild = block.svgGroup_;
      svgchild = svgchild.cloneNode(true);
      let dataShapes = svgchild.getAttribute("data-shapes");
      svgchild.setAttribute(
        "transform",
        `translate(0,${dataShapes === "hat" ? "18" : "0"}) ${isExportPNG ? "scale(2)" : ""
        }`
      );
      setCSSVars(svg);
      svg.append(makeStyle());
      svg.append(svgchild);
      return svg;
    }

    function allBlocks(isExportPNG) {
      let svg = exSVG.cloneNode();

      let svgchild = document.querySelector("svg.blocklySvg g.blocklyBlockCanvas");
      svgchild = svgchild.cloneNode(true);

      let xArr = [];
      let yArr = [];

      svgchild.childNodes.forEach((g) => {
        let x =
          g.getAttribute("transform").match(/translate\((.*?),(.*?)\)/)[1] || 0;
        let y =
          g.getAttribute("transform").match(/translate\((.*?),(.*?)\)/)[2] || 0;
        xArr.push(x * (isExportPNG ? 2 : 1));
        yArr.push(y * (isExportPNG ? 2 : 1));
      });

      svgchild.setAttribute(
        "transform",
        `translate(${-Math.min(...xArr)},${-Math.min(...yArr) + 18 * (isExportPNG ? 2 : 1)
        }) ${isExportPNG ? "scale(2)" : ""}`
      );
      setCSSVars(svg);
      svg.append(makeStyle());
      svg.append(svgchild);
      return svg;
    }

    function exportData(text) {
      const saveLink = document.createElement("a");
      document.body.appendChild(saveLink);

      const data = new Blob([text], { type: "text" });
      const url = window.URL.createObjectURL(data);
      saveLink.href = url;

      const date = new Date();
      const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
      saveLink.download = `block_${timestamp}.svg`;
      saveLink.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(saveLink);
    }

    function exportPNG(svg) {
      const serializer = new XMLSerializer();
      const iframe = document.createElement("iframe");
      document.body.append(iframe);
      iframe.contentDocument.write(serializer.serializeToString(svg));
      let { width, height } = iframe.contentDocument.body
        .querySelector("svg g")
        .getBoundingClientRect();
      height = height + 20 * 2;
      svg.setAttribute("width", width + "px");
      svg.setAttribute("height", height + "px");

      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let img = document.createElement("img");

      img.setAttribute(
        "src",
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(serializer.serializeToString(svg))))
      );
      img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        let dataURL = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        const date = new Date();
        const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;

        link.download = `block_${timestamp}.png`;
        link.href = dataURL;
        link.click();
        iframe.remove();
      };
    }
  }
}