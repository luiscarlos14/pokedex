import React from "react";
import './error.css';
import notfound from "../../assets/notfound.jpg";

export default function Error() {
  return (
    <div className="ContainerError">
      <img src={notfound} alt="imagem pikachu dormindo" />
      <h1>404</h1>
      <h3>Página não encontrada</h3>
    </div>
  );
}
