import React from "react";

const SearchForm = (props) => {
  return (
    <div className="search">
      <div className="title">
        <img
          src="https://img.icons8.com/ios/50/000000/book.png"
          alt="book_icon"
        />
        <h1 className="title_text">Dictionary App</h1>
      </div>
      <form className="form" onSubmit={props.searchWord}>
        <input
          className="input"
          placeholder="Search by a word..."
          value={props.word}
          onChange={props.handleChange}
        />
        <button className="button" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
