import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./CounterSlice1";

const Counter1 = () => {
  const value = useSelector((state) => state.counter1.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {value}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter1;
