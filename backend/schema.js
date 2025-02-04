const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();



// Define UserType for GraphQL
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    message: { type: GraphQLString },
  },
});

// const EventType = new GraphQLObjectType({
//   name: "Event",
//   fields: {
//     id: { type: GraphQLString },
//     title: { type: GraphQLString },
//     date: { type: GraphQLString },
//     userId: { type: GraphQLString },
//   },
// });

// Define Root Query Type (MUST BE INCLUDED)
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      async resolve(_, { email }) {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (!user.rows.length) {
          throw new Error("User not found");
        }
        return {
          id: user.rows[0].id,
          email: user.rows[0].email,
        };
      },
    },
    // getEvents: {
    //   type: new GraphQLList(EventType),
    //   async resolve(_, __, context) {
    //     if (!context.user) {
    //       throw new Error("Unauthorized");
    //     }

    //     const result = await db.query("SELECT * FROM events WHERE user_id = $1", [context.user.userId]);
    //     return result.rows;
    //   },
    // },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(_, { email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
          [email, hashedPassword]
        );

        const token = jwt.sign(
          { userId: newUser.rows[0].id, email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return { id: newUser.rows[0].id, email: newUser.rows[0].email, token };
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(_, { email, password }) {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (!user.rows.length) {
          throw new Error("User not found");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
          throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
          { userId: user.rows[0].id, email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return { id: user.rows[0].id, email, token };
      },
    },

    // createEvent: {
    //   type: EventType,
    //   args: {
    //     title: { type: GraphQLString },
    //     date: { type: GraphQLString },
    //   },
    //   async resolve(_, { title, date }, context) {
    //     if (!context.user) {
    //       throw new Error("Unauthorized");
    //     }

    //     const newEvent = await db.query(
    //       "INSERT INTO events (title, date, user_id) VALUES ($1, $2, $3) RETURNING *",
    //       [title, date, context.user.id]
    //     );

    //     return newEvent.rows[0];
    //   },
    // },
  },
});


// EXPORT the schema with BOTH query and mutation
module.exports = new GraphQLSchema({
  query: RootQuery,  // Ensure this is included!
  mutation: RootMutation,
});
