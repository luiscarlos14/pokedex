import React, { useState, useEffect } from "react";
import "./home.css";
import api from "../../services/api";
import pokebola from "../../assets/pokebola.gif";
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
      <div className="loading_pokebola">
        <img src={pokebola} alt="loading pokemon" />
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
              type={item.types[0].type.name}
            />
          </>
        ))}
      </div>

      <button onClick={() => chamarPokemons()}>Mais Pokemons</button>
    </div>
  );
}
