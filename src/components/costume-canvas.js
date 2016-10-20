const React = require('react');
const svgToImage = require('svg-to-image');
const xhr = require('xhr');

/**
 * @fileoverview
 * A component for rendering Scratch costume URLs to canvases.
 * Use for sprite library, costume library, sprite selector, etc.
 * Props include width, height, and direction (direction in Scratch value).
 */

class CostumeCanvas extends React.Component {
    componentDidMount () {
        this.load();
    }
    componentDidUpdate (prevProps) {
        if (prevProps.url !== this.props.url) {
            this.load();
        } else {
            if (prevProps.width !== this.props.width ||
                prevProps.height !== this.props.height ||
                prevProps.direction !== this.props.direction) {
                this.draw();
            }
        }
    }
    draw () {
        // Draw the costume to the rendered canvas.
        const img = this.img;
        const context = this.refs.costumeCanvas.getContext('2d');
        // Scale to fit.
        let scale;
        // Choose the larger dimension to scale by.
        if (img.width > img.height) {
            scale = this.refs.costumeCanvas.width / img.width;
        } else {
            scale = this.refs.costumeCanvas.height / img.height;
        }
        // Rotate by the Scratch-value direction.
        const angle = (-90 + this.props.direction) * Math.PI / 180;
        // Rotation origin point will be center of the canvas.
        const contextTranslateX = this.refs.costumeCanvas.width / 2;
        const contextTranslateY = this.refs.costumeCanvas.height / 2;
        // First, clear the canvas.
        context.clearRect(0, 0,
            this.refs.costumeCanvas.width, this.refs.costumeCanvas.height);
        // Translate the context to the center of the canvas,
        // then rotate canvas drawing by `angle`.
        context.translate(contextTranslateX, contextTranslateY);
        context.rotate(angle);
        context.drawImage(img,
            0, 0, img.width, img.height,
            -(scale * img.width / 2),  -(scale * img.height / 2),
            scale * img.width,
            scale * img.height);
        // Reset the canvas rotation and translation to 0, (0, 0).
        context.rotate(-angle);
        context.translate(-contextTranslateX, -contextTranslateY);
    }
    load () {
        // Draw the icon on our canvas.
        const url = this.props.url;
        if (url.indexOf('.svg') > -1) {
            // Vector graphics: need to download with XDR and rasterize.
            // Queue request asynchronously.
            setTimeout(() => {
                xhr.get({
                    useXDR: true,
                    url: url
                }, (err, response, body) => {
                    if (!err) {
                        svgToImage(body, (err, img) => {
                            if (!err) {
                                this.img = img;
                                this.draw();
                            }
                        });
                    }
                });
            }, 0);

        } else {
            // Raster graphics: create Image and draw it.
            let img = new Image();
            img.src = url;
            img.onload = () => {
                this.img = img;
                this.draw();
            };
        }
    }
    render () {
        return <canvas
            ref='costumeCanvas'
            width={this.props.width}
            height={this.props.height}
        />;
    }
}

CostumeCanvas.defaultProps = {
    width: 100,
    height: 100,
    direction: 90
};

CostumeCanvas.propTypes = {
    url: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    direction: React.PropTypes.number
};

module.exports = CostumeCanvas;
