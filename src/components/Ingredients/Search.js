import React, { useEffect, useState, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onChangeHandler } = props;
  const [enteredTitle, setEnteredTitle] = useState("");
  const inputRef = useRef();
  useEffect(() => {
   const timer = setTimeout(() => {
      if (enteredTitle === inputRef.current.value) {
        const query = enteredTitle.length === 0 ? "" : `?title=${enteredTitle}`;
        fetch("http://localhost:80/ings" + query, { method: "GET" })
          .then((res) => res.json())
          .then((res) => onChangeHandler(res));
      }
     
    }, 500);
    return ()=>{
      clearTimeout(timer)
    }
  }, [enteredTitle, onChangeHandler]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={inputRef}
            value={enteredTitle}
            onChange={(event) => setEnteredTitle(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
