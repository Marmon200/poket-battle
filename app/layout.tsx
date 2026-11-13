import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PokéBattle 2D",
  description: "Colleziona, allena e sfida Pokémon in un mondo tutto tuo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
