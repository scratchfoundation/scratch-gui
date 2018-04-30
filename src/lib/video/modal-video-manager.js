import VideoProvider from './video-provider.js';
/**
 * Video Manager for Camera Modal
 */
class ModalVideoManager {
    constructor (canvas) {
        this._videoProvider = new VideoProvider();
        /**
         * Frame update interval
         * @type number
         */
        this._frameTimeout = 16;

        this._canvas = canvas;
        this._blankCanvasURL = this._canvas.toDataURL('image/png');
        // These values are double the stage dimensions so that the resulting
        // image does not have to get sized down to accomodate double resolution
        this._canvasWidth = 960; // Double Stage Width
        this._canvasHeight = 720; // Double Stage Height

    }

    enableVideo (onPermissionSuccess, afterFrameDraw) {
        const thisContext = this;
        this._videoProvider.enableVideo(afterFrameDraw).then(() => {
            if (onPermissionSuccess) onPermissionSuccess();
            const ctx = thisContext._canvas.getContext('2d');
            ctx.scale(-1, 1);
            ctx.translate(thisContext._canvasWidth * -1, 0);

            if (afterFrameDraw) {
                thisContext._videoProvider.video.onloadeddata = () => {
                    afterFrameDraw();
                };
            }

            thisContext._drawFrames();
        });
    }

    _drawFrames () {
        const video = this._videoProvider.video;
        // const drawImage = () => this._canvas.getContext('2d').drawImage(video,
        //     // source x, y, width, height
        //     0, 0, video.videoWidth, video.videoHeight,
        //     // dest x, y, width, height
        //     0, 0, this._canvasWidth, this._canvasHeight
        // );
        this._videoFeedInterval = setInterval(() =>
            this._canvas.getContext('2d').drawImage(video,
                // source x, y, width, height
                0, 0, video.videoWidth, video.videoHeight,
                // dest x, y, width, height
                0, 0, this._canvasWidth, this._canvasHeight
            ), this._frameTimeout);
        // drawImage();
    }

    takeSnapshot () {
        clearInterval(this._videoFeedInterval);
        // const currentCanvasURL =
        return this._canvas.toDataURL('image/png');
        // if (currentCanvasURL !== this._blankCanvasURL) return currentCanvasURL;
    }

    clearSnapshot () {
        this._drawFrames();
    }

    disableVideo () {
        this._videoProvider.disableVideo();
    }
}

export default ModalVideoManager;
