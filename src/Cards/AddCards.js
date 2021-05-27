import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCards() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});

  // set initial state of card as empty front and back
  const [card, setCard] = useState({ front: "", back: "" });

  // load current deck and set it as deck state using deckId from params
  useEffect(() => {
    const getData = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };
    getData();
  }, [deckId]);

  // handle change in inputs by setting entered values as card state
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  // handle form submit, call createCard function to post to API and then reset card state
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, card);
    setCard({ front: "", back: "" });
  };

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
              Add Card
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h2>{deck.name}: Add Card</h2>
        <div>
          <CardForm
            card={card}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            deckId={deckId}
          />
        </div>
      </div>
    </div>
  );
}

export default AddCards;
