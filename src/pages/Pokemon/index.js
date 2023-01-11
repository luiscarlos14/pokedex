import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./pokemon.css";
import api from "../../services/api";

export default function Pokemon() {
  const { id } = useParams();
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
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  console.log(pokemon.sprites.other.dream_world.front_default);

  return (
    <div className="containerPokemon">

      <h1>{pokemon.name}</h1>

      <div className="pokemon">

        <div className="imagePokemon">
          <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
        </div>

        <div className="descriptionPokemon">
            <h1>Teste</h1>
        </div>

      </div>
    </div>
  );
}
