import { Actions, actionTypes } from '../actions';
import { graphqlClient } from '../client/urql';
import {
  helloQuery,
  HelloQueryResult,
  HelloQueryVariables,
} from '../queries/hello';

async function queryHello(
  dispatch: React.Dispatch<Actions>,
  payload: string | undefined
) {
  try {
    const result = await graphqlClient
      .query<HelloQueryResult, HelloQueryVariables>(helloQuery, {
        name: payload,
      })
      .toPromise();

    if (result.data) {
      dispatch({ type: actionTypes.HELLO_SUCCESS, payload: result.data.hello });
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch({
        type: actionTypes.HELLO_ERROR,
        payload: { code: error.name, message: error.message },
      });
    }
  }
}

export function dispatchMiddleware(dispatch: React.Dispatch<Actions>) {
  return (action: Actions) => {
    if (action.type === actionTypes.HELLO_FETCH) {
      queryHello(dispatch, action.payload);
    }

    dispatch(action);
  };
}
