const { GraphQLObjectType, GraphQLString } = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
require("dotenv").config();

const LoginMutation = {
  type: new GraphQLObjectType({
    name: "LoginResponse",
    fields: {
      token: { type: GraphQLString },
      message: { type: GraphQLString },
    },
  }),
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, { email, password }) {
    try {
      const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length === 0) {
        throw new Error("Invalid credentials");
      }

      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token, message: "Login successful" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = LoginMutation;
