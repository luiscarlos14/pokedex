import React, { useEffect, useState } from "react";
import "./favoritos.css";

import Card from "../../components/cards";
import pokebola from "../../assets/pokebola.gif";

export default function Favoritos() {
  const [pokedex, setPokedex] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@meuspokemons");
    setPokedex(JSON.parse(minhaLista) || []);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading_pokebola">
        <img src={pokebola} alt="loading pokemon" />
      </div>
    );
  }

  if (pokedex.length === 0) {
    return <div className="SemPokemons"><h1>Nenhum pokemon salvo</h1></div> ;
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
    </div>
  );
}
