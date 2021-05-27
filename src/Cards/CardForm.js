import React from "react";
import { Link } from "react-router-dom";

function CardForm({ card, handleSubmit, handleChange, deckId }) {
  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <div className="d-flex flex-column mb-3">
        <label htmlFor="front">Front</label>
        <textarea
          name="front"
          className="form-control"
          onChange={handleChange}
          value={card.front}
          placeholder="Front side of card"
        ></textarea>
      </div>
      <div className="d-flex flex-column mb-3">
        <label htmlFor="back">Back</label>
        <textarea
          name="back"
          className="form-control"
          onChange={handleChange}
          value={card.back}
          placeholder="Back side of card"
        ></textarea>
      </div>
      <div className="actions">
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary mr-2">Done</button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default CardForm;
