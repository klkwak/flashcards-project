import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckItem from "../DeckList/DeckItem";
import { listDecks } from "../utils/api";

function HomePage() {
  const [decks, setDecks] = useState([]);

  // await listDecks API call to get decks then
  // set decks state as the response
  useEffect(() => {
    const getData = async () => {
      const response = await listDecks();
      setDecks(response);
    };
    getData();
  }, []);

  // function to delete deck by filtering state decks by id
  // to be passed down to DeckItem components
  const onClickDelete = (id) => {
    const newDecks = decks.filter((deck) => deck.id !== Number(id));
    setDecks(newDecks);
  };

  return (
    <div>
      <div className="actions pb-4">
        <Link to="/decks/new">
          <button className="btn btn-secondary">
            <i className="bi bi-plus-lg"></i> Create Deck
          </button>
        </Link>
      </div>
      <ul className="list-group my-2">
        {decks.map((deck) => (
          <DeckItem
            key={deck.id}
            deck={deck}
            onClickDelete={() => onClickDelete(deck.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
