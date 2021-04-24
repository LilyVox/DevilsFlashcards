import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';

export default function Study({ deck, setDeck }) {
  const { deckId } = useParams();
  const [flipped, setFlipped] = useState(false);
  // combine with cardtracker
  const [cardTracker, setTracker] = useState(0);
  const history = useHistory();
  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId, setDeck]);
  const { name, cards } = deck;

  function studyGuide() {
    if (cards.length < 3) return <NotEnoughCards />;
    let card = cards[cardTracker];
    const { id, front, back } = card;
    // todo: add image functionality
    return studyShape(flipped ? front : back, id);
  }
  const NotEnoughCards = () => {
    return (
      <div>
        <p>{`Not enough cards. You need at least 3 cards to study a deck. There are ${cards.length} in this deck.`}</p>
        <Link className='btn btn-dark mr-auto' to={`/decks/${deckId}/cards/new`}>
          Add Cards
        </Link>
      </div>
    );
  };
  const flipHandler = () => {
    setFlipped((flip) => !flip);
  };
  const nextCardHandler = () => {
    if (!cards[cardTracker + 1]) return restartHandler;
    setTracker((last) => last + 1);
    setFlipped(false);
  };
  const restartHandler = () => {
    window.confirm('You finished this set. Want to try again?') ? setTracker(0) : history.push('/');
  };
  const studyShape = (face, id) => {
    return (
      <div className='card' key={id}>
        <h3 className='card-header'>{`Card ${cardTracker + 1} of ${cards.length}`}</h3>
        <div className='card-body d-flex'>
          <p className='card-text m-auto bg-light'>{face}</p>
        </div>
        <div className='card-footer'>
          <button className='btn btn-dark' onClick={flipHandler}>
            Flip
          </button>
          {flipped && !!cards[cardTracker + 1] && (
            <button className='btn btn-dark' onClick={nextCardHandler}>
              Next
            </button>
          )}
          {/* !cards[badindex] means true if out of range*/}
          {flipped && !cards[cardTracker + 1] && (
            <button className='btn btn-success' onClick={restartHandler}>
              Finish
            </button>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <h2>Study: {name}</h2>
      {name ? studyGuide() : null}
    </div>
  );
}
