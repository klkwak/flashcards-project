import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckItem({ deck, onClickDelete }) {
  const handleDelete = () => {
    // display confirm dialog and allow cancel
    const doesConfirm = window.confirm("Are you sure you want to delete?");
    // return early to exit out of function if not confirmed
    if (!doesConfirm) return;
    // call the delete API function
    // if success, delete from state by calling onClickDelete

    const deleteData = async () => {
      await deleteDeck(deck.id);
      onClickDelete(deck.id);
    };

    deleteData();
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between pt-2">
        <div>
          <h3>{deck.name}</h3>
        </div>
        <div>
          <p>{deck.cards.length} cards</p>
        </div>
      </div>

      <div className="py-3">{deck.description}</div>

      <div className="d-flex justify-content-between">
        <div className="py-2">
          <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary mr-2">
              <i className="bi bi-eye-fill"></i> View
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary">
              <i className="bi bi-book-half"></i> Study
            </button>
          </Link>
        </div>
        <div className="py-2">
          <button onClick={handleDelete} className="btn btn-danger">
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </li>
  );
}

export default DeckItem;
