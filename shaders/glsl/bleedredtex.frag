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

vec4 ProcessTexel()
{
	vec4 res = 0.1+texture(basetex,vTexCoord.st*4.0+vec2(0.0,timer*0.01))*0.8;
	vec4 nz = texture(bleedtex,vTexCoord.st*0.4+vec2(0.25,timer*0.02));
	nz.x = 1.0+3.0*pow(nz.x,2.5);
	res.rgb = mix(res.rgb,pow(res.rgb,vec3(0.8,1.9,2.3)),nz.x);
	nz = texture(bleedtex,vTexCoord.st*0.8+vec2(0.5,timer*0.02));
	nz.x = 1.0+3.0*pow(nz.x,2.5);
	res.rgb = mix(res.rgb,pow(res.rgb,vec3(0.8,2.2,4.6)),nz.x);
	vec4 red = getTexel(vTexCoord.st+0.02*vec2(rnd(timer*0.4536),rnd(timer*0.7835)));
	red += getTexel(vTexCoord.st-0.02*vec2(rnd(timer*0.6735),rnd(timer*0.4335)));
	red = getTexel(vTexCoord.st)+0.5*red;
	red.rgb *= vec3(1.59,0.84,0.77);
	red.rgb = pow(red.rgb,vec3(0.71,0.99,1.37));
	vec4 col = clamp(red+res*0.25,vec4(0.0),vec4(1.0));
	return vec4(col.rgb,1.0);
}
