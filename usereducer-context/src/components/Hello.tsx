import React from 'react';
import { actionTypes } from '../actions';
import { useApp } from '../provider/AppProvider';
import { SkeletonLoader } from './SkeletonLoader';

export function Hello() {
  const [state, dispatch] = useApp();

  React.useEffect(() => {
    dispatch({
      type: actionTypes.HELLO_FETCH,
      payload: undefined,
    });
  }, []);

  const renderData = React.useCallback(
    (data: string | undefined) => data || '',
    [state]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);

      dispatch({
        type: actionTypes.HELLO_FETCH,
        payload: formData.get('name')?.toString(),
      });
    }
  };

  return (
    <>
      <SkeletonLoader>
        <h1>{renderData(state.hello.data)}</h1>
      </SkeletonLoader>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" type="text" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
