import express from 'express';
import { createServer } from '@graphql-yoga/node';

const app = express();

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => {
      if (name) return `Hello, ${name}!`;

      return 'Hello, World!';
    },
  },
};

const graphQLServer = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

app.use('/graphql', graphQLServer);

export const handler = app;
