const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const cors = require('cors');
const { buildSchema } = require("graphql");

const isDev = process.env.MIDDLEWARE_ENV === "dev";

const typeDefs = buildSchema(`
  type Query {
    hello: String
  }
`);

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: isDev,
  playground: isDev
});
const app = express();
app.use(cors());

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Only listen on HTTP port in local development, not when deployed on Vercel
  if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`💫 Server ready at http://localhost:${PORT}/graphql`));
  }
}
//another vercel test

startServer();
const requestHandler = app;
const vercelServer = createServer((req, res) => requestHandler(req, res));
module.exports = vercelServer;