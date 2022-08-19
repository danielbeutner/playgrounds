import gql from 'graphql-tag'

export const helloQuery = gql`
  query Hello($name: String) {
    hello(name: $name)
  }
`

export interface HelloQueryResult {
  hello: string
}

export interface HelloQueryVariables {
  name: string | undefined
}
