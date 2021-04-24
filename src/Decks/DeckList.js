import React from 'react';
import DeckItem from '../Decks/DeckItem';

export default function DeckList({ decks, deleteADeck }) {
  return (
    <ul>
      {decks.map((deck) => {
        return <DeckItem key={deck.id} deck={deck} deleteADeck={deleteADeck} />;
      })}
    </ul>
  );
}
