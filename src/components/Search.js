// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
import "../style/search.css";

const Search = ({ searchValue, onHandleSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={searchValue}
        onChange={onHandleSearchChange}
      />
    </div>
  );
};

export default Search;
