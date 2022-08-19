export enum Types {
  HELLO_FETCH = 'HELLO_FETCH',
  HELLO_ERROR = 'HELLO_ERROR',
  HELLO_SUCCESS = 'HELLO_SUCCESS',
}

export interface ActionMap {
  [Types.HELLO_FETCH]: string | undefined
  [Types.HELLO_ERROR]: {
    message: string
    code: string
  }
  [Types.HELLO_SUCCESS]: string
}
