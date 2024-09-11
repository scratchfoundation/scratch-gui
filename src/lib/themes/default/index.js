// This object is passed directly to Blockly, hence the colour* fields need to
// be named exactly as they are, including the UK spelling of "colour".
const blockColors = {
    motion: {
        colourPrimary: "#4C97FF",
        colourSecondary: "#4280D7",
        colourTertiary: "#3373CC",
        colourQuaternary: "#3373CC",
    },
    looks: {
        colourPrimary: "#9966FF",
        colourSecondary: "#855CD6",
        colourTertiary: "#774DCB",
        colourQuaternary: "#774DCB",
    },
    sounds: {
        colourPrimary: "#CF63CF",
        colourSecondary: "#C94FC9",
        colourTertiary: "#BD42BD",
        colourQuaternary: "#BD42BD",
    },
    control: {
        colourPrimary: "#FFAB19",
        colourSecondary: "#EC9C13",
        colourTertiary: "#CF8B17",
        colourQuaternary: "#CF8B17",
    },
    event: {
        colourPrimary: "#FFBF00",
        colourSecondary: "#E6AC00",
        colourTertiary: "#CC9900",
        colourQuaternary: "#CC9900",
    },
    sensing: {
        colourPrimary: "#5CB1D6",
        colourSecondary: "#47A8D1",
        colourTertiary: "#2E8EB8",
        colourQuaternary: "#2E8EB8",
    },
    pen: {
        colourPrimary: "#0fBD8C",
        colourSecondary: "#0DA57A",
        colourTertiary: "#0B8E69",
        colourQuaternary: "#0B8E69",
    },
    operators: {
        colourPrimary: "#59C059",
        colourSecondary: "#46B946",
        colourTertiary: "#389438",
        colourQuaternary: "#389438",
    },
    data: {
        colourPrimary: "#FF8C1A",
        colourSecondary: "#FF8000",
        colourTertiary: "#DB6E00",
        colourQuaternary: "#DB6E00",
    },
    // This is not a new category, but rather for differentiation
    // between lists and scalar variables.
    data_lists: {
        colourPrimary: "#FF661A",
        colourSecondary: "#FF5500",
        colourTertiary: "#E64D00",
        colourQuaternary: "#E64D00",
    },
    more: {
        colourPrimary: "#FF6680",
        colourSecondary: "#FF4D6A",
        colourTertiary: "#FF3355",
        colourQuaternary: "#FF3355",
    },
    text: "#FFFFFF",
    workspace: "#F9F9F9",
    toolboxHover: "#4C97FF",
    toolboxSelected: "#E9EEF2",
    toolboxText: "#575E75",
    toolbox: "#FFFFFF",
    flyout: "#F9F9F9",
    scrollbar: "#CECDCE",
    scrollbarHover: "#CECDCE",
    textField: "#FFFFFF",
    textFieldText: "#575E75",
    insertionMarker: "#000000",
    insertionMarkerOpacity: 0.2,
    dragShadowOpacity: 0.6,
    stackGlow: "#FFF200",
    stackGlowSize: 4,
    stackGlowOpacity: 1,
    replacementGlow: "#FFFFFF",
    replacementGlowSize: 2,
    replacementGlowOpacity: 1,
    colourPickerStroke: "#FFFFFF",
    // CSS colours: support RGBA
    fieldShadow: "rgba(255, 255, 255, 0.3)",
    dropDownShadow: "rgba(0, 0, 0, .3)",
    numPadBackground: "#547AB2",
    numPadBorder: "#435F91",
    numPadActiveBackground: "#435F91",
    numPadText: "white", // Do not use hex here, it cannot be inlined with data-uri SVG
    valueReportBackground: "#FFFFFF",
    valueReportBorder: "#AAAAAA",
    menuHover: "rgba(0, 0, 0, 0.2)",
};

export { blockColors };
