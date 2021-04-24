import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';
export default function DeckHeader({ deck, setDeck, deleteADeck }) {
  const { deckId } = useParams();

  useEffect(()=>{
    readDeck(deckId).then(setDeck)
  },[deckId, setDeck])

  return (
    !!deckId && (
      <div>
        <div className='row'>
          <h2 className='m-auto'>{`${deck.name}`}</h2>
          <div className='align-self-start'>{deck.cards.length} Cards</div>
        </div>
        <p className='text-justify border-bottom p-3'>{deck.description}</p>
        <div className='d-flex'>
          <Link className='btn btn-warning mr-3' to={`/decks/${deck.id}/study`}>
          <span class="oi oi-book"></span> Study
          </Link>
          <Link className='btn btn-warning mr-3' to={`/decks/${deck.id}/edit`}>
          <span class="oi oi-pencil"></span> Edit
          </Link>
          <Link className='btn btn-warning mr-auto' to={`/decks/${deck.id}/cards/new`}>
          <span class="oi oi-plus"></span> Add Cards
          </Link>
          <button className='btn btn-danger' onClick={deleteADeck} value={deck.id}>
            <span className='oi oi-trash'></span>
          </button>
        </div>
      </div>
    )
  );
}
