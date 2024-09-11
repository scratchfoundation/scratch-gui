import musicIcon from "./extensions/musicIcon.svg";
import penIcon from "./extensions/penIcon.svg";
import text2speechIcon from "./extensions/text2speechIcon.svg";
import translateIcon from "./extensions/translateIcon.svg";
import videoSensingIcon from "./extensions/videoSensingIcon.svg";

// This object is passed directly to Blockly, hence the colour* fields need to
// be named exactly as they are, including the UK spelling of "colour".
const blockColors = {
    motion: {
        colourPrimary: "#80B5FF",
        colourSecondary: "#B3D2FF",
        colourTertiary: "#3373CC",
        colourQuaternary: "#CCE1FF",
    },
    looks: {
        colourPrimary: "#CCB3FF",
        colourSecondary: "#DDCCFF",
        colourTertiary: "#774DCB",
        colourQuaternary: "#EEE5FF",
    },
    sounds: {
        colourPrimary: "#E19DE1",
        colourSecondary: "#FFB3FF",
        colourTertiary: "#BD42BD",
        colourQuaternary: "#FFCCFF",
    },
    control: {
        colourPrimary: "#FFBE4C",
        colourSecondary: "#FFDA99",
        colourTertiary: "#CF8B17",
        colourQuaternary: "#FFE3B3",
    },
    event: {
        colourPrimary: "#FFD966",
        colourSecondary: "#FFECB3",
        colourTertiary: "#CC9900",
        colourQuaternary: "#FFF2CC",
    },
    sensing: {
        colourPrimary: "#85C4E0",
        colourSecondary: "#AED8EA",
        colourTertiary: "#2E8EB8",
        colourQuaternary: "#C2E2F0",
    },
    pen: {
        colourPrimary: "#13ECAF",
        colourSecondary: "#75F0CD",
        colourTertiary: "#0B8E69",
        colourQuaternary: "#A3F5DE",
    },
    operators: {
        colourPrimary: "#7ECE7E",
        colourSecondary: "#B5E3B5",
        colourTertiary: "#389438",
        colourQuaternary: "#DAF1DA",
    },
    data: {
        colourPrimary: "#FFA54C",
        colourSecondary: "#FFCC99",
        colourTertiary: "#DB6E00",
        colourQuaternary: "#FFE5CC",
    },
    // This is not a new category, but rather for differentiation
    // between lists and scalar variables.
    data_lists: {
        colourPrimary: "#FF9966",
        colourSecondary: "#FFCAB0", // I don't think this is used, b/c we don't have any droppable fields in list blocks
        colourTertiary: "#E64D00",
        colourQuaternary: "#FFDDCC",
    },
    more: {
        colourPrimary: "#FF99AA",
        colourSecondary: "#FFCCD5",
        colourTertiary: "#FF3355",
        colourQuaternary: "#FFE5EA",
    },
    text: "#000000",
    textFieldText: "#000000", // Text inside of inputs e.g. 90 in [point in direction (90)]
    toolboxText: "#000000", // Toolbox text, color picker text (used to be #575E75)
    // The color that the category menu label (e.g. 'motion', 'looks', etc.) changes to on hover
    toolboxHover: "#3373CC",
    insertionMarker: "#000000",
    insertionMarkerOpacity: 0.2,
    fieldShadow: "rgba(255, 255, 255, 0.3)",
    dragShadowOpacity: 0.6,
    menuHover: "rgba(255, 255, 255, 0.3)",
};

const extensions = {
    music: {
        blockIconURI: musicIcon,
    },
    pen: {
        blockIconURI: penIcon,
    },
    text2speech: {
        blockIconURI: text2speechIcon,
    },
    translate: {
        blockIconURI: translateIcon,
    },
    videoSensing: {
        blockIconURI: videoSensingIcon,
    },
};

export { blockColors, extensions };
