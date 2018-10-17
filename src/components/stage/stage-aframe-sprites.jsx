import React from 'react';
import PropTypes from 'prop-types';

const StageAFrameSprites = ({
    sprites
}) => (
    sprites.map((sprite, index) => (
        sprite.visible ? (
            <a-image
                height={sprite.height / 100}
                key={index}
                material="alphaTest: 0.5"
                position={sprite.x / 100 + ' ' + ((sprite.y + 180) / 100)  + ' ' + (-0.3 * index - 3)}
                src={sprite.url}
                width={sprite.width / 100}
            />
        ) : (
            ''
        )
    ))
);

StageAFrameSprites.propTypes = {
    sprites: PropTypes.arrayOf(PropTypes.string)
};

export default StageAFrameSprites;
