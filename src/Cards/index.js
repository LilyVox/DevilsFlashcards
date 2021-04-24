import React from 'react';
import CardItem from '../Cards/CardItem';

import { useParams } from 'react-router-dom';

export default function CardList({ deck, deleteACard }) {
  const { deckId } = useParams();
  return (
    !!deckId && (
      <div>
        <h2 className='mt-4'>Cards</h2>
        <ul className='list-group list-group-flush'>
          {deck.cards.map((card) => {
            return <CardItem key={card.id} card={card} deleteACard={deleteACard} />;
          })}
        </ul>
        {deck.cards.length < 3 ? 'You need at least 3 to study, consider adding more.' : null}
      </div>
    )
  );
}
