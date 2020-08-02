import getUserMedia from 'get-user-media-promise';

// Single Setup For All Video Streams used by the GUI
// While VideoProvider uses a private _singleSetup
// property to ensure that each instance of a VideoProvider
// use the same setup, this ensures that all instances
// of VideoProviders use a single stream. This way, closing a camera modal
// does not affect the video on the stage, and a program running and disabling
// video on the stage will not affect the camera modal's video.
const requestStack = [];
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

const requestDisableVideo = () => {
    requestStack.pop();
    if (requestStack.length > 0) return false;
    return true;
};

export {
    requestVideoStream,
    requestDisableVideo
};
