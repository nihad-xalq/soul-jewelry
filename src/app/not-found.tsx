export default function NotFound() {
  return (
    <html lang="az" className="h-full">
      <body
        style={{
          margin: 0,
          minHeight: "100%",
          background: "#f4f1ec",
          color: "#1a1918",
          fontFamily: "Georgia, serif",
        }}
      >
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "7rem 1.25rem", textAlign: "center" }}>
          <p style={{ letterSpacing: "0.32em", textTransform: "uppercase", fontSize: 12 }}>404</p>
          <h1 style={{ fontSize: "3rem", fontWeight: 500 }}>Bu səhifə seçimdə yoxdur.</h1>
          <p style={{ marginTop: "2rem", fontFamily: "sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12 }}>
            <a href="/products">Mağazaya qayıt</a>
          </p>
        </main>
      </body>
    </html>
  );
}
