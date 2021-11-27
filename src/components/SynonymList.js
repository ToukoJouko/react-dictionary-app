import React from "react";

const SynonymList = (props) => {
  return (
    <div className="synonym_list" id="synonym_list">
      <div className="synonym_title">Synonyms:</div>
      {props.synonyms.map((synonym, index) => {
        return (
          <div className="synonym" key={index}>
            {synonym}
          </div>
        );
      })}
      <a className="start_link" href="#">
        To the start of the page
      </a>
    </div>
  );
};

export default SynonymList;
