/* downscale, dither and posterization */
#define DMINSCALE vec2(320.0,200.0)
#define DSCALE 0.25
#define DGAMMA 0.85
#define DLEVELS 32.0
#define DITHERSZ 8
#define DITHERSTR 0.02
void main()
{
	vec2 coord = TexCoord;
	vec2 sfact = max(DMINSCALE,textureSize(InputTexture,0)*DSCALE);
	coord = (floor(coord*sfact)+0.5)/sfact;
	vec4 res = texture(InputTexture,coord);
	res.rgb = pow(res.rgb,vec3(DGAMMA));
	res.rgb += DITHERSTR*texelFetch(DitherTexture,ivec2(coord*sfact)%ivec2(DITHERSZ,DITHERSZ),0).xxx;
	res.rgb = floor(res.rgb*DLEVELS)/DLEVELS;
	FragColor = res;
}