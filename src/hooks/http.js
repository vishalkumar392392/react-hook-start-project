import React, { useCallback, useReducer } from "react";

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...currentHttpState, loading: false, response: action.response };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return { loading: false, error: null };
    default:
      throw new Error();
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    response: null,
  });

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method: method,
      body: body,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        dispatchHttp({ type: "RESPONSE", response: response });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorData: "Something went wrong!" });
      });
  }, []);

  return {
    loading: httpState.loading,
    error: httpState.error,
    sendRequest: sendRequest,
    clear: clear,
    response: httpState.response,
  };
};

export default useHttp;
