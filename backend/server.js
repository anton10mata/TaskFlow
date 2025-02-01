const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema"); // Import GraphQL schema
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Body:`, req.body);
  next();
});

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enables GraphQL UI at http://localhost:5000/graphql
  })
);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
