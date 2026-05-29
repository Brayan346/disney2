"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface Usuario {
  id: string;
  email: string;
}

export default function UsuarioPage() {

  const router = useRouter();

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [mensaje, setMensaje] =
    useState("");

  // -------------------------------------
  // CARGAR USUARIO
  // -------------------------------------

  const fetchUsuario = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    setUsuario({
      id: user.id,
      email: user.email || "",
    });

    setLoading(false);
  };

  // -------------------------------------
  // CERRAR SESION
  // -------------------------------------

  const handleLogout = async () => {

    await supabase.auth.signOut();

    router.push("/login");
  };

  // -------------------------------------
  // INICIO
  // -------------------------------------

  useEffect(() => {

    fetchUsuario();

  }, []);

  // -------------------------------------
  // LOADING
  // -------------------------------------

  if (loading) {

    return (

      <div className="loading-screen">

        <h1>
          Disney+
        </h1>

      </div>
    );
  }

  // -------------------------------------
  // UI
  // -------------------------------------

 return (

  <div className="user-page">

    <nav className="user-navbar">

      <h1 className="user-logo">
        Disney+
      </h1>

      <button
        onClick={() => router.push("/home")}
        className="user-nav-button"
      >
        Inicio
      </button>

    </nav>

    <div className="user-container">

      <div className="user-avatar">

        {usuario?.email
          ?.charAt(0)
          .toUpperCase()}

      </div>

      <h1 className="user-title">
        Mi Perfil
      </h1>

      <p className="user-email">
        {usuario?.email}
      </p>

      <div className="user-card">

        <span>
          Cuenta
        </span>

        <h2>
          Disney User
        </h2>

      </div>

      <div className="user-card">

        <span>
          Suscripción
        </span>

        <h2>
          Disney+ Premium
        </h2>

      </div>

      <button className="user-primary-button">
        Editar perfil
      </button>

      <button
        onClick={handleLogout}
        className="user-secondary-button"
      >
        Cerrar sesión
      </button>

    </div>

  </div>
);
}