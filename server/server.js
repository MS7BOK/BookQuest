const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const routes = require('./routes');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    authMiddleware(req);
    return { user: req.user };
  },
});

// Start Apollo Server and apply middleware
async function startServer() {
  // Start Apollo Server
  await server.start();

  // Apply Apollo Server middleware to the Express app
  server.applyMiddleware({ app });

  // Existing middleware for parsing JSON and URL-encoded data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // If in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Use your existing routes
  app.use(routes);

  // Connect to the database
  db.once('open', () => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 GraphQL server at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// Call the function to start the server
startServer();
