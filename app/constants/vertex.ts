
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
  uniform float u_time; // Uniform for animation time

  const float PI = 3.1415926535; // <<< FIX: Re-added the missing PI constant

  // A simple pseudo-random number generator
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    // 'progress' goes from 0.0 (right) to 1.0 (left).
    float progress = 1.0 - vUv.x;

    // --- 1. DEFINE BEAM SHAPES (Unchanged) ---
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

    // --- 2. CALCULATE GRADIENT COLORS (Unchanged) ---
    vec3 colorDarkOrange = vec3(0.949, 0.451, 0.110);
    vec3 colorLightOrange = vec3(0.933, 0.624, 0.212);
    vec3 colorYellowish = vec3(1.0, 0.8, 0.3);
    vec3 colorWhite = vec3(1.0);
    float horizontalFadeRampUp = smoothstep(0.5, 0.9, progress);
    float horizontalFadeRampDown = 1.0 - smoothstep(0.7, 1.0, progress);
    float horizontalFade = horizontalFadeRampUp * horizontalFadeRampDown;
    vec3 coreColor = mix(colorDarkOrange, colorLightOrange, horizontalFade);
    vec3 edgeColor = mix(coreColor, colorWhite, 0.9);
    float startStrength = 0.7;
    float endStrength = 0.4;
    float whiteHaloStrength = mix(startStrength, endStrength, progress);
    float yellowRampUp = smoothstep(0.2, 0.6, progress);
    float yellowRampDown = 1.0 - smoothstep(0.85, 1.0, progress);
    float yellowHaloStrength = yellowRampUp * yellowRampDown;
    float toYellowFade = smoothstep(0.05, 0.4, symmetricalDist) * yellowHaloStrength;
    vec3 coreLayerColor = mix(coreColor, colorYellowish, toYellowFade);
    float whiteHaloMask = smoothstep(0.2, 0.7, asymmetricalDist) * whiteHaloStrength;
    vec3 finalGradientColor = mix(coreLayerColor, edgeColor, whiteHaloMask);

    // --- 3. CALCULATE THE GRADIENT ALPHA (Unchanged) ---
    float shapeMask = 1.0 - smoothstep(0.1, 0.8, asymmetricalDist);
    float rightEdgeFade = smoothstep(1.0, 0.8, vUv.x);
    float alpha = shapeMask * rightEdgeFade;

    // --- 4. ADD MOVING STARS (UPDATED LOGIC) ---
    vec2 starUV = vUv;
    starUV.x -= u_time * 0.03;

    // 1. INCREASED GRID DENSITY: Creates many more potential locations for stars.
    vec2 starGrid = floor(starUV * vec2(1200.0, 700.0)); 
    float starValue = random(starGrid);

    // 2. SOFTER, SMALLER STARS: Use smoothstep to create tiny, anti-aliased dots.
    // This makes them look much smaller than a hard pixel.
    // A lower threshold (e.g., 0.99) means more stars appear.
    float star = smoothstep(0.989, 1.0, starValue);

    // Mix the star color (white) with the gradient color.
    vec3 finalColor = mix(finalGradientColor, vec3(1.0), star);

    // --- 5. SET FINAL OUTPUT ---
    gl_FragColor = vec4(finalColor, alpha);
  }
`;