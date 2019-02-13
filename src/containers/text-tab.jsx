import React from "react";
import PropTypes from "prop-types";
import VM from "scratch-vm";

import TextEditor from "./text-editor.jsx";
import AssetPanel from "../components/asset-panel/asset-panel.jsx";

const onItemClick = () => {};
const selectedItemIndex = 0;

const TextTab = props => (
    <AssetPanel
        buttons={[]}
        items={[]}
        selectedItemIndex={selectedItemIndex}
        onItemClick={onItemClick}
    >
        <TextEditor vm={props.vm} />
    </AssetPanel>
);

TextTab.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired
};

export default TextTab;
