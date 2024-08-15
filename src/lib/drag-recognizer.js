import bindAll from 'lodash.bindall';
import {getEventXY} from '../lib/touch-utils';

class DragRecognizer {
    /* Gesture states */
    static get STATE_UNIDENTIFIED () {
        return 'unidentified';
    }
    static get STATE_SCROLL () {
        return 'scroll';
    }
    static get STATE_DRAG () {
        return 'drag';
    }

    constructor ({
        onDrag = (() => {}),
        onDragEnd = (() => {}),
        touchDragAngle = 70, // Angle and distance thresholds are the same as scratch-blocks
        distanceThreshold = 3
    }) {
        this._onDrag = onDrag;
        this._onDragEnd = onDragEnd;
        this._touchDragAngle = touchDragAngle;
        this._distanceThreshold = distanceThreshold;

        this._initialOffset = null;
        this._gestureState = DragRecognizer.STATE_UNIDENTIFIED;

        bindAll(this, [
            'start',
            'gestureInProgress',
            'reset',
            '_handleMove',
            '_handleEnd'
        ]);
    }

    start (event) {
        this._initialOffset = getEventXY(event);
        this._bindListeners();
    }

    gestureInProgress () {
        return this._gestureState !== DragRecognizer.STATE_UNIDENTIFIED;
    }
    
    reset () {
        this._unbindListeners();
        this._initialOffset = null;
        this._gestureState = DragRecognizer.STATE_UNIDENTIFIED;
    }

    //
    // Internal functions
    //

    _bindListeners () {
        window.addEventListener('mouseup', this._handleEnd);
        window.addEventListener('mousemove', this._handleMove);
        window.addEventListener('touchend', this._handleEnd);
        // touchmove must be marked as non-passive, or else it cannot prevent scrolling
        window.addEventListener('touchmove', this._handleMove, {passive: false});
    }

    _unbindListeners () {
        window.removeEventListener('mouseup', this._handleEnd);
        window.removeEventListener('mousemove', this._handleMove);
        window.removeEventListener('touchend', this._handleEnd);
        window.removeEventListener('touchmove', this._handleMove, {passive: false});
    }

    _handleMove (event) {
        // For gestures identified as vertical scrolls, do not process movement events
        if (this._isScroll()) return;

        const currentOffset = getEventXY(event);

        // Try to identify this gesture if it hasn't been identified already
        if (!this.gestureInProgress()) {
            const dx = currentOffset.x - this._initialOffset.x;
            const dy = currentOffset.y - this._initialOffset.y;
            const dragDistance = Math.sqrt((dx * dx) + (dy * dy));
            if (dragDistance < this._distanceThreshold) return;

            // For touch moves, additionally check if the angle suggests drag vs. scroll
            if (event.type === 'touchmove') {
                // Direction goes from -180 to 180, with 0 toward the right.
                let angle = Math.atan2(dy, dx) / Math.PI * 180;
                // Fold over horizontal axis, range now 0 to 180
                angle = Math.abs(angle);
                // Fold over vertical axis, range now 0 to 90
                if (angle > 90) angle = 180 - angle;
                if (angle > this._touchDragAngle) {
                    this._gestureState = DragRecognizer.STATE_SCROLL;
                } else {
                    this._gestureState = DragRecognizer.STATE_DRAG;
                }
            } else {
                // Mouse moves are always considered drags
                this._gestureState = DragRecognizer.STATE_DRAG;
            }
        }

        if (this._isDrag()) {
            this._onDrag(currentOffset, this._initialOffset);
            event.preventDefault();
        }
    }

    _handleEnd () {
        this.reset();
        // Call the callback after reset to make sure if gestureInProgress()
        // is used in response, it get the correct value (i.e. no gesture in progress)
        this._onDragEnd();
    }

    _isDrag () {
        return this._gestureState === DragRecognizer.STATE_DRAG;
    }

    _isScroll () {
        return this._gestureState === DragRecognizer.STATE_SCROLL;
    }
}

export default DragRecognizer;
