/* downscale, dither and posterization */
#define DGAMMA 0.85
#define DLEVELS 64.0
#define DITHERSZ 8
#define DITHERSTR 0.02
void main()
{
	vec2 coord = TexCoord;
	vec2 sfact;
	vec4 res = texture(InputTexture,coord);
	if ( dolow == 1 )
	{
		sfact = lowres;
		coord = (floor(coord*sfact)+0.5)/sfact;
		ivec2 rcoord = ivec2(floor(coord*textureSize(InputTexture,0)));
		res = texelFetch(InputTexture,rcoord,0);
	}
	else sfact = textureSize(InputTexture,0);
	res.rgb = pow(res.rgb,vec3(DGAMMA));
	if ( dopos == 1 )
	{
		res.rgb += DITHERSTR*texelFetch(DitherTexture,ivec2(coord*sfact)%ivec2(DITHERSZ,DITHERSZ),0).xxx-DITHERSTR*0.5;
		res.rgb = trunc(res.rgb*DLEVELS)/DLEVELS;
	}
	FragColor = res;
}
