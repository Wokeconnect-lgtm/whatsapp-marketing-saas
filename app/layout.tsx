import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Woke Connect | WhatsApp Marketing",
  description: "La plateforme intelligente pour gérer vos contacts et vos campagnes WhatsApp.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
