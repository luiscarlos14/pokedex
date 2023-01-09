/* import React, { useState, useEffect } from "react";
import api from "../../services/api";

import Card from "../../components/cards";

export default function Home() {
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    async function buscarPokemons() {
      await api.get("/pokemon?limit=2&offset=0").then((response) => {
        setPokedex(response.data.results);
        //console.log(response.data.results)
        //console.log(pokemons)
      });
    }
    buscarPokemons();
  }, []);

  return (
    <div>
      {pokedex.map((item, index) => (
        <>
          <Card key={item.url} name={item.name} url={item.url} />
       </>
      ))}
    </div>
  );
}
 */

import React, { useState, useEffect } from "react";
import './home.css';
import api from "../../services/api";

import Card from "../../components/cards";
import axios from "axios";

export default function Home() {
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    async function buscarPokemons() {
      await api.get("/pokemon?limit=15&offset=0").then((response) => {
        let array = response.data.results;

       
           array.map((item, index)=>(

           axios.get(item.url).then((response)=>{
               setPokedex((pokedex) => [...pokedex, response.data])
           })
         ))

        

     
        
        //setPokedex(response.data.results);
        //console.log(response.data.results)
        //console.log(pokemons)
      });
    }
    buscarPokemons();
  }, []);

  console.log(pokedex)
  

  return (
    <div className="containerHome">
     
      {
        pokedex.map((item, index) =>(
          <>
          <Card 
            key={item.index} 
            id={item.id} 
            name={item.name} 
            experience={item.base_experience} 
            imagem={item.sprites.front_default} />
          
          </>
        ))
      }
    </div>
  );
}

