import React, { useCallback, useReducer } from "react";
import ErrorModal from "../UI/ErrorModal";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there");
  }
};

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { isLoading: true, error: null };
    case "RESPONSE":
      return { ...currentHttpState, isLoading: false };
    case "ERROR":
      return { isLoading: false, error: action.errorData };
    case "CLEAR":
      return { isLoading: false, error: null };
    default:
      throw new Error();
  }
};

function Ingredients() {
  const [userIngreidents, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
  });

  const filterIngreidents = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    dispatchHttp({ type: "SEND" });

    fetch("http://localhost:80/ing", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "ADD", ingredient: { id: response, ...ingredient } });
      })
      .catch((error) =>
        dispatchHttp({ type: "ERROR", errorData: "Something went wrong" })
      );
  }, []);
  const removeIngredient = (id) => {
    dispatchHttp({ type: "SEND" });
    setTimeout(() => {
      dispatch({ type: "DELETE", id: id });
      dispatchHttp({ type: "RESPONSE" });
    }, 700);
  };
  const clearError = () => {
    dispatchHttp({ type: "CLEAR" });
  };
  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        addIngredient={addIngredientHandler}
        loading={httpState.isLoading}
      />

      <section>
        <Search onChangeHandler={filterIngreidents} />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={userIngreidents}
          onRemoveItem={removeIngredient}
        />
      </section>
    </div>
  );
}

export default Ingredients;
