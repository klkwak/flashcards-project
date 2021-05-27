import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import StudyCardView from "./StudyCardView";

function StudyView() {
  const [deck, setDeck] = useState({});

  const { deckId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };
    getData();
  }, [deckId]);

  let cards;

  // if deck has been set in state, reassign cards to be
  // the cards array of the deck
  if (deck.id) {
    cards = deck.cards;
  }

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
              Study
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h1>Study: {deck.name}</h1>
      </div>
      <div>
        <StudyCardView cards={cards} deckId={deckId} />
      </div>
    </div>
  );
}

export default StudyView;
