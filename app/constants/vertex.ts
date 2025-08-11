
export const vertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;


export const fragment = `
  precision highp float;
  varying vec2 vUv;

  const float PI = 3.1415926535;

  void main() {
    // 'progress' goes from 0.0 (right) to 1.0 (left).
    float progress = 1.0 - vUv.x;

    // --- 1. DEFINE BEAM SHAPES (This logic is unchanged) ---
    float dipAmount = 0.15;
    float pivotY = 0.5 - dipAmount * sin(progress * PI);
    float baseExpansion = pow(progress, 1.5) * 1.0;
    
    float symmetricalDist = abs(vUv.y - pivotY) / (baseExpansion + 0.01);

    const float downwardSpreadFactor = 2.5; 
    float spreadFalloff = pow(1.0 - progress, 0.75);
    float dynamicDownwardSpread = mix(1.0, downwardSpreadFactor, spreadFalloff);
    float isBelow = step(vUv.y, pivotY);
    float asymmetryMultiplier = mix(1.0, dynamicDownwardSpread, isBelow);
    
    float asymmetricalDist = abs(vUv.y - pivotY) / (baseExpansion * asymmetryMultiplier + 0.01);


    // --- 2. CALCULATE COLORS WITH SMOOTHER GRADIENTS ---

    // A. Define the color palette (Unchanged)
    vec3 colorDarkOrange = vec3(0.949, 0.451, 0.110);
    vec3 colorLightOrange = vec3(0.933, 0.624, 0.212);
    vec3 colorYellowish = vec3(1.0, 0.8, 0.3);
    vec3 colorWhite = vec3(1.0);

    // B. Create a horizontal fade that gets dark again on the left.
    float horizontalFadeRampUp = smoothstep(0.5, 0.9, progress);
    float horizontalFadeRampDown = 1.0 - smoothstep(0.7, 1.0, progress);
    float horizontalFade = horizontalFadeRampUp * horizontalFadeRampDown;

    vec3 coreColor = mix(colorDarkOrange, colorLightOrange, horizontalFade);
    vec3 edgeColor = mix(coreColor, colorWhite, 0.9);

    // C. Define halo strengths
    float startStrength = 0.7;
    float endStrength = 0.4;
    float whiteHaloStrength = mix(startStrength, endStrength, progress);

    float yellowRampUp = smoothstep(0.2, 0.6, progress);
    float yellowRampDown = 1.0 - smoothstep(0.85, 1.0, progress);
    float yellowHaloStrength = yellowRampUp * yellowRampDown;

    // D. Calculate the CORE layer (Orange -> Yellow)
    float toYellowFade = smoothstep(0.05, 0.4, symmetricalDist) * yellowHaloStrength;
    vec3 coreLayerColor = mix(coreColor, colorYellowish, toYellowFade);

    // E. Calculate the WHITE HALO layer
    float whiteHaloMask = smoothstep(0.2, 0.7, asymmetricalDist) * whiteHaloStrength;

    // F. Blend the two layers together.
    vec3 finalColor = mix(coreLayerColor, edgeColor, whiteHaloMask);


    // --- 3. CREATE THE FINAL ALPHA (This logic is unchanged) ---
    float shapeMask = 1.0 - smoothstep(0.1, 0.8, asymmetricalDist);
    float rightEdgeFade = smoothstep(1.0, 0.8, vUv.x);
    float alpha = shapeMask * rightEdgeFade;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;