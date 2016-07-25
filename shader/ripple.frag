#version 150

uniform sampler2DRect srcSampler;
uniform sampler2DRect waterSampler;

uniform float frameTime;

in vec2 srcTex;
in vec2 srcSize;
in vec2 waterTex;

out vec4 outputColour;

void main()
{
  float clock = 0.0;
  vec2 displace = vec2(
    cos( frameTime * 1.3 + srcTex.y * 150.0 ) + cos( frameTime * 1.35 + srcTex.y * 269.0 ) * 0.2,
    cos( frameTime * 1.6 + srcTex.x * 109.0 )
  );
  // displace *= noise2( vec3( waterTex.x, waterTex.y, frameTime * 1000.0 ) * 0.1 );
  displace *= texture(waterSampler, waterTex ).rg;

  displace *= vec2(0.006, 0.001);

  vec2 coord = srcTex + displace;

  vec4 c = texture(srcSampler, coord * srcSize );
  // c.r = displace.r;
  outputColour = vec4( c.r, c.g, c.b, c.a );
  // outputColour.r = vTex.x;
}
