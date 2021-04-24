import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';

export default function DeckCreate() {
  const history = useHistory();
  const initDeckForm = { name: '', description: '' };
  const [deckForm, setDeckForm] = useState(initDeckForm);

  const submitHandler = (e) => {
    e.preventDefault();
    createDeck({
      name: deckForm.name,
      description: deckForm.description,
    }).then((response) => {
      history.push(`/decks/${response.id}`);
    });
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
      <h2 className=''>Create Deck</h2>
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
            placeholder='Deck Name'
            onChange={changeHandler}
            value={deckForm.name}
          />

          <label htmlFor='description'>Description</label>
          <textarea
            className='form-control'
            name='description'
            placeholder='Breif description of the deck'
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
