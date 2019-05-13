uniform float timer;

vec4 ProcessTexel()
{
	vec4 res = 0.1+texture(basetex,vTexCoord.st*4.0+vec2(0.0,timer*0.01))*0.8;
	vec4 nz = texture(bleedtex,vTexCoord.st*0.4+vec2(0.25,timer*0.02));
	nz.x = 1.0+3.0*pow(nz.x,2.5);
	res.rgb = mix(res.rgb,pow(res.rgb,vec3(0.8,1.9,2.3)),nz.x);
	nz = texture(bleedtex,vTexCoord.st*0.8+vec2(0.5,timer*0.02));
	nz.x = 1.0+3.0*pow(nz.x,2.5);
	res.rgb = mix(res.rgb,pow(res.rgb,vec3(0.8,2.2,4.6)),nz.x);
	vec4 col = clamp(getTexel(vTexCoord.st)+res*0.25,vec4(0.0),vec4(1.0));
	return vec4(col.rgb,1.0);
}
