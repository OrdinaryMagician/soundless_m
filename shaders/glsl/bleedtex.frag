uniform float timer;

vec4 Process( vec4 color )
{
	vec2 coord = gl_TexCoord[0].st;
	vec4 res = getTexel(fract(coord+vec2(0.0,timer*0.01)));
	vec4 nz = getTexel(fract(coord+vec2(0.25,timer*0.03)));
	nz.x = max(nz.x,max(nz.y,nz.z));
	nz.x = 1.0+3.0*pow(nz.x,2.5);
	res.rgb = mix(res.rgb,pow(res.rgb,vec3(0.8,1.9,2.3)),nz.x);
	nz = getTexel(fract(coord+vec2(0.5,timer*0.06)));
	nz.x = max(nz.x,max(nz.y,nz.z));
	nz.x = 1.0+3.0*pow(nz.x,2.5);
	res.rgb = mix(res.rgb,pow(res.rgb,vec3(0.8,2.2,4.6)),nz.x);
	return res;
}
