#version 150

uniform sampler2DRect srcSampler;
uniform sampler2DRect waterSampler;

uniform float frameTime;

uniform float waterline = 0.9;

in vec2 srcTex;
in vec2 srcSize;
in vec2 waterTex;

out vec4 outputColour;

void main()
{
  float clock = 0.0;

  // displace *= noise2( vec3( waterTex.x, waterTex.y, frameTime * 1000.0 ) * 0.1 );

  vec2 coord = srcTex;

  float y = srcTex.y - waterline;

  float yCut = cos( frameTime * 6.4 + srcTex.x * 10.0 ) * 0.01;
  // c.r = displace.r;
  if ( y <= yCut ) {
    vec4 c = texture(srcSampler, srcTex * srcSize );
    outputColour = vec4( c.r, c.g, c.b, c.a );
  } else {
    coord.y -= yCut*2.0;

    coord += vec2(
      cos( frameTime * 1.3 + srcTex.y * 250.0 ) + cos( frameTime * 1.35 + srcTex.y * 269.0 ) * 0.2,
      cos( frameTime * 1.6 + srcTex.x * 109.0 )
    ) * vec2( y * 0.1, 0.001);

    vec2 refCoord = coord;
    refCoord.y = waterline-coord.y + waterline ;
    vec4 r = texture(srcSampler, refCoord * srcSize );
    outputColour = vec4( r.r, r.g, r.b, r.a * 0.7 );
  }
  // outputColour.r = vTex.x;
}
