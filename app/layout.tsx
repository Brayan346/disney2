"use client";

import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>

        {/* NAVBAR */}

        <header className="navbar">

          <Link
            href="/home"
            className="logo"
          >
            Disney+
          </Link>

          <nav className="nav-links">

            <Link href="/home">
              Inicio
            </Link>

            <Link href="/mvp">
              Favoritos
            </Link>

            <Link href="/user">
              Perfil
            </Link>

          </nav>

        </header>

        {children}

      </body>
    </html>
  );
}


}
