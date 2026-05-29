"use client";

import { useEffect, useState } from "react";

interface Character {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  tvShows: string[];
}

export default function HomePage() {

  const [characters, setCharacters] =
    useState<Character[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ---------------------------------
  // CARGAR API
  // ---------------------------------

  const fetchCharacters = async () => {

    try {

      const response =
        await fetch(
          "https://api.disneyapi.dev/character"
        );

      const data =
        await response.json();

      setCharacters(data.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchCharacters();

  }, []);

  // ---------------------------------
  // CATEGORIAS
  // ---------------------------------

  const disneyMovies =
    characters.filter(
      (character) =>
        character.films?.length > 0
    );

  const disneyShows =
    characters.filter(
      (character) =>
        character.tvShows?.length > 0
    );

  const princess =
    characters.filter(
      (character) =>
        character.name
          .toLowerCase()
          .includes("elsa") ||

        character.name
          .toLowerCase()
          .includes("anna") ||

        character.name
          .toLowerCase()
          .includes("moana") ||

        character.name
          .toLowerCase()
          .includes("ariel") ||

        character.name
          .toLowerCase()
          .includes("belle")
    );

  const classics =
    characters.filter(
      (character) =>
        character.name
          .toLowerCase()
          .includes("mickey") ||

        character.name
          .toLowerCase()
          .includes("donald") ||

        character.name
          .toLowerCase()
          .includes("goofy")
    );

  // ---------------------------------
  // COMPONENTE CATEGORIA
  // ---------------------------------

  const renderCategory = (
    title: string,
    list: Character[]
  ) => (

    <section className="section">

      <h2 className="section-title">
        {title}
      </h2>

      <div className="horizontal-scroll">

        {list.slice(0, 12).map((character) => (

          <div
            key={character._id}
            className="card"
          >

            <img
              src={character.imageUrl}
              alt={character.name}
            />

            <div className="card-overlay">

              <h3 className="card-title">
                {character.name}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </section>
  );

  // ---------------------------------
  // LOADING
  // ---------------------------------

  if (loading) {

    return (

      <div className="loading-screen">

        <h1>
          Disney+
        </h1>

      </div>
    );
  }

  // ---------------------------------
  // UI
  // ---------------------------------

  return (

    <div className="page">

      {/* HERO */}

      <section
        className="hero"
        style={{
          backgroundImage:
            "url(https://wallpapers.com/images/featured/disney-plus-background-n0s2km84m4x9wola.jpg)"
        }}
      >

        <div className="hero-content">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg"
            alt="Disney+"
            className="hero-logo"
          />

          <button className="hero-button">
            QUIERO DISNEY+
          </button>

        </div>

      </section>

      {renderCategory(
        "Principales",
        disneyMovies
      )}

      {renderCategory(
        "Disney Channel",
        disneyShows
      )}

      {renderCategory(
        "Princesas",
        princess
      )}

      {renderCategory(
        "Clásicos Disney",
        classics
      )}

    </div>
  );
}