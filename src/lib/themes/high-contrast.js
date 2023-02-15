const blockColors = {
    motion: {
        primary: '#80B5FF',
        secondary: '#B3D2FF',
        tertiary: '#3373CC',
        // this field is not used in the "classic" Scratch 3 color scheme
        // If we add "modes" we'd have to handle what happens when this field is not defined.
        quaternary: '#CCE1FF'
    },
    looks: {
        primary: '#CCB3FF',
        secondary: '#DDCCFF',
        tertiary: '#774DCB',
        quaternary: '#EEE5FF'
    },
    sounds: {
        primary: '#E19DE1',
        secondary: '#FFB3FF',
        tertiary: '#BD42BD',
        quaternary: '#FFCCFF'

    },
    control: {
        primary: '#FFBE4C',
        secondary: '#FFDA99',
        tertiary: '#CF8B17',
        quaternary: '#FFE3B3'
    },
    event: {
        primary: '#FFD966',
        secondary: '#FFECB3',
        tertiary: '#CC9900',
        quaternary: '#FFF2CC'
    },
    sensing: {
        primary: '#85C4E0',
        secondary: '#AED8EA',
        tertiary: '#2E8EB8',
        quaternary: '#C2E2F0'
    },
    pen: {
        primary: '#13ECAF',
        secondary: '#75F0CD',
        tertiary: '#0B8E69',
        quaternary: '#A3F5DE'
    },
    operators: {
        primary: '#7ECE7E',
        secondary: '#B5E3B5',
        tertiary: '#389438',
        quaternary: '#DAF1DA'
    },
    data: {
        primary: '#FFA54C',
        secondary: '#FFCC99',
        tertiary: '#DB6E00',
        quaternary: '#FFE5CC'
    },
    // This is not a new category, but rather for differentiation
    // between lists and scalar variables.
    data_lists: {
        primary: '#FF9966',
        secondary: '#FFCAB0', // I don't think this is used, b/c we don't have any droppable fields in list blocks
        tertiary: '#E64D00',
        quaternary: '#FFDDCC'
    },
    more: {
        primary: '#FF99AA',
        secondary: '#FFCCD5',
        tertiary: '#FF3355',
        quaternary: '#FFE5EA'
    },
    // For productionizing: we should look into making this field be the color of the text on the blocks
    // e.g. move and steps in move (10) steps, and rename this property below for controlling the text inside
    // of inputs e.g. 10
    text: '#000000',
    textFieldText: '#000000', // Text inside of inputs e.g. 90 in [point in direction (90)]
    toolboxText: '#000000', // Toolbox text, color picker text (used to be #575E75)
    // The color that the category menu label (e.g. 'motion', 'looks', etc.) changes to on hover
    toolboxHover: '#3373CC',
    insertionMarker: '#000000',
    insertionMarkerOpacity: 0.2,
    fieldShadow: 'rgba(255, 255, 255, 0.3)',
    dragShadowOpacity: 0.6
};

export default blockColors;
