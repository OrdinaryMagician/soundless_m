uniform float timer;

float rnd2( in vec2 sd )
{
	float rnv = sin(sd.x*3436.351)*cos(sd.y*1235.734)*6734.342;
	rnv = float(int(rnv)%256)/256.0;
	return rnv;
}
float rnd( in float sd )
{
	return rnd2(vec2(sd,1.0));
}

vec4 Process( vec4 color )
{
	vec2 coord = gl_TexCoord[0].st;
	vec4 res = getTexel(coord+0.02*vec2(rnd(timer*0.4536),rnd(timer*0.7835)));
	res += getTexel(coord-0.02*vec2(rnd(timer*0.6735),rnd(timer*0.4335)));
	res = getTexel(coord)+0.5*res;
	res.rgb *= vec3(1.59,0.84,0.77);
	res.rgb = pow(res.rgb,vec3(0.71,0.99,1.37));
	return res;
}
