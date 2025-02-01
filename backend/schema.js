const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull } = require("graphql");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    email: { type: GraphQLString },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    test: {
      type: GraphQLString,
      resolve() {
        return "GraphQL API is working!";
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const hashedPassword = await bcrypt.hash(args.password, 10);
        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
          args.email,
          hashedPassword,
        ]);
        return { message: "User registered successfully" };
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const userResult = await db.query("SELECT * FROM users WHERE email=$1", [args.email]);
        if (userResult.rows.length === 0) {
          throw new Error("User not found");
        }
        const isValid = await bcrypt.compare(args.password, userResult.rows[0].password);
        if (!isValid) throw new Error("Invalid credentials");

        const token = jwt.sign({ email: args.email }, "SECRET_KEY", { expiresIn: "1h" });
        return { token, message: "Login successful" };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
