import React from "react";

const SynonymList = (props) => {
  return (
    <div className="synonym_list">
      <div className="synonym_title">Synonyms:</div>
      {props.synonyms.map((synonym, index) => {
        return (
          <div className="synonym" key={index}>
            {synonym}
          </div>
        );
      })}
    </div>
  );
};

export default SynonymList;
