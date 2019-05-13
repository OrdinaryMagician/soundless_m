/* otherworld filter */
#define OSCALE vec2(480.0,270.0)
#define OMUL vec3(1.19,0.94,0.87)
#define OPOW vec3(0.81,0.99,1.17)
#define OBASE 32.0
#define ORAD 2
void main()
{
	vec2 coord = TexCoord;
	vec2 px;
	if ( dolow == 1 ) px = 1.0/OSCALE;
	else px = 1.0/textureSize(InputTexture,0);
	vec2 nc;
	vec4 base = texture(InputTexture,coord);
	vec4 res = base;
	if ( doblur == 1 )
	{
		res *= OBASE;
		float cnt = OBASE;
		int i, j;
		for ( j=-ORAD; j<=ORAD; j++ ) for ( i=-ORAD; i<=ORAD; i++ )
		{
			nc = coord+px*vec2(i,j);
			if ( (nc.x >= 0.0) && (nc.x < 1.0) && (nc.y >= 0.0) && (nc.y < 1.0) )
			{
				res += texture(InputTexture,nc);
				cnt += 1.0;
			}
		}
		res /= cnt;
	}
	if ( dotint == 1 )
	{
		res.rgb *= OMUL;
		res.rgb = pow(res.rgb,OPOW);
	}
	FragColor = mix(base,res,blend);
}
