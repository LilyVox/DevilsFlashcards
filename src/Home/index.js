import React from 'react';
import DeckItem from '../Decks/DeckItem';
import { Link } from 'react-router-dom';

export default function Home({ decks, deleteADeck }) {
  return (
    <div className='m-auto'>
      <Link to='/decks/new' type='button' className='m-2 btn btn-dark'>
        <span class='oi oi-plus'></span> Create New Deck
      </Link>
      <ul className='list-group list-group-flush'>
        {decks.map((deck) => {
          return <DeckItem key={deck.id} deck={deck} deleteADeck={deleteADeck} />;
        })}
      </ul>
    </div>
  );
}
