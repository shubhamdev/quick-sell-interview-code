import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash-es";

import Counter from "./components/Counter";
import useCounter from "./hooks/useCounter";

import "./App.css";

const BASE_URL = "https://interview-8e4c5-default-rtdb.firebaseio.com";

const PUT_URL = BASE_URL + "/front-end.json";
const GET_URL = BASE_URL + "/front-end/quickSellCounter.json";

const apiCall = async (url = "", method = "GET", body) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const res = await fetch(url, options).then(res => res.json());
    return res;
  } catch (e) {
    throw e;
  }
};

function App({ initialValue = 1, max = 1000 }) {
  const [counter, dispatchCounter] = useCounter({ count: initialValue, max });
  const [isSaving, setIsSaving] = useState(false);
  const counterValueFromGet = useRef(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await apiCall(GET_URL);
        if (value && value !== null) {
          counterValueFromGet.current = value;
          dispatchCounter({
            type: "absolute",
            value,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [dispatchCounter]);

  const handleIncrement = () => dispatchCounter({ type: "increment" });
  const handleDecrement = () => dispatchCounter({ type: "decrement" });
  const onChange = e =>
    dispatchCounter({ type: "absolute", value: e.target.value });

  const insertCounterDebounced = useRef(
    debounce(async count => {
      try {
        setIsSaving(true);
        await apiCall(PUT_URL, "PUT", { quickSellCounter: count });
      } catch (e) {
        console.log("Unable to save the Counter Value", e);
      } finally {
        setIsSaving(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    if (counterValueFromGet.current !== counter.count)
      insertCounterDebounced(counter.count);
  }, [counter.count, insertCounterDebounced]);

  return (
    <div className="App">
      <div className="wrapper">
        <div
          className="loading-state"
          style={isSaving ? {} : { visibility: "hidden" }}
        >
          <div className="loader"></div>
          <p>Saving counter value</p>
        </div>
        <Counter
          count={counter.count}
          max={counter.max}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          onChange={onChange}
        />
        <p>Counter value : {counter.count}</p>
      </div>
    </div>
  );
}

export default App;
