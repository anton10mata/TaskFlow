const { GraphQLObjectType, GraphQLString } = require("graphql");
const bcrypt = require("bcryptjs");
const db = require("../../db");

const RegisterMutation = {
  type: new GraphQLObjectType({
    name: "RegisterResponse",
    fields: {
      message: { type: GraphQLString },
    },
  }),
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, { email, password }) {
    try {
      // Check if user already exists
      const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userExists.rows.length > 0) {
        throw new Error("User already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);

      return { message: "User registered successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = RegisterMutation;
