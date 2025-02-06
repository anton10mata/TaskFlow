const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET || "Not Loaded");

const app = express();
app.use(cors());
app.use(express.json());

// GraphQL endpoint with context
app.use(
  "/graphql",
  graphqlHTTP((req) => {
    console.log("Request received at /graphql");
    let user = null;
    const authHeader = req.headers.authorization;

    if (authHeader) {
      try {
        user = jwt.verify(authHeader.replace("Bearer ", ""), process.env.JWT_SECRET);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    return {
      schema,
      graphiql: true, // Enable GraphiQL
      context: { user },
    };
  })
);

// Static file serving for the frontend
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
