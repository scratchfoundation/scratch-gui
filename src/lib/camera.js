import getUserMedia from 'get-user-media-promise';
import log from './log.js';

const requestStack = [];
// Single Setup For All Video Streams
const requestVideoStream = videoDesc => {
    let streamPromise;
    if (requestStack.length === 0) {
        streamPromise = getUserMedia({
            audio: false,
            video: videoDesc
        });
        requestStack.push(streamPromise);
    } else if (requestStack.length > 0) {
        streamPromise = requestStack[0];
        requestStack.push(true);
    }
    return streamPromise;
};

const requestDisableCheck = () => {
    requestStack.pop();
    if (requestStack.length > 0) return false;
    return true;
};

class StageVideoProvider {
    constructor (runtime) {
        /**
         * Reference to the owning Runtime.
         * @type{!Runtime}
         */
        this.runtime = runtime;

        /**
         * Default value for mirrored frames.
         * @type boolean
         */
        this.mirror = true;

        /**
         * Cache frames for this many ms.
         * @type number
         */
        this._frameCacheTimeout = 16;

        /**
         * DOM Video element
         * @private
         */
        this._video = null;

        /**
         * Usermedia stream track
         * @private
         */
        this._track = null;

        /**
         * Stores some canvas/frame data per resolution/mirror states
         */
        this._workspace = [];

        /**
         * Id representing a Scratch Renderer skin the video is rendered to for
         * previewing.
         * @type {number}
         */
        this._skinId = -1;

        /**
         * The Scratch Renderer Skin object.
         * @type {Skin}
         */
        this._skin = null;

        /**
         * Id for a drawable using the video's skin that will render as a video
         * preview.
         * @type {Drawable}
         */
        this._drawable = -1;

        /**
         * Store the last state of the video transparency ghost effect
         * @type {number}
         */
        this._ghost = 0;
    }

    static get FORMAT_IMAGE_DATA () {
        return 'image-data';
    }

    static get FORMAT_CANVAS () {
        return 'canvas';
    }

    /**
     * Dimensions the video stream is analyzed at after its rendered to the
     * sample canvas.
     * @type {Array.<number>}
     */
    static get DIMENSIONS () {
        return [480, 360];
    }

    /**
     * Order preview drawable is inserted at in the renderer.
     * @type {number}
     */
    static get ORDER () {
        return 1;
    }

    /**
     * Request video be enabled.  Sets up video, creates video skin and enables preview.
     *
     * ioDevices.video.requestVideo()
     *
     * @return {Promise.<Video>} resolves a promise to this IO device when video is ready.
     */
    enableVideo () {
        this.enabled = true;
        return this._setupVideo();
    }

    /**
     * Disable video stream (turn video off)
     */
    disableVideo () {
        this.enabled = false;
        // If we have begun a setup process, call _teardown after it completes
        if (this._singleSetup) {
            this._singleSetup
                .then(this._teardown.bind(this))
                .catch(err => this.onError(err));
        }
    }

    /**
     * async part of disableVideo
     * @private
     */
    _teardown () {
        // we might be asked to re-enable before _teardown is called, just ignore it.
        if (this.enabled === false) {
            const disableTrack = requestDisableCheck();
            this._disablePreview();
            this._singleSetup = null;
            // by clearing refs to video and track, we should lose our hold over the camera
            this._video = null;
            if (this._track && disableTrack) {
                this._track.stop();
            }
            this._track = null;
        }
    }

    /**
     * Return frame data from the video feed in a specified dimensions, format, and mirroring.
     *
     * @param {object} frameInfo A descriptor of the frame you would like to receive.
     * @param {Array.<number>} frameInfo.dimensions [width, height] array of numbers.  Defaults to [480,360]
     * @param {boolean} frameInfo.mirror If you specificly want a mirror/non-mirror frame, defaults to the global
     *                                   mirror state (ioDevices.video.mirror)
     * @param {string} frameInfo.format Requested video format, available formats are 'image-data' and 'canvas'.
     * @param {number} frameInfo.cacheTimeout Will reuse previous image data if the time since capture is less than
     *                                        the cacheTimeout.  Defaults to 16ms.
     *
     * @return {ArrayBuffer|Canvas|string|null} Frame data in requested format, null when errors.
     */
    getFrame ({
        dimensions = StageVideoProvider.DIMENSIONS,
        mirror = this.mirror,
        format = StageVideoProvider.FORMAT_IMAGE_DATA,
        cacheTimeout = this._frameCacheTimeout
    }) {
        if (!this.videoReady) {
            return null;
        }
        const [width, height] = dimensions;
        const workspace = this._getWorkspace({dimensions, mirror: Boolean(mirror)});
        const {videoWidth, videoHeight} = this._video;
        const {canvas, context, lastUpdate, cacheData} = workspace;
        const now = Date.now();

        // if the canvas hasn't been updated...
        if (lastUpdate + cacheTimeout < now) {

            if (mirror) {
                context.scale(-1, 1);
                context.translate(width * -1, 0);
            }

            context.drawImage(this._video,
                // source x, y, width, height
                0, 0, videoWidth, videoHeight,
                // dest x, y, width, height
                0, 0, width, height
            );

            context.resetTransform();
            workspace.lastUpdate = now;
        }

        // each data type has it's own data cache, but the canvas is the same
        if (!cacheData[format]) {
            cacheData[format] = {lastUpdate: 0};
        }
        const formatCache = cacheData[format];

        if (formatCache.lastUpdate + cacheTimeout < now) {
            if (format === StageVideoProvider.FORMAT_IMAGE_DATA) {
                formatCache.lastData = context.getImageData(0, 0, width, height);
            } else if (format === StageVideoProvider.FORMAT_CANVAS) {
                // this will never change
                formatCache.lastUpdate = Infinity;
                formatCache.lastData = canvas;
            } else {
                log.error(`video io error - unimplemented format ${format}`);
                // cache the null result forever, don't log about it again..
                formatCache.lastUpdate = Infinity;
                formatCache.lastData = null;
            }

            // rather than set to now, this data is as stale as it's canvas is
            formatCache.lastUpdate = Math.max(workspace.lastUpdate, formatCache.lastUpdate);
        }

        return formatCache.lastData;
    }

    /**
     * Set the preview ghost effect
     * @param {number} ghost from 0 (visible) to 100 (invisible) - ghost effect
     */
    setPreviewGhost (ghost) {
        this._ghost = ghost;
        if (this._drawable) {
            this.runtime.renderer.updateDrawableProperties(this._drawable, {ghost});
        }
    }

    /**
     * Method called when an error happens.  Default implementation is just to log error.
     *
     * @abstract
     * @param {Error} error An error object from getUserMedia or other source of error.
     */
    onError (error) {
        log.error('Unhandled video io device error', error);
    }

    /**
     * Create a video stream.
     * Should probably be moved to -render or somewhere similar later
     * @private
     * @return {Promise} When video has been received, rejected if video is not received
     */
    _setupVideo () {
        // We cache the result of this setup so that we can only ever have a single
        // video/getUserMedia request happen at a time.
        if (this._singleSetup) {
            return this._singleSetup;
        }

        this._singleSetup = requestVideoStream({ // navigator.mediaDevices.getUserMedia({
            width: {min: 480, ideal: 640},
            height: {min: 360, ideal: 480}
        })
            .then(stream => {
                this._video = document.createElement('video');
                // Use the new srcObject API, falling back to createObjectURL
                try {
                    this._video.srcObject = stream;
                } catch (error) {
                    this._video.src = window.URL.createObjectURL(stream);
                }
                // Hint to the stream that it should load. A standard way to do this
                // is add the video tag to the DOM. Since this extension wants to
                // hide the video tag and instead render a sample of the stream into
                // the webgl rendered Scratch canvas, another hint like this one is
                // needed.
                this._video.play(); // Needed for Safari/Firefox, Chrome auto-plays.
                this._track = stream.getTracks()[0];
                this._setupPreview();
                return this;
            })
            .catch(error => {
                this._singleSetup = null;
                this.onError(error);
            });

        return this._singleSetup;
    }

    _disablePreview () {
        if (this._skin) {
            this._skin.clear();
            this.runtime.renderer.updateDrawableProperties(this._drawable, {visible: false});
        }
        this._renderPreviewFrame = null;
    }

    _setupPreview () {
        const {renderer} = this.runtime;
        if (!renderer) return;

        if (this._skinId === -1 && this._skin === null && this._drawable === -1) {
            this._skinId = renderer.createPenSkin();
            this._skin = renderer._allSkins[this._skinId];
            this._drawable = renderer.createDrawable();
            renderer.setDrawableOrder(
                this._drawable,
                StageVideoProvider.ORDER
            );
            renderer.updateDrawableProperties(this._drawable, {
                skinId: this._skinId
            });
        }

        // if we haven't already created and started a preview frame render loop, do so
        if (!this._renderPreviewFrame) {
            renderer.updateDrawableProperties(this._drawable, {
                ghost: this._ghost,
                visible: true
            });

            this._renderPreviewFrame = () => {
                clearTimeout(this._renderPreviewTimeout);
                if (!this._renderPreviewFrame) {
                    return;
                }

                this._renderPreviewTimeout = setTimeout(this._renderPreviewFrame, this.runtime.currentStepTime);

                const canvas = this.getFrame({format: StageVideoProvider.FORMAT_CANVAS});

                if (!canvas) {
                    this._skin.clear();
                    return;
                }

                const xOffset = StageVideoProvider.DIMENSIONS[0] / -2;
                const yOffset = StageVideoProvider.DIMENSIONS[1] / 2;
                this._skin.drawStamp(canvas, xOffset, yOffset);
                this.runtime.requestRedraw();
            };

            this._renderPreviewFrame();
        }
    }

    get videoReady () {
        if (!this.enabled) {
            return false;
        }
        if (!this._video) {
            return false;
        }
        if (!this._track) {
            return false;
        }
        const {videoWidth, videoHeight} = this._video;
        if (typeof videoWidth !== 'number' || typeof videoHeight !== 'number') {
            return false;
        }
        if (videoWidth === 0 || videoHeight === 0) {
            return false;
        }
        return true;
    }

    /**
     * get an internal workspace for canvas/context/caches
     * this uses some document stuff to create a canvas and what not, probably needs abstraction
     * into the renderer layer?
     * @private
     * @return {object} A workspace for canvas/data storage.  Internal format not documented intentionally
     */
    _getWorkspace ({dimensions, mirror}) {
        let workspace = this._workspace.find(space => (
            space.dimensions.join('-') === dimensions.join('-') &&
            space.mirror === mirror
        ));
        if (!workspace) {
            workspace = {
                dimensions,
                mirror,
                canvas: document.createElement('canvas'),
                lastUpdate: 0,
                cacheData: {}
            };
            workspace.canvas.width = dimensions[0];
            workspace.canvas.height = dimensions[1];
            workspace.context = workspace.canvas.getContext('2d');
            this._workspace.push(workspace);
        }
        return workspace;
    }
}

class ModalVideoProvider {
    constructor (canvas) {
        /**
         * Captured image data
         */

        /**
         * Cache frames for this many ms.
         * @type number
         */
        this._frameCacheTimeout = 16;

        this._canvas = canvas;

        this._video = null;

        // this._workspace = [];

        /**
         * Usermedia stream track
         * @private
         */
        this._track = null;
    }


    /**
     * Dimensions the video stream is analyzed at after its rendered to the
     * sample canvas.
     * @type {Array.<number>}
     */
    static get DIMENSIONS () {
        return [480, 360];
    }

    setVideo (video) {
        this._video = video;
    }


    enableVideo () {
        const thisContext = this;
        this._video = this._video ? this._video : document.createElement('video');
        // TODO possibly make common function for this
        requestVideoStream(true)
            .then(userMediaStream => {
                try {
                    thisContext._video.srcObject = userMediaStream;
                } catch (e) {
                    thisContext._video.src = window.URL.createObjectURL(userMediaStream);
                }
                thisContext._track = userMediaStream.getTracks()[0];

                thisContext._width = 960; // abstract this out
                thisContext._height = 720;

                const ctx = this._canvas.getContext('2d');

                ctx.scale(-1, 1);
                ctx.translate(thisContext._width * -1, 0);

                thisContext._drawFrames();

                // The following also works...
                // thisContext._videoFeedInterval = setInterval(
                //     () => this.getFrame({format: ModalVideoProvider.FORMAT_CANVAS}),
                //     thisContext._frameCacheTimeout);


                // thisContext._setupPreview();
            })
            .catch(e => {
                log.warn(e);
            });
    }

    _drawFrames () {
        this._videoFeedInterval = setInterval(() =>
            this._canvas.getContext('2d').drawImage(this._video,
                // source x, y, width, height
                0, 0, this._video.videoWidth, this._video.videoHeight,
                // dest x, y, width, height
                0, 0, this._width, this._height
            ), this._frameCacheTimeout);
    }

    takeSnapshot () {
        clearInterval(this._videoFeedInterval);
        return this._canvas.toDataURL('image/png');
    }

    clearSnapshot () {
        this._drawFrames();
    }

    /**
     * get an internal workspace for canvas/context/caches
     * this uses some document stuff to create a canvas and what not, probably needs abstraction
     * into the renderer layer?
     * @private
     * @return {object} A workspace for canvas/data storage.  Internal format not documented intentionally
     */
    // _getWorkspace ({dimensions, mirror}) {
    //     let workspace = this._workspace.find(space => (
    //         space.dimensions.join('-') === dimensions.join('-') &&
    //         space.mirror === mirror
    //     ));
    //     if (!workspace) {
    //         workspace = {
    //             dimensions,
    //             mirror,
    //             canvas: this._canvas, // document.createElement('canvas'),
    //             lastUpdate: 0,
    //             cacheData: {}
    //         };
    //         workspace.canvas.width = dimensions[0];
    //         workspace.canvas.height = dimensions[1];
    //         workspace.context = workspace.canvas.getContext('2d');
    //         this._workspace.push(workspace);
    //     }
    //     return workspace;
    // }

    /**
     * Return frame data from the video feed in a specified dimensions, format, and mirroring.
     *
     * @param {object} frameInfo A descriptor of the frame you would like to receive.
     * @param {Array.<number>} frameInfo.dimensions [width, height] array of numbers.  Defaults to [480,360]
     * @param {boolean} frameInfo.mirror If you specificly want a mirror/non-mirror frame, defaults to the global
     *                                   mirror state (ioDevices.video.mirror)
     * @param {string} frameInfo.format Requested video format, available formats are 'image-data' and 'canvas'.
     * @param {number} frameInfo.cacheTimeout Will reuse previous image data if the time since capture is less than
     *                                        the cacheTimeout.  Defaults to 16ms.
     *
     * @return {ArrayBuffer|Canvas|string|null} Frame data in requested format, null when errors.
     */
    // getFrame ({
    //     dimensions = ModalVideoProvider.DIMENSIONS,
    //     mirror = this.mirror,
    //     format = ModalVideoProvider.FORMAT_IMAGE_DATA,
    //     cacheTimeout = this._frameCacheTimeout
    // }) {
    //     if (!this.videoReady) {
    //         return null;
    //     }
    //     const [width, height] = dimensions;
    //     const workspace = this._getWorkspace({dimensions, mirror: Boolean(mirror)});
    //     const {videoWidth, videoHeight} = this._video;
    //     const {canvas, context, lastUpdate, cacheData} = workspace;
    //     const now = Date.now();
    //
    //     // if the canvas hasn't been updated...
    //     if (lastUpdate + cacheTimeout < now) {
    //
    //         if (mirror) {
    //             context.scale(-1, 1);
    //             context.translate(width * -1, 0);
    //         }
    //
    //         context.drawImage(this._video,
    //             // source x, y, width, height
    //             0, 0, videoWidth, videoHeight,
    //             // dest x, y, width, height
    //             0, 0, width, height
    //         );
    //
    //         context.resetTransform();
    //         workspace.lastUpdate = now;
    //     }
    //
    //     // each data type has it's own data cache, but the canvas is the same
    //     if (!cacheData[format]) {
    //         cacheData[format] = {lastUpdate: 0};
    //     }
    //     const formatCache = cacheData[format];
    //
    //     if (formatCache.lastUpdate + cacheTimeout < now) {
    //         if (format === ModalVideoProvider.FORMAT_IMAGE_DATA) {
    //             formatCache.lastData = context.getImageData(0, 0, width, height);
    //         } else if (format === ModalVideoProvider.FORMAT_CANVAS) {
    //             // this will never change
    //             formatCache.lastUpdate = Infinity;
    //             formatCache.lastData = canvas;
    //         } else {
    //             log.error(`video io error - unimplemented format ${format}`);
    //             // cache the null result forever, don't log about it again..
    //             formatCache.lastUpdate = Infinity;
    //             formatCache.lastData = null;
    //         }
    //
    //         // rather than set to now, this data is as stale as it's canvas is
    //         formatCache.lastUpdate = Math.max(workspace.lastUpdate, formatCache.lastUpdate);
    //     }
    //
    //     return formatCache.lastData;
    // }

    disableVideo () {
        // Don't need to do anything with this check,
        // but we do want to pop our use of the stream off the stack
        const disableTrack = requestDisableCheck();

        if (this._video) {
            if (this._track && disableTrack) this._track.stop();
            this._video.pause();
            this._video.srcObject = null;
        }
    }
}

const stageVideoProvider = function (runtime) {
    return new StageVideoProvider(runtime);
};

export {
    stageVideoProvider,
    ModalVideoProvider
};
