import React from 'react';
import PropTypes from 'prop-types';
import VM from 'scratch-vm';

import TextEditor from './text-editor.jsx';
import AssetPanel from '../components/asset-panel/asset-panel.jsx';

/**
 * This is required by the asset panel to be able to render correctly.
 */
const onItemClick = () => {};

/**
 * This is required by the asset panel to be able to render correctly.
 */
const selectedItemIndex = 0;

/**
 * The asset panel to be displayed when the text tab is clicked in the GUI
 *
 * @param {React.Props} props The props being passed in to this component
 *
 * @returns {React.StatelessComponent} A stateless componenting containing the TextEditor
 */
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
