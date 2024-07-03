uniform vec2 uFrequency;
uniform float uTime;
uniform float uParticleSize;

attribute float aSize;
attribute float aRotation;

varying vec2 vUv;
varying float vRotation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(uTime + uFrequency.x * modelPosition.x) * 0.05;
    modelPosition.z += sin(uTime + uFrequency.y * modelPosition.y) * 0.05;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uParticleSize * 0.1 * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vRotation = aRotation;
    //    vUv = vec2(aSize, 1.0);
}
