import React from 'react';
import './card.css';
import { Link } from 'react-router-dom'


import {BsBookmarkHeart} from 'react-icons/bs';

export default function cards(props) {
 return (
   <div className='container'>

    <div className='imagem'>
        <img src={props.imagem} alt="foto pokemon" />
    </div>

    <div className='info'>
      <strong>{props.name}</strong>
      <Link to={`/pokemon/${props.id}`}>Acessar</Link>

    </div>

{/*     <Link to={`/pokemon/${props.id}`}><BsBookmarkHeart size={25} color="red" /></Link>
 */}
   </div>
 );
}