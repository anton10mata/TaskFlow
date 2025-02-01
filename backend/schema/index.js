const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const RegisterMutation = require("./mutations/register");
const LoginMutation = require("./mutations/login");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    test: {
      type: GraphQLString, // ✅ FIX: This should be a string, not an object
      resolve: () => "GraphQL API is working!",
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: RegisterMutation,
    login: LoginMutation,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
