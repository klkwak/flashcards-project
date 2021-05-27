import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();

  const { deckId } = useParams();
  const { cardId } = useParams();

  const [deck, setDeck] = useState({});

  const [card, setCard] = useState({ front: "", back: "" });

  // await deck to be returned from readDeck API call then set deck state as response
  useEffect(() => {
    const getDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };
    getDeck();
  }, [deckId]);

  // await card to be returned from readCard API call then set card state as response
  useEffect(() => {
    const getCard = async () => {
      const response = await readCard(cardId);
      setCard(response);
    };
    getCard();
  }, [cardId]);

  // handle changes in inputs by setting card state as entered values
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  // handle submit by preventing default, awaiting updateCard API call and then redirecting to deck view
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`decks/${deckId}`);
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
              Edit Card {cardId}
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h2>Edit Card</h2>
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

export default EditCard;
