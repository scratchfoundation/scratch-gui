precision mediump float;

uniform sampler2D u_image0;
varying vec2 v_texCoord;

void main () {
	gl_FragColor = texture2D(u_image0, v_texCoord);
}
