import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState, useCallback} from 'react';

import Box from './box.jsx';

const useMouseDrag = (ref, onDrag, onDragEnd) => {
    useEffect(() => {
        if (!onDrag) return;
        let isDragging = false;
        const onMouseMove = e => {
            e.preventDefault();
            if (!isDragging) return;
            if (onDrag) onDrag(e);
        };
        const onMouseUp = e => {
            isDragging = false;
            if (onDragEnd) onDragEnd(e);
        };
        const onMouseDown = e => {
            e.preventDefault();
            isDragging = true;
        };
        ref.current.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            ref.current.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [onDrag]);
};


const ResizableBox = props => {
    const {
        children,
        minWidth = 420,
        maxWidth = 480,
        defaultWidth = 480,
        onResize,
        initialSize,
        ...rest
    } = props;

    const boxRef = useRef(null);
    const handleRef = useRef(null);
    const [width, setWidth] = useState(defaultWidth);

    // whenever the initial size changes, lets override whatever the current width is
    useEffect(() => {
        setWidth(initialSize);
    }, [initialSize]);

    // This is a workaround to force other elements to resize that
    // are listening to the window resize event (such as the editor).
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [width]);

    const onDrag = useCallback(e => {
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        const newWidth = Math.max(Math.min(rect.width - e.movementX, maxWidth), minWidth);
        onResize(newWidth);
        setWidth(newWidth);
    }, [minWidth, maxWidth]);


    useMouseDrag(handleRef, onDrag);

    return (
        <Box
            componentRef={boxRef}
            style={{
                position: 'relative',
                width: width,
                minWidth: minWidth
            }}
            {...rest}
        >
            <div
                ref={handleRef}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '8px',
                    cursor: 'ew-resize'
                }}
            />
            {children}
        </Box>
    );
};

ResizableBox.propTypes = {
    children: PropTypes.node,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    defaultWidth: PropTypes.number,
    onResize: PropTypes.func,
    initialSize: PropTypes.number
};

export default ResizableBox;
