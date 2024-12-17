#version 300 es

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	fragColor = vec4(st.x,st.y,0.0,1.0);
}
