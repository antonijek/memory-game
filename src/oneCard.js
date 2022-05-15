import React from "react";

const oneCard = (props) => {
  return (
    <div className="one-card">
      <img
        className="image"
        src={props.card.isOpen ? props.card.url : "images/card-back.jpg"}
        alt="card"
        onClick={(e) => props.handleOpenStatus(props.card)}
      />
    </div>
  );
};

export default oneCard;
