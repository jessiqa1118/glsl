#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

void main() {
    vec2 st = gl_FragCoord.xy/resolution;
    float y = sin((((st.x-time)/0.1)))*sin(time)*0.3;
	
    if (abs(st.y -0.5-y) < 0.05) {
        gl_FragColor = vec4(sin(time), cos(time), sin(time+180.0), 1.0);
    } else {
        gl_FragColor = vec4(1.0);
    }
}
