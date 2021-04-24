import React from 'react';
import { Link } from 'react-router-dom';

export default function CardItem({ card, deleteACard }) {
  const { id, front, back, deckId } = card;

  return (
    <li className='list-group-item bg-transparent'>
      <div className='card bg-transparent'>
        <div className='card-body d-flex'>
          <div className='col rounded card-text m-auto text-dark bg-light'>
            <h4 className='border-bottom'>Front</h4>
            <p>{front}</p>
          </div>
          <div className='col rounded card-text m-auto bg-dark'>
            <h4 className='border-bottom'>Back</h4>
            <p>{back}</p>
          </div>
        </div>
        <div className='d-flex card-footer'>
          <Link className='btn btn-warning mr-auto' to={`/decks/${deckId}/cards/${id}/edit`}>
            Edit <span class='oi oi-pencil'></span>
          </Link>
          <button className='btn btn-danger' onClick={deleteACard} value={card.id}>
            <span className='oi oi-trash' />
          </button>
        </div>
      </div>
    </li>
  );
}
