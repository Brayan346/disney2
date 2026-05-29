export default function Loading() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1E3A8A, #9333EA)",
      color: "white"
    }}>
      <img src="/icon-512.png" alt="App Icon" width={128} height={128} />
      <h1 style={{ marginTop: 20 }}>Bienvenido a Disney Replica</h1>
    </div>
  );
}
