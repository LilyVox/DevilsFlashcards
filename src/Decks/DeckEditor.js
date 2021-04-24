import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';
// import './style.css';

export default function DeckEditor({ deck, setDeck }) {
  const initDeckForm = { name: '', description: '', cards: [] };
  const [deckForm, setDeckForm] = useState(initDeckForm);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    if (deckId) {
      readDeck(deckId).then((r) => {
        setDeckForm(r);
        setDeck(r);
      });
    }
  }, [deckId, setDeck]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateDeck({ ...deck, name: deckForm.name, description: deckForm.description }).then(
      (response) => {
        history.push(`/decks/${response.id}`);
      }
    );
  };
  const changeHandler = (e) => {
    setDeckForm({
      ...deckForm,
      [e.target.name]: e.target.value,
    });
  };
  const cancelHandler = () => {
    history.push('/');
  };

  return (
    <div>
      <h2 className=''>{`Edit ${deck.name}`} </h2>
      <div className='form-group'>
        <form onSubmit={submitHandler}>
          <label className='form-text' htmlFor='name'>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            className='form-control'
            onChange={changeHandler}
            value={deckForm.name}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            className='form-control'
            name='description'
            id='description'
            rows='3'
            onChange={changeHandler}
            value={deckForm.description}></textarea>
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
