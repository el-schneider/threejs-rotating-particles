uniform sampler2D uTexture;
varying vec2 vUv;
varying float vRotation;

mat2 rotate2d(float _angle) {
    return mat2(cos(_angle), -sin(_angle),
        sin(_angle), cos(_angle));
}

void main() {
    // Center the texture coordinates
    vec2 centeredCoord = gl_PointCoord - 0.5;

    mat2 rotationMatrix = rotate2d(vRotation);

    // Apply rotation to the centered coordinates
    vec2 rotatedCoord = rotationMatrix * centeredCoord;

    // Move the coordinates back to the 0-1 range
    vec2 finalCoord = rotatedCoord + 0.5;

    // Sample the texture with the rotated coordinates
    gl_FragColor = texture2D(uTexture, finalCoord);

    // Ensure the alpha channel is properly set to only the red channel
    gl_FragColor.a *= texture2D(uTexture, finalCoord).r;

    // gl_FragColor = vec4(vRotation, 0.0, 0.0, 1.0);
}
