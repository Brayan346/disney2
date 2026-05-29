"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      });

    if (error) {

      setMessage(
        "Correo o contraseña incorrectos"
      );

      return;
    }

    router.push("/home");
  };

  return (

    <div className="auth-page">

      {/* FONDO */}

      <div className="auth-overlay">

        {/* LOGO */}

        <h1 className="auth-logo">
          Disney+
        </h1>

        {/* CARD */}

        <div className="auth-card">

          <h2>
            Iniciar Sesión
          </h2>

          <p className="auth-subtitle">
            Bienvenido de nuevo
          </p>

          <form
            onSubmit={handleLogin}
            className="auth-form"
          >

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <button type="submit">
              Ingresar
            </button>

          </form>

          <button
            className="auth-secondary-btn"
            onClick={() =>
              router.push("/register")
            }
          >
            Crear cuenta
          </button>

          {message && (

            <p className="auth-message">
              {message}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}