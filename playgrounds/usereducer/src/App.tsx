import React, { useReducer } from 'react';
import './App.css';

// An enum with all the types of actions to use in our reducer
enum CountActionType {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  RESET = 'RESET',
}

// An interface for our actions
interface CountAction {
  type: CountActionType;
  payload: number;
}

interface CountActionReset {
  type: CountActionType.RESET;
}

// An interface for our state
interface CountState {
  count: number;
}

// Our reducer function that uses a switch statement to handle our actions
function counterReducer(
  state: CountState,
  action: CountAction | CountActionReset
) {
  switch (action.type) {
    case CountActionType.INCREASE:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case CountActionType.DECREASE:
      return {
        ...state,
        count: state.count - action.payload,
      };
    case CountActionType.RESET:
      return {
        count: 0,
      };
    default:
      return state;
  }
}

// An example of using the `useReducer` hooks with our reducer function and an initial state
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="counter">
      <div className="count">Count: {state.count}</div>
      {/* Calling our actions on button click */}
      <button
        onClick={() => dispatch({ type: CountActionType.DECREASE, payload: 5 })}
      >
        -5
      </button>
      <button
        onClick={() => dispatch({ type: CountActionType.DECREASE, payload: 1 })}
      >
        -1
      </button>

      <button onClick={() => dispatch({ type: CountActionType.RESET })}>
        0
      </button>
      <button
        onClick={() => dispatch({ type: CountActionType.INCREASE, payload: 1 })}
      >
        +1
      </button>
      <button
        onClick={() => dispatch({ type: CountActionType.INCREASE, payload: 5 })}
      >
        +5
      </button>
    </div>
  );
}

export function App() {
  return (
    <section className="app">
      <Counter />
    </section>
  );
}
