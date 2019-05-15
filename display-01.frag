#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

void main( void ) {
	gl_FragColor = vec4(step(1.0, mod(gl_FragCoord.y, 3.0)));
}
