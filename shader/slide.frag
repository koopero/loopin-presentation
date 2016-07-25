#version 150

uniform sampler2DRect srcSampler;


in vec2 vTex;
out vec4 outputColour;

void main()
{
  vec4 c = texture(srcSampler, vTex);

  outputColour = vec4( c.g, c.r, c.b, c.a );
  outputColour.r = vTex.x;
}
