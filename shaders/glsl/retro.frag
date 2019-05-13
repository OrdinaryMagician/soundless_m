/* downscale, dither and posterization */
#define DSCALE vec2(480.0,270.0)
#define DGAMMA 0.85
#define DLEVELS 32.0
#define DITHERSZ 8
#define DITHERSTR 0.02
void main()
{
	vec2 coord = TexCoord;
	vec2 sfact;
	if ( dolow == 1 )
	{
		sfact = DSCALE;
		coord = (floor(coord*sfact)+0.5)/sfact;
	}
	else sfact = textureSize(InputTexture,0);
	vec4 res = texture(InputTexture,coord);
	if ( dopos == 1 ) res.rgb = pow(res.rgb,vec3(DGAMMA));
	if ( dodither == 1 ) res.rgb += DITHERSTR*texelFetch(DitherTexture,ivec2(coord*sfact)%ivec2(DITHERSZ,DITHERSZ),0).xxx;
	if ( dopos == 1 ) res.rgb = floor(res.rgb*DLEVELS)/DLEVELS;
	FragColor = res;
}
