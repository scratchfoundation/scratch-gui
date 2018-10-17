import React from 'react';
import PropTypes from 'prop-types';

const StageAFrameSprites = ({
    sprites
}) => (
    sprites.map((sprite, index) => (
        <a-image
            key={index}
            material="alphaTest: 0.5"
            position={index + ' 0.5 -3'}
            src={sprite}
        />
    ))
);

StageAFrameSprites.propTypes = {
    sprites: PropTypes.arrayOf(PropTypes.string)
};

export default StageAFrameSprites;
