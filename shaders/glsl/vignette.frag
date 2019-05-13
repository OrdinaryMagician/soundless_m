/* A very plain and simple round vignette */
void main()
{
	vec2 coord = TexCoord;
	vec4 res = texture(InputTexture,coord);
	vec4 vigdata = texture(VignetteTexture,coord);
	vec3 outcol = res.rgb*vigdata.rgb;
	res.rgb = mix(res.rgb,outcol,vigdata.a);
	FragColor = res;
}
