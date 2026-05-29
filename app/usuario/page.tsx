"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UsuarioPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  if (!user) {
    return <p className="text-white">Cargando usuario...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
      <div className="w-[500px] bg-[#121826] p-8 rounded-2xl text-white">
        <h1 className="text-3xl font-bold mb-6">Panel de Usuario</h1>
        <p><strong>Nombre:</strong> {user.user_metadata?.nombre}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.user_metadata?.rol || "usuario"}</p>
      </div>
    </div>
  );
}