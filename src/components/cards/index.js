import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

export default function cards(props) {
  console.log(props.types);
  return (
    <div className={`containerCard ${props.type}`}>
      <div className="imagem">
        <h3 className={props.type}>#{props.id} - {props.type}</h3>
        <img src={props.imagem} alt="foto pokemon" />
      </div>

      <div className="info">
        <strong>{props.name}</strong>
        <Link className={props.type} to={`/pokemon/${props.id}`}>Detalhes</Link>
      </div>
    </div>
  );
}
