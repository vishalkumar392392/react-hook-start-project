import React, { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    // ...
    props.addIngredient(object);
  };

  const [object, setObject] = useState({ title: "", amount: "" });
  console.log("line 15", props.loading);
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              placeholder="Enter the title"
              value={object.title}
              onChange={(event) =>
                setObject({ title: event.target.value, amount: object.amount })
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="Enter the amount"
              value={object.amount}
              onChange={(event) =>
                setObject({ amount: event.target.value, title: object.title })
              }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>

            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
