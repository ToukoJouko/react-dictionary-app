import React from "react";

//get current date
const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const currentDate = day + "." + month + "." + year;

const WotdCard = (props) => {
  return (
    <div className="wotdCard_bg">
      <div className="wotd_title">WORD OF THE DAY</div>
      <div className="wotd_date">{currentDate}</div>
      <div className="wotd">{props.wotd}</div>
    </div>
  );
};

export default WotdCard;
