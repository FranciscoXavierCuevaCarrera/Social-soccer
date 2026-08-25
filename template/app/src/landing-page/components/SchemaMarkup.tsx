// JSON-LD structured data for Social Soccer.
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Social Soccer",
      description:
        "Plataforma para organizar partidos de fútbol, gestionar jugadores y árbitros, y consultar estadísticas.",
      applicationCategory: "SportsApplication",
      operatingSystem: "Cross-platform",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "WebSite",
      name: "Social Soccer",
      description:
        "La comunidad del fútbol amateur para organizar, jugar y competir.",
      inLanguage: "es",
    },
  ],
};

export function SchemaMarkup() {
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}
