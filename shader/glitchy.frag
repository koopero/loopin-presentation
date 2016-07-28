#version 150

uniform sampler2DRect srcSampler;

uniform float frameTime;
uniform float hue;

in vec2 srcCoord;
out vec4 outputColour;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float multiCos( float x, float a, float b, float c ){
  x /= 10.0;
  float t = frameTime;
  return (
    ( cos( x * a + t * 2.9 * b ) * 0.5 + 0.5 ) +
    ( cos( x * b + t * 3.3 * a ) * 0.5 + 0.5 ) +
    ( cos( x * c + t * 3.8 * b ) * 0.5 + 0.5 )
  ) / 3.0;
}


void main()
{
  vec4 red = srcCoord.rgrr;
  vec4 green = srcCoord.rgrr;
  vec4 blue = srcCoord.rgrr;
  vec4 alpha = srcCoord.rgrr;

  red.x += rand( srcCoord.yy + vec2(frameTime, 4.0) ) * 60.3 * multiCos( srcCoord.y, 5.0, 5.4, 6.5 ) ;
  green.y += rand( srcCoord.xy + vec2(frameTime, 3.0) ) * 20.3;
  blue.x += rand( srcCoord.xy + vec2(frameTime, 2.0) ) * 40.3 * multiCos( srcCoord.x, 3.0, 3.3, 2.5 ) ;

  // green.y += cos( srcCoord.y * 0.3 ) * 10.2;


  // green = red;
  // blue = red;

  red = texture(srcSampler, red.xy );
  green = texture(srcSampler, green.xy );
  blue = texture(srcSampler, blue.xy );

  vec4 c = vec4( red.r, green.g, blue.b, ( red.a + green.a + blue.a ) * 0.3 );
  c *= vec4( 0.6, 0.8, 1.2, 1.5 );
  c.rg *= c.bb + vec2( 0.02, 0.04 );

  outputColour = c;
}
