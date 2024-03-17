import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from './store';
import { increment,decrement } from './CounterSlice';

const Counter = () => {
  const count = useSelector(()=>store.getState().counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;