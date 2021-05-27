import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

function EditDeck() {
  // set initial state of deck with empty values
  // until loaded by readDeck
  const [deck, setDeck] = useState({ name: "", description: "" });

  const { deckId } = useParams();

  const history = useHistory();

  // await readDeck API call then set deck state with response
  useEffect(() => {
    const getData = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };
    getData();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`decks/${deckId}`);
  };

  const linkCancelButton = (
    <Link to={`/decks/${deckId}`}>
      <button className="btn btn-secondary mr-2">Cancel</button>
    </Link>
  );

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h1>Edit Deck</h1>
        <div>
          <DeckForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            deck={deck}
            linkCancelButton={linkCancelButton}
          />
        </div>
      </div>
    </div>
  );
}

export default EditDeck;
