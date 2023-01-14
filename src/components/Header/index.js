import "./style.css";
import Pikachu from "../../assets/pokemon.gif";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <Link className="logo" to="/">
          Pokedex
          <img className="pikachu" src={Pikachu} alt="Logo pokedex" />
        </Link>
      </div>
      <div>
        <Link className="favoritos" to="/favoritos">
          Meus Pokemons
        </Link>
      </div>
    </header>
  );
}

export default Header;
