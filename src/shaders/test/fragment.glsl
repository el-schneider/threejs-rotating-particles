uniform sampler2D uTexture;
varying vec2 vUv;
varying float vRotation;

void main() {
    // Center the texture coordinates
    vec2 centeredCoord = gl_PointCoord - 0.5;

    // Create a 2D rotation matrix for z-axis rotation
    float cosAngle = cos(vRotation);
    float sinAngle = sin(vRotation);
    mat2 rotationMatrix = mat2(
            cosAngle, -sinAngle,
            sinAngle, cosAngle
        );

    // Apply rotation to the centered coordinates
    vec2 rotatedCoord = rotationMatrix * centeredCoord;

    // Move the coordinates back to the 0-1 range
    vec2 finalCoord = rotatedCoord + 0.5;

    // Sample the texture with the rotated coordinates
    gl_FragColor = texture2D(uTexture, finalCoord);

    // Ensure the alpha channel is properly set
    gl_FragColor.a *= texture2D(uTexture, finalCoord).r;

    // gl_FragColor = vec4(vRotation, 0.0, 0.0, 1.0);
}
