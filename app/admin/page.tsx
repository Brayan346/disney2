"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await supabase.from("usuarios").select("*");
      if (error) {
        console.error(error);
      } else {
        setUsuarios(data);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
      <div className="w-[600px] bg-[#121826] p-8 rounded-2xl text-white">
        <h1 className="text-3xl font-bold mb-6">Panel Administrativo</h1>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="p-2">{u.nombre}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
