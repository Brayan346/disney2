"use client";

import { useEffect, useState } from "react";

interface Favorite {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  tvShows: string[];
}

export default function FavoritesPage() {

  const [favorites, setFavorites] =
    useState<Favorite[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCharacter, setSelectedCharacter] =
    useState<Favorite | null>(null);

  // -----------------------------------
  // CARGAR PERSONAJES
  // -----------------------------------

  const fetchFavorites = async () => {

    try {

      const response =
        await fetch(
          "https://api.disneyapi.dev/character"
        );

      const data =
        await response.json();

      const cleanData =
        data.data.filter(
          (character: Favorite) =>
            character.imageUrl &&
            character.name
        );

      setFavorites(
        cleanData.slice(0, 18)
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchFavorites();

  }, []);

  // -----------------------------------
  // LOADING
  // -----------------------------------

  if (loading) {

    return (

      <div className="loading-screen">

        <h1>
          Disney+
        </h1>

      </div>
    );
  }

  // -----------------------------------
  // UI
  // -----------------------------------

  return (

    <div className="favorites-page">

      {/* HERO */}

      <section className="favorites-hero">

        <div>

          <h1 className="favorites-title">
            Mis Favoritos
          </h1>

          <p className="favorites-description">
            Tus personajes favoritos
            guardados en Disney+
          </p>

        </div>

      </section>

      {/* GRID */}

      <div className="favorites-grid">

        {favorites.map(
          (character, index) => {

            return (

              <div
                key={`${character._id}-${index}-${character.name}`}
                className="favorite-card"
              >

                <img
                  src={character.imageUrl}
                  alt={character.name}
                />

                <div className="favorite-overlay">

                  <h2>
                    {character.name}
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedCharacter(
                        character
                      )
                    }
                  >
                    Ver más
                  </button>

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* MODAL */}

      {selectedCharacter && (

        <div className="modal-backdrop">

          <div className="modal-card">

            <img
              src={
                selectedCharacter.imageUrl
              }
              alt={
                selectedCharacter.name
              }
            />

            <div className="modal-content">

              <h2>
                {selectedCharacter.name}
              </h2>

              <div className="modal-info">

                <span>
                  Películas
                </span>

                <p>

                  {selectedCharacter.films
                    ?.length > 0

                    ? selectedCharacter.films
                        .slice(0, 3)
                        .join(", ")

                    : "No disponibles"}

                </p>

              </div>

              <div className="modal-info">

                <span>
                  Series
                </span>

                <p>

                  {selectedCharacter.tvShows
                    ?.length > 0

                    ? selectedCharacter.tvShows
                        .slice(0, 3)
                        .join(", ")

                    : "No disponibles"}

                </p>

              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedCharacter(
                    null
                  )
                }
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}