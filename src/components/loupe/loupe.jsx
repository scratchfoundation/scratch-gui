import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import Box from '../box/box.jsx';
import styles from './loupe.css';

const zoomScale = 3;

class LoupeComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setCanvas'
        ]);
    }
    componentDidUpdate () {
        this.draw();
    }
    draw () {
        const boxSize = 6 / zoomScale;
        const boxLineWidth = 1 / zoomScale;
        const colorRingWidth = 15 / zoomScale;

        const ctx = this.canvas.getContext('2d');
        const {color, data, width, height} = this.props.colorInfo;
        this.canvas.width = zoomScale * width;
        this.canvas.height = zoomScale * height;

        // In order to scale the image data, must draw to a tmp canvas first
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = width;
        tmpCanvas.height = height;
        const tmpCtx = tmpCanvas.getContext('2d');
        const imageData = tmpCtx.createImageData(width, height);
        imageData.data.set(data);
        tmpCtx.putImageData(imageData, 0, 0);

        // Scale the loupe canvas and draw the zoomed image
        ctx.save();
        ctx.scale(zoomScale, zoomScale);
        ctx.drawImage(tmpCanvas, 0, 0, width, height);

        // Draw an outlined square at the cursor position (cursor is hidden)
        ctx.lineWidth = boxLineWidth;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        ctx.beginPath();
        ctx.rect((width / 2) - (boxSize / 2), (height / 2) - (boxSize / 2), boxSize, boxSize);
        ctx.fill();
        ctx.stroke();

        // Draw a thick ring around the loupe showing the current color
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        ctx.lineWidth = colorRingWidth;
        ctx.beginPath();
        ctx.moveTo(width, height / 2);
        ctx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
    setCanvas (element) {
        this.canvas = element;
    }
    render () {
        const {
            colorInfo,
            ...boxProps
        } = this.props;
        return (
            <Box
                {...boxProps}
                className={styles.colorPicker}
                componentRef={this.setCanvas}
                element="canvas"
                height={colorInfo.height}
                style={{
                    top: colorInfo.y - ((zoomScale * colorInfo.height) / 2),
                    left: colorInfo.x - ((zoomScale * colorInfo.width) / 2),
                    width: colorInfo.width * zoomScale,
                    height: colorInfo.height * zoomScale
                }}
                width={colorInfo.width}
            />
        );
    }
}

LoupeComponent.propTypes = {
    colorInfo: PropTypes.shape({
        color: PropTypes.shape({
            r: PropTypes.number,
            g: PropTypes.number,
            b: PropTypes.number
        }),
        data: PropTypes.instanceOf(Uint8Array),
        width: PropTypes.number,
        height: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number
    })
};

export default LoupeComponent;
