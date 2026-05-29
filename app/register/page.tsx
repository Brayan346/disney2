"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    const { error } =
      await supabase.auth.signUp({

        email,
        password,

      });

    if (error) {

      setMessage(
        "Error al crear cuenta"
      );

      return;
    }

    setMessage(
      "Cuenta creada correctamente"
    );

    setTimeout(() => {

      router.push("/login");

    }, 1500);
  };

  return (

    <div className="auth-page">

      <div className="auth-overlay">

        <h1 className="auth-logo">
          Disney+
        </h1>

        <div className="auth-card">

          <h2>
            Crear Cuenta
          </h2>

          <p className="auth-subtitle">
            Únete a Disney+
          </p>

          <form
            onSubmit={handleRegister}
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
              Registrarse
            </button>

          </form>

          <button
            className="auth-secondary-btn"
            onClick={() =>
              router.push("/login")
            }
          >
            Ya tengo cuenta
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