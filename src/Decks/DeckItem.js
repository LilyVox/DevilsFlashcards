import React from 'react';
import { Link } from 'react-router-dom';

export default function DeckItem({ deck, deleteADeck }) {
  return (
    <li className='list-group-item bg-transparent'>
      <div className='card shadow-sm bg-transparent'>
        <div className='card-header'>
          <div className='row'>
            <h3 className='card-title pl-3 mr-auto'>{deck.name}</h3>
            <div className='align-self-start badge badge-danger'>{`${deck.cards.length} cards`}</div>
          </div>
        </div>
        <div className='card-body'>
          <p className='card-text p-3'>{deck.description}</p>
        </div>
        <div className='d-flex card-footer'>
          <Link className='btn btn-warning mr-3' to={`/decks/${deck.id}/study`}>
            <span class='oi oi-book'></span> Study
          </Link>
          <Link className='btn btn-warning mr-3' to={`/decks/${deck.id}`}>
            <span class='oi oi-magnifying-glass'></span> View
          </Link>
          <Link className='btn btn-warning mr-auto' to={`/decks/${deck.id}/edit`}>
            <span class='oi oi-pencil'></span> Edit
          </Link>
          <button className='btn btn-danger' onClick={deleteADeck} value={deck.id}>
            <span className='oi oi-trash' />
          </button>
        </div>
      </div>
    </li>
  );
}
