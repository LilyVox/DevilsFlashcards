import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { deleteCard, deleteDeck, listDecks, readDeck } from '../utils/api';
// api; readDeck, listDecks, createDeck, updateDeck,deleteDeck,listCards,createCard,readCard,updateCard,deleteCard
import Header from './Header';
import NotFound from './NotFound';
import Home from '../Home';
import NavCrumb from '../Layout/NavCrumb';
import DeckHeader from '../Decks/DeckHeader';
import DeckCreate from '../Decks/DeckCreate';
import DeckEditor from '../Decks/DeckEditor';
import CardCreate from '../Cards/CardCreate';
import CardEdit from '../Cards/CardEdit';
import CardList from '../Cards';
import Study from '../Study';

function Layout() {
  const initCards = [{ front: '', back: '', id: '', deckId: '' }];
  const initDeck = { name: ' ', description: ' ', cards: initCards, id: '' };
  const [allDecks, setDecks] = useState([initDeck]);
  const [currentDeck, setCurrentDeck] = useState({ ...initDeck });
  const history = useHistory();

  useEffect(() => {
    listDecks().then((response) => setDecks(response));
  }, [currentDeck]);

  const deleteADeck = (e) => {
    const deckIdToDelete = e.target.closest('button').value;
    const deleteThisDeckName = allDecks[deckIdToDelete - 1];
    if (window.confirm(`Sure you want to delete deck '${deleteThisDeckName}?'`)) {
      deleteDeck(deckIdToDelete).then(() => {
        setCurrentDeck({ ...initDeck });
        history.push('/');
      });
    }
  };
  const deleteACard = (e) => {
    const cardIdToDelete = e.target.closest('button').value;
    if (window.confirm(`Sure you want to delete card ${cardIdToDelete}?`)) {
      deleteCard(cardIdToDelete).then(() => {
        readDeck(currentDeck.id).then(setCurrentDeck);
      });
    }
  };

  return (
    <div className='bg-dark text-light'>
      <Header />
      <div className='container'>
        <Switch>
          {/* home page */}
          <Route exact={true} path='/'>
            <Home decks={allDecks} deleteADeck={deleteADeck} />
          </Route>
          {/* new deck */}
          <Route exact={true} path='/decks/new'>
            <NavCrumb active={'Create Deck'} />
            <DeckCreate />
          </Route>
          {/* study page */}
          <Route path='/decks/:deckId/study'>
            <NavCrumb deck={currentDeck} active={'Study'} />
            <Study deck={currentDeck} setDeck={setCurrentDeck} />
          </Route>
          {/* new card  */}
          <Route exact={true} path='/decks/:deckId/cards/new'>
            <NavCrumb deck={currentDeck} active={'Add Card'} />
            <CardCreate setDeck={setCurrentDeck} />
          </Route>
          {/* edit card */}
          <Route exact={true} path='/decks/:deckId/cards/:cardId/edit'>
            <NavCrumb deck={currentDeck} active={'Edit Card'} />
            <CardEdit setDeck={setCurrentDeck} />
          </Route>
          {/* edit deck  */}
          <Route exact={true} path='/decks/:deckId/edit'>
            <NavCrumb deck={currentDeck} active={'Edit'} />
            <DeckEditor deck={currentDeck} setDeck={setCurrentDeck} />
          </Route>
          {/* deck homepage */}
          <Route path='/decks/:deckId'>
            <NavCrumb deck={currentDeck} active={currentDeck.name} />
            <DeckHeader deck={currentDeck} setDeck={setCurrentDeck} deleteADeck={deleteADeck} />
            <CardList deck={currentDeck} deleteACard={deleteACard} />
          </Route>
          {/* 404 */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
