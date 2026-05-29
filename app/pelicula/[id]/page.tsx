// app/pelicula/[id]/page.tsx
import { getPeliculasSimilares } from "@/lib/similitud";
import { supabase } from "@/lib/supabaseClient";

interface Pelicula {
  id: string;
  titulo: string;
  descripcion: string;
}

export default async function PeliculaPage({ params }: { params: { id: string } }) {
  // 1. Obtener la película actual desde Supabase
  const { data: pelicula, error } = await supabase
    .from("peliculas")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !pelicula) {
    return <div>Error cargando película</div>;
  }

  // 2. Obtener películas similares usando RPC
  const similares = await getPeliculasSimilares(pelicula.titulo);

  // 3. Renderizar la vista
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{pelicula.titulo}</h1>
      <p className="mb-6">{pelicula.descripcion}</p>

      <h2 className="text-2xl font-semibold mb-3">Películas similares</h2>
      <ul className="list-disc pl-6">
        {similares?.map((s: any) => (
          <li key={s.titulo}>
            {s.titulo} (score: {s.score.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
}
