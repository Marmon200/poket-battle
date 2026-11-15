export default function Page() {
  return (
    <iframe
      src="/game/index.html?v=liveops-1"
      title="PokéBattle 2D"
      allow="autoplay; fullscreen"
      style={{
        position: "fixed",
        inset: 0,
        border: 0,
        width: "100%",
        height: "100dvh",
        background: "#edf7ff",
      }}
    />
  );
}
