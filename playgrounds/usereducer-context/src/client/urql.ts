import { createClient } from 'urql';

export const graphqlClient = createClient({
  url: 'http://localhost:5000/graphql',
});
