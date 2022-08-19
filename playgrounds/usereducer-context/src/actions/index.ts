import * as Hello from './hello';

type ActionMap<T> = {
  [index in keyof T]: T[index] extends undefined
    ? {
        type: index;
      }
    : {
        type: index;
        payload: T[index];
      };
};

export const actionTypes = {
  ...Hello.Types,
} as const;

export type Actions =
  ActionMap<Hello.ActionMap>[keyof ActionMap<Hello.ActionMap>];
