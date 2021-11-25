import React from "react";

const WordInfo = (props) => {
  return (
    <div className="word_info">
      <div className="word">{props.word}</div>
      <div className="pronounciation">{"[ " + props.pronounciation + " ]"}</div>
      <div className="audio">
        <audio controls src={props.audioUrl} type="audio/mpeg"></audio>
      </div>
    </div>
  );
};

export default WordInfo;
