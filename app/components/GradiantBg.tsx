// components/GradientBackground.tsx
export default function GradientBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Stars layer */}
      <div
        className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center"
        style={{
          backgroundBlendMode: "screen",
        }}
      />

      {/* Orange-to-black gradient */}
      <div
        className="absolute inset-0 bg-gradient-radial from-[rgba(255,165,0,0.9)] via-[rgba(255,200,0,0.6)] to-black"
        style={{
          background: `radial-gradient(
            circle at top left,
            rgba(255,165,0,0.9) 0%,
            rgba(255,200,0,0.6) 30%,
            rgba(0,0,0,0.5) 70%,
            rgba(0,0,0,1) 100%
          )`,
        }}
      />
    </div>
  );
}
