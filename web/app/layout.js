import { Roboto } from "next/font/google";
import { AppStateProvider } from "@/components/app-state";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Malvinas Argentinas — Talleres Culturales",
  description: "Oferta cultural municipal de Malvinas Argentinas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <AppStateProvider>
          <div className="stage">{children}</div>
        </AppStateProvider>
      </body>
    </html>
  );
}
