#version 150

uniform sampler2DRect srcSampler;

uniform float hue;

in vec2 srcCoord;
out vec4 outputColour;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
  vec4 c = texture(srcSampler, srcCoord);
  float v = c.g;
  float h = hue + 0.75 + c.r * 0.2;
  float s = 0.35 + c.b * 0.1;


  outputColour.rg = srcCoord;
  outputColour.b = 1.0;
  outputColour.a = 0.9;
}
