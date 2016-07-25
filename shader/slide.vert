#version 150

// these are for the programmable pipeline system and are passed in
// by default from OpenFrameworks
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 textureMatrix;
uniform mat4 modelViewProjectionMatrix;

// Loopin default src
uniform sampler2DRect srcSampler;
uniform mat4 srcMatrix;

// Loopin feedback


// Loopin iterator


// openframeworks default model format
in vec4 position;
in vec4 color;
in vec4 normal;
in vec2 texcoord;

// varying
out vec2 vTex;


void main()
{
    // here we move the texture coordinates
    vTex = vec2(texcoord.x, texcoord.y);
    vTex = (srcMatrix*vec4(vTex.x,vTex.y,0,1)).xy;
    vTex *= textureSize( srcSampler );
    // vTex = texcoord;


    // send the vertices to the fragment shader
    gl_Position = modelViewProjectionMatrix * position;
}
