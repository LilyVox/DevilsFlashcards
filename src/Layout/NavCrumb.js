import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function NavCrumb({ deck, active }) {
  const { deckId, cardId } = useParams();
  const crumb = () => {
    if (!!deck && deck.name !== active) {
      let deckLink = deckId ? <Link to={`/decks/${deckId}`}>{deck.name}</Link> : null;
      return !!deckId && <li className='breadcrumb-item'>{deckLink}</li>;
    }
  };

  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb bg-transparent'>
        <li className='breadcrumb-item'>
          <Link to='/'>Home</Link>
        </li>
        {crumb()}
        <li className='breadcrumb-item active'>
          {active === 'Edit Card' ? `${active} ${cardId}` : active}
        </li>
      </ol>
    </nav>
  );
}
