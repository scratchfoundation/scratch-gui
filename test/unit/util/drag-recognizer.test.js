import DragRecognizer from '../../../src/lib/drag-recognizer';

describe('DragRecognizer', () => {
    let onDrag;
    let onDragEnd;
    let dragRecognizer;

    beforeEach(() => {
        onDrag = jest.fn();
        onDragEnd = jest.fn();
        dragRecognizer = new DragRecognizer({onDrag, onDragEnd});
    });

    afterEach(() => {
        dragRecognizer.reset();
    });

    test('start -> small drag', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        window.dispatchEvent(new MouseEvent('mousemove', {clientX: 101, clientY: 101}));
        expect(onDrag).not.toHaveBeenCalled();
    });

    test('start -> large vertical touch move -> scroll, not drag', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 106, clientY: 150}));
        expect(onDrag).not.toHaveBeenCalled();
    });

    test('start -> large vertical mouse move -> mouse moves always drag)', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        window.dispatchEvent(new MouseEvent('mousemove', {clientX: 100, clientY: 150}));
        expect(onDrag).toHaveBeenCalled();
    });

    test('start -> large horizontal touch move -> drag', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 150, clientY: 106}));
        expect(onDrag).toHaveBeenCalled();
    });

    test('after starting a scroll, it cannot become a drag', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 100, clientY: 110}));
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 100, clientY: 100}));
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 110, clientY: 100}));
        expect(onDrag).not.toHaveBeenCalled();
    });

    test('start -> end unbinds', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 150, clientY: 106}));
        expect(onDrag).toHaveBeenCalledTimes(1);
        window.dispatchEvent(new MouseEvent('touchend', {clientX: 150, clientY: 106}));
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 150, clientY: 106}));
        expect(onDrag).toHaveBeenCalledTimes(1); // Still 1
    });

    test('start -> end calls dragEnd callback after resetting internal state', done => {
        onDragEnd = () => {
            expect(dragRecognizer.gestureInProgress()).toBe(false);
            done();
        };
        dragRecognizer = new DragRecognizer({onDrag, onDragEnd});
        dragRecognizer.start({clientX: 100, clientY: 100});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 150, clientY: 106}));
        window.dispatchEvent(new MouseEvent('touchend', {clientX: 150, clientY: 106}));
    });

    test('start -> reset unbinds', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 150, clientY: 106}));
        expect(onDrag).toHaveBeenCalledTimes(1);
        dragRecognizer.reset();
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 150, clientY: 106}));
        expect(onDrag).toHaveBeenCalledTimes(1); // Still 1
    });

    test('scrolls do not call prevent default', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        const event = new MouseEvent('touchmove', {clientX: 100, clientY: 110});
        event.preventDefault = jest.fn();
        window.dispatchEvent(event);
        expect(event.preventDefault).toHaveBeenCalledTimes(0);
    });

    test('confirmed drags have preventDefault called on them', () => {
        dragRecognizer.start({clientX: 100, clientY: 100});
        const event = new MouseEvent('touchmove', {clientX: 150, clientY: 106});
        event.preventDefault = jest.fn();
        window.dispatchEvent(event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    test('multiple horizontal drag angles', () => {
        // +45 from horizontal => drag
        dragRecognizer.start({clientX: 0, clientY: 0});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 10, clientY: 10}));
        expect(onDrag).toHaveBeenCalledTimes(1);
        dragRecognizer.reset();

        // -45 from horizontal => drag
        dragRecognizer.start({clientX: 0, clientY: 0});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: 10, clientY: -10}));
        expect(onDrag).toHaveBeenCalledTimes(2);
        dragRecognizer.reset();

        // +135 from horizontal => drag
        dragRecognizer.start({clientX: 0, clientY: 0});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: -10, clientY: 10}));
        expect(onDrag).toHaveBeenCalledTimes(3);
        dragRecognizer.reset();

        // -135 from horizontal => drag
        dragRecognizer.start({clientX: 0, clientY: 0});
        window.dispatchEvent(new MouseEvent('touchmove', {clientX: -10, clientY: -10}));
        expect(onDrag).toHaveBeenCalledTimes(4);
        dragRecognizer.reset();
    });
});
