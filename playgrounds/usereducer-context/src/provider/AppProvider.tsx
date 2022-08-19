import React, {
  createContext,
  Dispatch,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Actions } from '../actions';
import { dispatchMiddleware } from '../middleware';
import { initialState, reducer, State } from '../reducer';

type Context = [State, Dispatch<Actions>];

const AppContext = createContext<Context>([initialState, () => null]);

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'AppProvider was not found. Please add <AppProvider> component to your App.'
    );
  }

  return context;
}

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, origDispatch] = useReducer(reducer, initialState);

  const dispatch = useMemo(
    () => dispatchMiddleware(origDispatch),
    [origDispatch]
  );

  const value = useMemo<Context>(() => [state, dispatch], [dispatch, state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
