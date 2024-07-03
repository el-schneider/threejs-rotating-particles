uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

varying float vRandom;
varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(uTime + uFrequency.x * modelPosition.x) * 0.05;
    modelPosition.z += sin(uTime + uFrequency.y * modelPosition.y) * 0.05;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
}
