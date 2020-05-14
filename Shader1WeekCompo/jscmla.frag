#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

#define PI 3.141592

vec3 rotate(vec3 p, float angle, vec3 axis){
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    mat3 m = mat3(
        a.x * a.x * r + c,
        a.y * a.x * r + a.z * s,
        a.z * a.x * r - a.y * s,
        a.x * a.y * r - a.z * s,
        a.y * a.y * r + c,
        a.z * a.y * r + a.x * s,
        a.x * a.z * r + a.y * s,
        a.y * a.z * r - a.x * s,
        a.z * a.z * r + c
    );
    return m * p;
}

float sphere(vec3 p, float r)
{
    return length(p) - r;
}

float dist(vec3 p)
{
    // X軸回転
    p = rotate(p, 0.2, vec3(1.0, 0.0, 0.0));

    // Y軸回転
    //p = rotate(p, time, vec3(0.0, 1.0, 0.0));

    // 中心座標の移動
    vec3 s = vec3(0.0, 0.0, 10.0);

    float d = 100.0;
    for (float i = -25.0; i < 50.0; i++)
    {
        d = min(d, sphere(p - s - vec3(sin(time * (i + 1.0) / 10.0) * 1.5, 0.0, i / 1.7), 0.15));
    }

    return d;
}

void main()
{
    // 中心座標を原点(0, 0)とし、短辺で正規化する
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 ro = vec3(0.0, 0.0, -5.0);
    vec3 rd = normalize(vec3(pos, 0.0) - ro);
    vec3 p = ro;
    float t = 0.0;
    float d = 0.0;
    float thres = 0.01;

    for (int i = 0; i < 60; i++)
    {
        d = dist(p);
        t += d;
        p = ro + rd * t;
    }

    if (d < thres)
    {
        //gl_FragColor = vec4(abs(pos.x) * cos(time), abs(pos.y) * sin(time), sin(time + pos.x) * cos(time + pos.y), 1.0);
        gl_FragColor = vec4(abs(pos.x), abs(pos.y), 1.0, 1.0);
    }
    else
    {
        gl_FragColor = vec4(sin(time)/2.0, sin(time)/2.0, sin(time)/2.0, 1.0);
    }
}
