import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

export default function cards(props) {
  return (
    <div className="containerCard">
      <div className="imagem">
        <img src={props.imagem} alt="foto pokemon" />
      </div>

      <div className="info">
        <strong>{props.name}</strong>
        <Link to={`/pokemon/${props.id}`}>Detalhes</Link>
      </div>
    </div>
  );
}
