import { Shell } from "@/components/Shell";
import { StoreProvider } from "@/components/store";
import "./globals.css";

export const metadata = {
  title: "Malvinas Argentinas — Salud",
  description: "Reservá turnos en salitas municipales y gestioná tu perfil de salud.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          <Shell>{children}</Shell>
        </StoreProvider>
      </body>
    </html>
  );
}
