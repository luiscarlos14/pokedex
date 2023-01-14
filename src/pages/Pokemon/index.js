import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./pokemon.css";
import api from "../../services/api";
import { Link } from "react-router-dom";

import pokebola from "../../assets/pokebola.gif";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Pokemon() {
  const { id } = useParams();
  const idInt = parseInt(id);

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkPokemonFavorite, setCheckPokemonFavorite] = useState(false);

  useEffect(() => {
    async function buscarPokemon() {
      await api
        .get(`/pokemon/${id}`)
        .then((response) => {
          setPokemon(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Erro:", error);
        });
    }

    function checkFavorite() {
      const minhaLista = localStorage.getItem("@meuspokemons");
      let pokemonSalvos = JSON.parse(minhaLista) || [];

      const hasPokemon = pokemonSalvos.some(
        (pokemonSalvos) => pokemonSalvos.id === pokemon.id
      );

      if (hasPokemon) {
        setCheckPokemonFavorite(true);
        return;
      }
    }

    buscarPokemon();
    checkFavorite();

    return () => {
      console.log("Componente foi desmontado!");
    };
  }, [id, pokemon]);

  function salvarPokemon() {
    const minhaLista = localStorage.getItem("@meuspokemons");
    let pokemonSalvos = JSON.parse(minhaLista) || [];

    const hasPokemon = pokemonSalvos.some(
      (pokemonSalvos) => pokemonSalvos.id === pokemon.id
    );

    if (hasPokemon) {
      let filtroPokemon = pokemonSalvos.filter((item) => {
        return item.id !== pokemon.id;
      });

      localStorage.setItem("@meuspokemons", JSON.stringify(filtroPokemon));
      setCheckPokemonFavorite(false);

      toast.success("Pokemon removido!");
      return;
    }

    pokemonSalvos.push(pokemon);
    localStorage.setItem("@meuspokemons", JSON.stringify(pokemonSalvos));
    toast.success("Pokemon Salvo!");
  }

  if (loading) {
    return (
      <div className="loading_pokebola">
        <img src={pokebola} alt="loading" />
      </div>
    );
  }

  return (
    <div className="containerPokemon">
      <div className="pokemon">
        <div className="imagePokemon">
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt="imagem do pokemon"
          />
        </div>

        <div className="descriptionPokemon">
          <div className="descriptionPokemonTitle">
            <div className="descriptionPokemonTitleHeader">
              <Link to={`/pokemon/${idInt - 1}`} reloadDocument>
                Anterior
              </Link>
              <h1>{pokemon.name}</h1>
              <Link to={`/pokemon/${idInt + 1}`} reloadDocument>
                Próximo
              </Link>
            </div>

            <div>
              <button
                className="buttonFavorite"
                onClick={() => salvarPokemon()}
              >
                {checkPokemonFavorite ? (
                  <AiFillHeart size={40} color="#FF0000" />
                ) : (
                  <AiOutlineHeart size={40} color="#FF0000" />
                )}
              </button>
            </div>
          </div>

          <div className="descriptionPokemonColumns">
            <div className="descriptionPokemonLeft">
              <div className="descriptionPokemonLeftInfo">
                <strong>ID:</strong>
                <strong> {pokemon.id}</strong>
              </div>

              <div className="descriptionPokemonLeftInfo">
                <strong>Height: </strong>
                <strong>{`${pokemon.height / 10} Mt`}</strong>
              </div>

              <div className="descriptionPokemonLeftInfo">
                <strong>Weight:</strong>
                <strong> {`${pokemon.weight / 10} Kg`}</strong>
              </div>

              <div className="descriptionPokemonLeftAbilities">
                <strong>Abilities: </strong>
                {pokemon.abilities.map((item) => (
                  <div>{item.ability.name}</div>
                ))}
              </div>

              <div className="descriptionPokemonLeftTypes">
                <strong>Types: </strong>
                {pokemon.types.map((item) => (
                  <div>{item.type.name}</div>
                ))}
              </div>
            </div>

            <div className="descriptionPokemonRight">
              {pokemon.stats.map((item) => (
                <div className="progress">
                  <strong className="progressTitle">{item.stat.name}</strong>
                  <ProgressBar completed={`${item.base_stat}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
