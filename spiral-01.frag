#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;

float line(vec2 p, vec2 v1, vec2 v2) {
	p -= v1;
	vec2 v = v2 - v1;
	float tl = 0.0005;

	return float(step(length(cross(vec3(p, 0.), vec3(normalize(v), 0.))), tl));
}

float drawSquare(vec2 p, vec2 v[4]) {
	float col = 0.;
	for (int i = 0; i < 4; i++) {
		col = max(col, line(p, v[i], v[int(mod(float(i+1),4.))]));
	}

	return col;
}

vec2 moveVector(vec2 v1, vec2 v2, float gap) {
	vec2 dir = normalize((v2 - v1)) * gap;
	return dir;
}

float spiral(vec2 p, vec2 v[4], int cnt) {
	const int max_cnt = 100;
	//float gap = 0.05 * (sin(time)/2.);
	float gap = 0.01;
	vec2 n[4];

	for (int i = 0; i <= max_cnt; i++) {
		if (drawSquare(p, v) != 0.) {
			return 1.0;
		}
		n[0] = v[0] + moveVector(v[0], v[1], gap);
		n[1] = v[1] + moveVector(v[1], v[2], gap);
		n[2] = v[2] + moveVector(v[2], v[3], gap);
		n[3] = v[3] + moveVector(v[3], v[0], gap);
		v[0] = n[0];
		v[1] = n[1];
		v[2] = n[2];
		v[3] = n[3];
	}
	return 0.0;
}

void main( void ) {
	vec2 st = gl_FragCoord.xy / resolution;
	vec2 v[4];
	v[0] = vec2(0., 0.);
	v[1] = vec2(0., 1.);
	v[2] = vec2(1., 1.);
	v[3] = vec2(1., 0.);

	vec2 n[4];
	n[0] = moveVector(v[0], v[1], 0.5);
	n[1] = moveVector(v[1], v[2], 0.5);
	n[2] = moveVector(v[2], v[3], 0.5);
	n[3] = moveVector(v[3], v[0], 0.5);

	gl_FragColor = vec4(vec3(spiral(st, v, 0)), 0.);
}
