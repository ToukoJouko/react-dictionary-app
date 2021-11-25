import React from "react";

const DefinitionCard = (props) => {
  return (
    <div className="definition_card">
      <div className="part">{props.partOfSpeech}</div>
      <div className="definition">{props.definition}</div>
    </div>
  );
};

export default DefinitionCard;
