import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";
import DeckForm from "../Decks/DeckForm";

function CreateDeck() {
  // create history variable as equal to useHistory() hook
  const history = useHistory();

  // set initial state of deck with empty values
  // until loaded by readDeck
  const [deck, setDeck] = useState({ name: "", description: "" });

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  // prevent submit default, await createDeck API call
  // then use history variable to redirect to deck view
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await createDeck(deck);
    history.push(`/decks/${data.id}`);
  };

  const linkCancelButton = (
    <Link to="/">
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
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h1>Create Deck</h1>
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

export default CreateDeck;
