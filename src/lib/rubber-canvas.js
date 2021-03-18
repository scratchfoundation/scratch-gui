import VERTEX_SOURCE from 'raw-loader!./rubber-canvas-vert.glsl';
import FRAGMENT_SOURCE from 'raw-loader!./rubber-canvas-frag.glsl';

const DAMPING = 20;
class _Spring {
    constructor (opts) {
        this.reinit(opts);
    }

    reinit (opts) {
        if (Object.prototype.hasOwnProperty.call(opts, 'stiffness')) this.stiffness = opts.stiffness;
        if (Object.prototype.hasOwnProperty.call(opts, 'mass')) this.mass = opts.mass;
        this.anchor = opts.anchor;
        this.position = opts.anchor.slice(0);
        this._velocity = [0, 0];
    }

    step (deltaTime) {
        const springForceX = -this.stiffness * (this.position[0] - this.anchor[0]);
        const springForceY = -this.stiffness * (this.position[1] - this.anchor[1]);

        const dampingForceX = (DAMPING * this.mass) * this._velocity[0];
        const dampingForceY = (DAMPING * this.mass) * this._velocity[1];

        const forceX = springForceX - dampingForceX;
        const forceY = springForceY - dampingForceY;

        const accelerationX = forceX / this.mass;
        const accelerationY = forceY / this.mass;

        this._velocity[0] += accelerationX * deltaTime;
        this._velocity[1] += accelerationY * deltaTime;

        this.position[0] += this._velocity[0] * deltaTime;
        this.position[1] += this._velocity[1] * deltaTime;
    }
}

const createShader = (gl, source, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        throw new Error(`Could not compile WebGL program. \n${info}`);
    }

    return shader;
};

const createProgram = (gl, vertSource, fragSource) => {
    const vertShader = createShader(gl, vertSource, gl.VERTEX_SHADER);
    const fragShader = createShader(gl, fragSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    const programInfo = {
        uniforms: {},
        attribs: {},
        program
    };

    // Construct maps of uniform + attrib locations for convenience
    const numActiveUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numActiveUniforms; i++) {
        const uniformInfo = gl.getActiveUniform(program, i);
        programInfo.uniforms[uniformInfo.name] = gl.getUniformLocation(program, uniformInfo.name);
    }

    const numActiveAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numActiveAttributes; i++) {
        const attribInfo = gl.getActiveAttrib(program, i);
        programInfo.attribs[attribInfo.name] = gl.getAttribLocation(program, attribInfo.name);
    }

    return programInfo;
};

// Resolution of the grid in terms of grid squares. In this case, that's 16 squares and 25 vertices.
const SUBDIVISIONS = 4;

class RubberCanvas {
    constructor (canvas) {
        this._canvas = canvas;
        this._gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this._size = [0, 0];
        this._scaleFactor = 1;

        const numPoints = (SUBDIVISIONS + 1) ** 2;
        this._springs = [];
        for (let i = 0; i < numPoints; i++) {
            this._springs.push(new _Spring({
                anchor: [0, 0],
                position: [0, 0]
            }));
        }

        this._vertexData = new Float32Array(numPoints * 2);
        this._texCoordData = new Float32Array(numPoints * 2);
        this._vertexIndices = new Uint16Array(numPoints * 6);

        // Initialize texture coordinates for all grid points
        for (let x = 0; x <= SUBDIVISIONS; x++) {
            for (let y = 0; y <= SUBDIVISIONS; y++) {
                const index = (y * (SUBDIVISIONS + 1)) + x;
                this._texCoordData[index * 2] = x / SUBDIVISIONS;
                this._texCoordData[(index * 2) + 1] = y / SUBDIVISIONS;
            }
        }

        // Initialize vertex indices
        for (let x = 0; x < SUBDIVISIONS; x++) {
            for (let y = 0; y < SUBDIVISIONS; y++) {
                const topLeftIndex = (y * (SUBDIVISIONS + 1)) + x;
                const topRightIndex = (y * (SUBDIVISIONS + 1)) + x + 1;
                const bottomLeftIndex = ((y + 1) * (SUBDIVISIONS + 1)) + x;
                const bottomRightIndex = ((y + 1) * (SUBDIVISIONS + 1)) + x + 1;

                this._vertexIndices[topLeftIndex * 6] = topLeftIndex;
                this._vertexIndices[(topLeftIndex * 6) + 1] = topRightIndex;
                this._vertexIndices[(topLeftIndex * 6) + 2] = bottomLeftIndex;

                this._vertexIndices[(topLeftIndex * 6) + 3] = bottomLeftIndex;
                this._vertexIndices[(topLeftIndex * 6) + 4] = topRightIndex;
                this._vertexIndices[(topLeftIndex * 6) + 5] = bottomRightIndex;
            }
        }

        // Used for delta-time calculation
        this._lastTimestamp = 0;

        const gl = this._gl;
        this._shader = createProgram(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);

        this._vertexBuffer = gl.createBuffer();
        this._indexBuffer = gl.createBuffer();
        this._texCoordBuffer = gl.createBuffer();
        gl.enableVertexAttribArray(this._shader.attribs.a_position);
        gl.enableVertexAttribArray(this._shader.attribs.a_texCoord);

        // The texture coordinates and vertex indices will never change, so send them over to the GPU here
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            this._vertexIndices,
            gl.STATIC_DRAW
        );

        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
        gl.vertexAttribPointer(
            this._shader.attribs.a_texCoord,
            2, // vec2
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.bufferData(
            gl.ARRAY_BUFFER,
            this._texCoordData,
            gl.STATIC_DRAW
        );

        gl.activeTexture(gl.TEXTURE0);
        this._texture = gl.createTexture();

        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

        gl.clearColor(0, 0, 0, 0);
    }

    reinit (drawableData, x, y, scaleFactor) {
        const {
            x: drawableX,
            y: drawableY
        } = drawableData;

        const grabX = x - drawableX;
        const grabY = y - drawableY;

        this._setData(drawableData.imageData);

        // Reinitialize springs' mass based on their distance to the point at which the sprite was grabbed
        for (let i = 0; i <= SUBDIVISIONS; i++) {
            const springX = (i / SUBDIVISIONS) * this._size[0];

            for (let j = 0; j <= SUBDIVISIONS; j++) {
                const springY = (j / SUBDIVISIONS) * this._size[1];

                const distance = Math.hypot(springX - (grabX / scaleFactor), springY - (grabY / scaleFactor));
                const distanceScaled = distance / Math.hypot(...this._size);
                this._springs[(j * (SUBDIVISIONS + 1)) + i].reinit({
                    anchor: [springX + x, springY + y],
                    position: [springX + x, springY + y],
                    stiffness: 15,
                    mass: (distanceScaled * 0.05) + 0.025
                });
            }
        }

        this._lastTimestamp = performance.now();
        const {x: parentX, y: parentY} = this._canvas.parentElement.getBoundingClientRect();
        this._canvas.style.left = `${parentX - grabX}px`;
        this._canvas.style.top = `${parentY - grabY}px`;
        this._canvas.style.display = 'block';
        this._scaleFactor = scaleFactor;
        this.step();
    }

    // Calculate the bounds of the dragged sprite after being jellofied.
    _calculateBounds () {
        let left = Infinity;
        let right = -Infinity;
        let top = Infinity;
        let bottom = -Infinity;

        for (const spring of this._springs) {
            left = Math.min(left, spring.position[0]);
            right = Math.max(right, spring.position[0]);
            top = Math.min(top, spring.position[1]);
            bottom = Math.max(bottom, spring.position[1]);
        }

        left = Math.floor(left);
        right = Math.ceil(right);
        bottom = Math.ceil(bottom);
        top = Math.floor(top);

        return {left, right, top, bottom};
    }

    _setData (data) {
        this._size[0] = data.width;
        this._size[1] = data.height;

        const gl = this._gl;

        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        // disable automatic mipmapping
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, data.width, data.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data.data);
    }

    updateMousePosition ([x, y]) {
        // update springs' destinations to match new mouse position
        for (let i = 0; i <= SUBDIVISIONS; i++) {
            const springX = (i / SUBDIVISIONS) * this._size[0];

            for (let j = 0; j <= SUBDIVISIONS; j++) {
                const springY = (j / SUBDIVISIONS) * this._size[1];

                this._springs[(j * (SUBDIVISIONS + 1)) + i].anchor[0] = springX + x;
                this._springs[(j * (SUBDIVISIONS + 1)) + i].anchor[1] = springY + y;
            }
        }
    }

    step (timestamp) {
        // Slightly above 33.3ms (30 FPS)
        const maxTimeStep = 35;

        let deltaTime = timestamp - this._lastTimestamp;

        // Take multiple steps if deltaTime is too large
        // This prevents explodage
        let timeSubdivisions = 1;
        if (deltaTime > maxTimeStep) {
            timeSubdivisions = Math.ceil(deltaTime / maxTimeStep);
            deltaTime /= timeSubdivisions;
        }
        this._lastTimestamp = timestamp;
        if (deltaTime > 0) {
            for (let i = 0; i < timeSubdivisions; i++) {
                for (const spring of this._springs) {
                    // I've got a step() in my _Spring
                    spring.step(deltaTime / 1000);
                }
            }
        }

        // Update vertex data to match springs' positions
        for (let i = 0; i < this._springs.length; i++) {
            const spring = this._springs[i];
            this._vertexData[i * 2] = spring.position[0];
            this._vertexData[(i * 2) + 1] = spring.position[1];
        }

        const gl = this._gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.vertexAttribPointer(
            this._shader.attribs.a_position,
            2, // vec2
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.bufferData(
            gl.ARRAY_BUFFER,
            this._vertexData,
            gl.DYNAMIC_DRAW
        );

        const bounds = this._calculateBounds();

        // 10 pixels of slack space to avoid excessive canvas resizing
        bounds.right += 10;
        bounds.bottom += 10;

        // Only scale the canvas up, not down-- this also avoids resizing the canvas too much
        if (bounds.right - bounds.left < this._canvas.width) bounds.right = bounds.left + this._canvas.width;
        if (bounds.bottom - bounds.top < this._canvas.height) bounds.bottom = bounds.top + this._canvas.height;

        const width = bounds.right - bounds.left;
        const height = bounds.bottom - bounds.top;

        if (width > 2048 || height > 2048) {
            // Avoid creating lag spikes from a huge WebGL canvas if the spring simulation blows up
            return;
        }
        if (this._canvas.width !== width || this._canvas.height !== height) {
            this._canvas.width = width;
            this._canvas.height = height;
            this._canvas.style.width = `${width * this._scaleFactor}px`;
            this._canvas.style.height = `${height * this._scaleFactor}px`;
        }

        gl.useProgram(this._shader.program);
        gl.uniform1i(this._shader.uniforms.u_image0, 0);
        gl.uniform4f(this._shader.uniforms.u_bounds, bounds.left, bounds.top, bounds.right, bounds.bottom);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, width, height);
        gl.drawElements(gl.TRIANGLES, this._vertexIndices.length, gl.UNSIGNED_SHORT, 0);

        this._canvas.style.transform = `translate(${bounds.left}px, ${bounds.top}px)`;
    }

    destroy () {
        const gl = this._gl;

        gl.deleteBuffer(this._texCoordBuffer);
        gl.deleteBuffer(this._vertexBuffer);
        gl.deleteBuffer(this._indexBuffer);
        gl.deleteTexture(this._texture);
        gl.deleteProgram(this._shader.program);
    }
}

export default RubberCanvas;
