import { actionTypes, Actions } from '../actions';

export interface State {
  hello: {
    isFetching: boolean;
    error?: {
      message: string;
      code: string;
    };
    data?: string;
  };
}

export const initialState = {
  hello: {
    isFetching: false,
    error: undefined,
    data: undefined,
  },
};

const helloReducer = (state: State['hello'], action: Actions) => {
  switch (action.type) {
    case actionTypes.HELLO_FETCH:
      return {
        isFetching: true,

        error: undefined,
      };
    case actionTypes.HELLO_ERROR:
      return {
        error: action.payload,
        isFetching: false,
        data: undefined,
      };
    case actionTypes.HELLO_SUCCESS:
      return {
        error: undefined,
        data: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const reducer = (state: State, action: Actions): State => ({
  hello: helloReducer(state.hello, action),
  // another: anotherReducer(state.another, action),
});
