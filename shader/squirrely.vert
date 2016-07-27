#version 150

// these are for the programmable pipeline system and are passed in
// by default from OpenFrameworks
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 textureMatrix;
uniform mat4 modelViewProjectionMatrix;

// openframeworks default model format
in vec4 position;
in vec4 color;
in vec4 normal;
in vec2 texcoord;

// Loopin default src
uniform sampler2DRect srcSampler;
uniform mat4 srcMatrix;

// Loopin frame
uniform float frameTime;

// varying
out vec2 srcCoord;

uniform float phase;

void main()
{
    srcCoord = vec2(texcoord.x, texcoord.y);
    srcCoord = (srcMatrix*vec4(srcCoord.x,srcCoord.y,0,1)).xy;
    srcCoord *= textureSize( srcSampler );

    vec4 pos = position;

    // pos.x *= 1.2;
    // pos.x *= cos( pos.y * 5.0 - frameTime * 2.0 + phase * 6.0 ) * 0.3 + 1.0;
    pos.x += cos( pos.y * 3.0 + frameTime ) * 0.1;
    pos = modelViewProjectionMatrix * pos;
    pos.y += cos( pos.x * 1000.0 ) * 0.04;
    // pos.x += cos(pos.y * 20.0) * 0.03;
    // pos.y += sin(pos.x * 10.0) * 0.02;
    // send the vertices to the fragment shader
    gl_Position = pos;
}
