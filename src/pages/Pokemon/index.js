import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./pokemon.css";
import api from "../../services/api";
import { Link } from "react-router-dom";

import pokebola from "../../assets/pokebola.gif";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Pokemon() {
  const { id } = useParams();
  const idInt = parseInt(id);
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

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
    buscarPokemon();

    return () => {
      console.log("Componente foi desmontado!");
    };
  }, [id]);

  if (loading) {
    return (
      <div className="loading_pokebola">
        <img src={pokebola} alt="" />
      </div>
    );
  }

  return (
    <div className="containerPokemon">
      <div className="pokemon">
        <div className="imagePokemon">
          <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
        </div>

        <div className="descriptionPokemon">
          <div className="descriptionPokemonTitle">
            <Link to={`/pokemon/${idInt - 1}`}>Anterior</Link>
            <h1>{pokemon.name}</h1>
            <Link to={`/pokemon/${idInt + 1}`}>Próximo</Link>
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
