// lib/similitud.ts
import { supabase } from "@/lib/supabaseClient";

export async function getPeliculasSimilares(titulo: string) {
  const { data, error } = await supabase.rpc("buscar_similares", { query: titulo });
  if (error) {
    console.error("Error en similitud:", error);
    return [];
  }
  return data;
}
