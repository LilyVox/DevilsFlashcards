import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../utils/api';

export default function CardEdit({ setDeck }) {
  const { deckId, cardId } = useParams();
  const initCardForm = { front: '', back: '', id: '' };
  const [cardForm, setCardForm] = useState(initCardForm);
  const history = useHistory();

  useEffect(() => {
    if (cardId) {
      readCard(cardId).then(setCardForm);
    }
  }, [cardId]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    updateCard({ ...cardForm, front: cardForm.front, back: cardForm.back }).then(() => {
      readDeck(deckId).then(setDeck);
      history.push(`/decks/${deckId}`);
    });
  };
  const changeHandler = (e) => {
    setCardForm({ ...cardForm, [e.target.name]: e.target.value });
  };
  const cancelHandler = () => {
    history.push('/');
  };

  return (
    <div>
      <h2 className=''>{`Edit Card ${cardId}`}</h2>
      <div className='form-group'>
        <form onSubmit={submitHandler}>
          <label className='form-text' htmlFor='front'>
            Front
          </label>
          <textarea
            type='text'
            name='front'
            id='front'
            rows='3'
            className='form-control'
            placeholder='front side of the card'
            onChange={changeHandler}
            value={cardForm.front}
          />
          <label htmlFor='back'>Back</label>
          <textarea
            className='form-control'
            name='back'
            placeholder='back side of the card'
            id='back'
            rows='3'
            onChange={changeHandler}
            value={cardForm.back}></textarea>
          <button className='btn btn-dark' onClick={cancelHandler}>
            Cancel
          </button>
          <button type='submit' className='btn btn-danger'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
