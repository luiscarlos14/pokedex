import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import api from "../../services/api";

import Card from "../../components/cards";
import axios from "axios";

export default function Home() {
  const [pokedex, setPokedex] = useState([]);
  const [lastPokemon, setLastPokemon] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   async function buscarPokemons() {
      chamarPokemons();
      setLoading(false);
    }
    buscarPokemons();
  }, []);

  async function chamarPokemons() {
    
    await api
      .get(`/pokemon?limit=20&offset=${lastPokemon}`)
      .then((response) => {
        let arrayPokemons = response.data.results;

        arrayPokemons.map((item, index) =>
          axios.get(item.url).then((response) => {
            setPokedex((pokedex) => [...pokedex, response.data]);
          })
        );

        setLastPokemon(pokedex.length - 1);
       
    
       
      });
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando Pokemons...</h1>
      </div>
    );
  }

  return (
    <div className="containerHome">
      <div className="listagem">
        {pokedex.map((item, index) => (
          <>
            <Card
              key={item.index}
              id={item.id}
              name={item.name}
              experience={item.base_experience}
              imagem={item.sprites.front_default}
            />
          </>
        ))}
      </div>

      <button onClick={() => chamarPokemons()}>Mais Pokemons</button>
    </div>
  );
}
