import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import styles from './loader.css';
import PropTypes from 'prop-types';

import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';
const message = (
    <FormattedMessage
        defaultMessage="Project is loaded"
        description="Indicator that project has loaded"
        id="gui.loader.isLoaded"
    />
);

const IsLoadedComponent = () => (
    <div id="projectIsLoaded" />
);
export default IsLoadedComponent;
