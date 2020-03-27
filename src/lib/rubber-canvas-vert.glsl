precision mediump float;

uniform vec4 u_bounds;
attribute vec2 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

void main () {
	vec2 boundsSize = u_bounds.zw - u_bounds.xy;
	vec2 adjusted = a_position - vec2(u_bounds.x, u_bounds.y);
	vec4 pos = vec4(((adjusted / boundsSize) - 0.5) * vec2(2.0, -2.0), 0.0, 1.0);
	v_texCoord = a_texCoord;
	gl_Position = pos;
}
