import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

function Card({ card, deck, onClickCardDelete }) {
  const handleDelete = async (id) => {
    // trigger deletion dialog box
    const doesConfirm = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    // return early / exit out of function if Cancel is clicked
    if (!doesConfirm) return;
    // function to await deleteCard API call then use onClickCardDelete prop to delete from state
    const deleteData = async () => {
      await deleteCard(id);
      onClickCardDelete(id);
    };
    // call above function
    deleteData();
  };

  return (
    <li key={card.id} className="list-group-item">
      <div>
        <p>
          <strong>{card.front}</strong>
        </p>
        <p>{card.back}</p>
        <div className="d-flex justify-content-end">
          <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
            <button className="btn btn-secondary mr-2">
              <i className="bi bi-pencil-fill"></i> Edit
            </button>
          </Link>
          <button
            onClick={() => handleDelete(card.id)}
            className="btn btn-danger"
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </li>
  );
}

export default Card;
