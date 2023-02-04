import ScratchBlocks from 'scratch-blocks';

const FieldMatrix = ScratchBlocks.FieldMatrix;

export default class ExtendedFieldMatrix extends FieldMatrix {
    static get MAX_ROWS () {
        return 10;
    }

    static get MAX_COLS () {
        return 24;
    }

    get ZEROS () {
        return '0'.repeat(this.rows * this.cols);
    }

    get ONES () {
        return '1'.repeat(this.rows * this.cols);
    }

    get THUMBNAIL_WIDTH () {
        const nodeSize = (FieldMatrix.THUMBNAIL_NODE_SIZE * 5) / this.rows;
        const nodePad = (FieldMatrix.THUMBNAIL_NODE_PAD * 4) / (this.rows - 1);
        return (nodeSize + nodePad) * this.cols;
    }

    constructor (matrix) {
        super(matrix);

        // default 5 x 5 matrix of cells
        this.rows = 5;
        this.cols = 5;
    }

    setMatrixSize (rows, cols) {
        rows = rows && (rows < 1 || rows > ExtendedFieldMatrix.MAX_ROWS) ? 5 : rows;
        cols = cols && (cols < 1 || cols > ExtendedFieldMatrix.MAX_COLS) ? 5 : cols;
        if (rows * cols > 1) {
            this.rows = rows;
            this.cols = cols;
            this.init();
        }
    }

    init () {
        if (this.fieldGroup_) {
            // Matrix menu has already been initialized once.
            return;
        }

        // Build the DOM.
        this.fieldGroup_ = ScratchBlocks.utils.createSvgElement('g', {}, null);

        const nodeSize = (FieldMatrix.THUMBNAIL_NODE_SIZE * 5) / this.rows;
        this.size_.width =
            this.THUMBNAIL_WIDTH +
            FieldMatrix.ARROW_SIZE +
            (ScratchBlocks.BlockSvg.DROPDOWN_ARROW_PADDING * 1.5);

        this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

        const thumbX = ScratchBlocks.BlockSvg.DROPDOWN_ARROW_PADDING / 2;
        const thumbY = (this.size_.height - FieldMatrix.THUMBNAIL_SIZE) / 2;
        const thumbnail = ScratchBlocks.utils.createSvgElement(
            'g',
            {
                'transform': `translate(${thumbX}, ${thumbY})`,
                'pointer-events': 'bounding-box',
                'cursor': 'pointer'
            },
            this.fieldGroup_
        );
        this.ledThumbNodes_ = [];
        const nodePad = (FieldMatrix.THUMBNAIL_NODE_PAD * 4) / (this.rows - 1);
        for (let i = 0; i < this.rows; i++) {
            for (let n = 0; n < this.cols; n++) {
                const attr = {
                    x: ((nodeSize + nodePad) * n) + nodePad,
                    y: ((nodeSize + nodePad) * i) + nodePad,
                    width: nodeSize,
                    height: nodeSize,
                    rx: nodePad,
                    ry: nodePad
                };
                this.ledThumbNodes_.push(
                    ScratchBlocks.utils.createSvgElement(
                        'rect',
                        attr,
                        thumbnail
                    )
                );
            }
            thumbnail.style.cursor = 'default';
            this.updateMatrix_();
        }

        if (!this.arrow_) {
            const arrowX =
                this.THUMBNAIL_WIDTH +
                (ScratchBlocks.BlockSvg.DROPDOWN_ARROW_PADDING * 1.5);
            const arrowY = (this.size_.height - FieldMatrix.ARROW_SIZE) / 2;
            this.arrow_ = ScratchBlocks.utils.createSvgElement(
                'image',
                {
                    height: `${FieldMatrix.ARROW_SIZE}px`,
                    width: `${FieldMatrix.ARROW_SIZE}px`,
                    transform: `translate(${arrowX}, ${arrowY})`
                },
                this.fieldGroup_
            );
            this.arrow_.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'xlink:href',
                `${ScratchBlocks.mainWorkspace.options.pathToMedia}dropdown-arrow.svg`
            );
            this.arrow_.style.cursor = 'default';
        }

        this.mouseDownWrapper_ = ScratchBlocks.bindEventWithChecks_(
            this.getClickTarget_(),
            'mousedown',
            this,
            this.onMouseDown_
        );
    }

    setValue (matrix) {
        if (!matrix) {
            return;
        }
        // set matrix rows and cols
        if (!this.matrix_ && matrix.indexOf(':') !== -1) {
            const rowObjects = matrix.split(':');
            const rows = rowObjects.length;
            const cols = rowObjects[0].length;
            this.setMatrixSize(rows, cols);
            matrix = matrix.replaceAll(':', '');
        }
        if (matrix === this.matrix_) {
            return; // No change
        }
        if (this.sourceBlock_ && ScratchBlocks.Events.isEnabled()) {
            ScratchBlocks.Events.fire(new ScratchBlocks.Events.Change(
                this.sourceBlock_, 'field', this.name, this.matrix_, matrix));
        }
        const length = this.ZEROS.length;
        matrix = matrix + this.ZEROS.substr(0, length - matrix.length);
        this.matrix_ = matrix;
        this.updateMatrix_();
    }

    showEditor_ () {
        // If there is an existing drop-down someone else owns, hide it immediately and clear it.
        ScratchBlocks.DropDownDiv.hideWithoutAnimation();
        ScratchBlocks.DropDownDiv.clearContent();
        const div = ScratchBlocks.DropDownDiv.getContentDiv();
        // Build the SVG DOM.
        const matrixHeight =
            (FieldMatrix.MATRIX_NODE_SIZE * this.rows) +
            (FieldMatrix.MATRIX_NODE_PAD * (this.rows + 1));
        const matrixWidth =
            (FieldMatrix.MATRIX_NODE_SIZE * this.cols) +
            (FieldMatrix.MATRIX_NODE_PAD * (this.cols + 1));
        this.matrixStage_ = ScratchBlocks.utils.createSvgElement(
            'svg',
            {
                'xmlns': 'http://www.w3.org/2000/svg',
                'xmlns:html': 'http://www.w3.org/1999/xhtml',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                'version': '1.1',
                'height': `${matrixHeight}px`,
                'width': `${matrixWidth}px`
            },
            div
        );
        // Create the ?x? matrix
        this.ledButtons_ = [];
        for (let i = 0; i < this.rows; i++) {
            for (let n = 0; n < this.cols; n++) {
                const x =
                    (FieldMatrix.MATRIX_NODE_SIZE * n) +
                    (FieldMatrix.MATRIX_NODE_PAD * (n + 1));
                const y =
                    (FieldMatrix.MATRIX_NODE_SIZE * i) +
                    (FieldMatrix.MATRIX_NODE_PAD * (i + 1));
                const attr = {
                    x: `${x}px`,
                    y: `${y}px`,
                    width: FieldMatrix.MATRIX_NODE_SIZE,
                    height: FieldMatrix.MATRIX_NODE_SIZE,
                    rx: FieldMatrix.MATRIX_NODE_RADIUS,
                    ry: FieldMatrix.MATRIX_NODE_RADIUS
                };
                const led = ScratchBlocks.utils.createSvgElement(
                    'rect',
                    attr,
                    this.matrixStage_
                );
                this.matrixStage_.appendChild(led);
                this.ledButtons_.push(led);
            }
        }
        // Div for lower button menu
        const buttonDiv = document.createElement('div');
        // Button to clear matrix
        const clearButtonDiv = document.createElement('div');
        clearButtonDiv.className = 'scratchMatrixButtonDiv';
        const clearButton = this.createButton_(
            this.sourceBlock_.colourSecondary_
        );
        clearButtonDiv.appendChild(clearButton);
        // Button to fill matrix
        const fillButtonDiv = document.createElement('div');
        fillButtonDiv.className = 'scratchMatrixButtonDiv';
        const fillButton = this.createButton_('#FFFFFF');
        fillButtonDiv.appendChild(fillButton);

        buttonDiv.appendChild(clearButtonDiv);
        buttonDiv.appendChild(fillButtonDiv);
        div.appendChild(buttonDiv);

        ScratchBlocks.DropDownDiv.setColour(
            this.sourceBlock_.getColour(),
            this.sourceBlock_.getColourTertiary()
        );
        ScratchBlocks.DropDownDiv.setCategory(this.sourceBlock_.getCategory());
        ScratchBlocks.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);

        this.matrixTouchWrapper_ = ScratchBlocks.bindEvent_(
            this.matrixStage_,
            'mousedown',
            this,
            this.onMouseDown
        );
        this.clearButtonWrapper_ = ScratchBlocks.bindEvent_(
            clearButton,
            'click',
            this,
            this.clearMatrix_
        );
        this.fillButtonWrapper_ = ScratchBlocks.bindEvent_(
            fillButton,
            'click',
            this,
            this.fillMatrix_
        );

        // Update the matrix for the current value
        this.updateMatrix_();
    }

    clearMatrix_ (e) {
        if (e.button !== 0) return;
        this.setValue(this.ZEROS);
    }

    fillMatrix_ (e) {
        if (e.button !== 0) return;
        this.setValue(this.ONES);
    }


    setLEDNode_ (led, state) {
        const leds = this.rows * this.cols;
        if (led < 0 || led > leds - 1) return;
        const matrix = this.matrix_.substr(0, led) + state + this.matrix_.substr(led + 1);
        this.setValue(matrix);
    }

    fillLEDNode_ (led) {
        const leds = this.rows * this.cols;
        if (led < 0 || led > leds - 1) return;
        this.setLEDNode_(led, '1');
    }

    clearLEDNode_ (led) {
        const leds = this.rows * this.cols;
        if (led < 0 || led > leds - 1) return;
        this.setLEDNode_(led, '0');
    }

    toggleLEDNode_ (led) {
        const leds = this.rows * this.cols;
        if (led < 0 || led > leds - 1) return;
        if (this.matrix_.charAt(led) === '0') {
            this.setLEDNode_(led, '1');
        } else {
            this.setLEDNode_(led, '0');
        }
    }

    checkForLED_ (e) {
        const bBox = this.matrixStage_.getBoundingClientRect();
        const nodeSize = FieldMatrix.MATRIX_NODE_SIZE;
        const nodePad = FieldMatrix.MATRIX_NODE_PAD;
        const dx = e.clientX - bBox.left;
        const dy = e.clientY - bBox.top;
        const min = nodePad / 2;
        const maxWidth = bBox.width - (nodePad / 2);
        const maxHeight = bBox.height - (nodePad / 2);
        if (dx < min || dx > maxWidth || dy < min || dy > maxHeight) {
            return -1;
        }
        const xDiv = Math.trunc((dx - (nodePad / 2)) / (nodeSize + nodePad));
        const yDiv = Math.trunc((dy - (nodePad / 2)) / (nodeSize + nodePad));
        return xDiv + (yDiv * this.cols);
    }
}
